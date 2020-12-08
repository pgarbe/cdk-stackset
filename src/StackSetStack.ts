import * as cfn from '@aws-cdk/aws-cloudformation';
import * as cdk from '@aws-cdk/core';

export interface StackSetStackProps extends cdk.StackProps {
  stack: cdk.Stack;
}

export class StackSetStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: StackSetStackProps) {
    super(scope, id, props);

    const template = props.stack.synthesizer.addFileAsset({
      packaging: cdk.FileAssetPackaging.FILE,
      sourceHash: 'myfancysourcehash',
      fileName: props.stack.templateFile,
    });

    new cfn.CfnStackSet(this, 'StackSet', {
      stackSetName: `${id}StackSet`,
      permissionModel: 'SERVICE_MANAGED',
      autoDeployment: {
        enabled: true,
        retainStacksOnAccountRemoval: false,
      },
      stackInstancesGroup: [
        {
          deploymentTargets: {
            organizationalUnitIds: ['o-u123'],
          },
          regions: ['eu-west-1'],
        },
      ],
      templateUrl: template.httpUrl,
    });
  }
}
