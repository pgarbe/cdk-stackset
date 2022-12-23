import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StackSetTemplateStack } from './stack-set-template-stack';

export interface StackSetProps {
  readonly stackSetName: string;
  readonly stack: StackSetTemplateStack;
  readonly orgId: string;
}

/**
 * L2 construct of a StackSet
 */
export class StackSet extends cdk.Resource {

  public readonly sharedAssetBucket: cdk.aws_s3.IBucket;

  constructor(scope: Construct, id: string, props: StackSetProps) {
    super(scope, id, { physicalName: props.stackSetName });

    // TODO: When the same StackSet stack is used for multiple StackSets the assets will end up at bucket of the last defined StackSet.
    // Can we "copy" the stack somehow?

    const sharedBucketName = `cdk-assets-shared-${props.stack.node.id.toLowerCase()}-${id.toLowerCase()}`;

    this.sharedAssetBucket = new cdk.aws_s3.Bucket(this, 'CdkAssetsShared', {
      bucketName: sharedBucketName,
      encryption: cdk.aws_s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    this.sharedAssetBucket.grantRead(new cdk.aws_iam.OrganizationPrincipal(props.orgId));

    // Inject the bucketName to the StackSetStack synthesizer
    props.stack._setAssetBucketName(sharedBucketName);

    // Copy assets into the shared assets bucket
    const fileAssets = props.stack._getFileAssets();
    const deployments: cdk.aws_s3_deployment.BucketDeployment[] = [];

    fileAssets.forEach((asset) => {
      if (asset.fileName) {
        const deployment = new cdk.aws_s3_deployment.BucketDeployment(this, 'Deploy', {
          sources: [cdk.aws_s3_deployment.Source.asset(path.join(cdk.App.of(this)!.assetOutdir, asset.fileName))],
          destinationBucket: this.sharedAssetBucket,
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
      stackSet.node.addDependency(deployment);
    });
  }
}