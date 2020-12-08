import * as sns from '@aws-cdk/aws-sns';
import * as cdk from '@aws-cdk/core';

export class TargetAccountStack extends cdk.Stack {

  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps = {}) {
    super(scope, id, props);

    new sns.Topic(this, 'mytopic', {});
  }
}
