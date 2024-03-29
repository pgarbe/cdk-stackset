import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StackSetSynthesizer } from './stack-set-synthesizer';
import { StackSetTemplateStack } from './stack-set-template-stack';

export interface StackSetProps {
  readonly stackSetName: string;
  readonly stack: StackSetTemplateStack;
  readonly orgId: string;
}

/**
 * L2 construct of a StackSet (WIP)
 */
export class StackSet extends cdk.Resource {

  constructor(scope: Construct, id: string, props: StackSetProps) {
    super(scope, id, { physicalName: props.stackSetName });

    const resource = new cdk.CfnStackSet(this, 'Resource', {
      stackSetName: props.stackSetName,
      permissionModel: 'SELF_MANAGED',
      capabilities: ['CAPABILITY_NAMED_IAM'],
      executionRoleName: 'AWSCloudFormationStackSetExecutionRole',
      stackInstancesGroup: [],
      templateUrl: props.stack._getTemplateUrl(),
    });

    const bucketDeployments = (props.stack.synthesizer as StackSetSynthesizer)._getBucketDeployments();
    if (bucketDeployments) {
      for (const region in bucketDeployments) {
        resource.node.addDependency(bucketDeployments[region]);
      }
    }
  }
}