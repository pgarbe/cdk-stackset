import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StackSetStack } from './stack-set-stack';

export interface StackSetProps {
  readonly stackSetName: string;
  readonly stack: StackSetStack;
  readonly orgId: string;
}

/**
 * L2 construct of a StackSet
 */
export class StackSet extends cdk.Resource {
  constructor(scope: Construct, id: string, props: StackSetProps) {
    super(scope, id, { physicalName: props.stackSetName });

    const sharedAssetBucket = new cdk.aws_s3.Bucket(this, 'CdkAssetsShared', {
      bucketName: `cdk-assets-shared-${this.node.id.toLowerCase()}`, // maybe also with account and region?
      encryption: cdk.aws_s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
    });

    sharedAssetBucket.grantRead(new cdk.aws_iam.OrganizationPrincipal(props.orgId));

    // Copy assets into the shared assets bucket
    const fileAssets = props.stack._getFileAssets();
    // fileAssets = cdk.Stack.of(this).synthesizer.assetManifest.files
    const deployments: cdk.aws_s3_deployment.BucketDeployment[] = [];

    fileAssets.forEach((asset) => {
      if (asset.fileName) {
        const deployment = new cdk.aws_s3_deployment.BucketDeployment(this, 'Deploy', {
          sources: [cdk.aws_s3_deployment.Source.asset(`${cdk.App.of(this)!.assetOutdir}/${asset.fileName}`)],
          destinationBucket: sharedAssetBucket,
          extract: false,
        });
        deployments.push(deployment);
      }
    });

    const stackSet = new cdk.CfnStackSet(this, 'Resource', {
      stackSetName: props.stackSetName,
      permissionModel: 'SELF_MANAGED',
      capabilities: ['CAPABILITY_NAMED_IAM'],
      executionRoleName: 'AWSCloudFormationStackSetExecutionRole',
      stackInstancesGroup: [],
      templateUrl: props.stack._getTemplateUrl(),
    });

    // StackSet can only be deployed after all assets have been deployed into the shared asset bucket
    deployments.forEach((deployment) => {
      stackSet.node.addDependency(deployment.deployedBucket);
    });
  }
}