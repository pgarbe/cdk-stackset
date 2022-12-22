import { IntegTest } from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StackSet, StackSetStack } from '../src';

export class StackUnderTest extends cdk.Stack {

  constructor(scope: Construct, id: string, props: cdk.StackProps = {}) {
    super(scope, id, props);

    const template = new TargetAccountAStack(this, 'Template');

    new StackSet(this, 'StackSet', {
      stack: template,
      orgId: 'o-asdf',
      stackSetName: 'MyStackSetStackName',
    });
  };
}

export class TargetAccountAStack extends StackSetStack {

  constructor(scope: Construct, id: string) {
    super(scope, id);

    new cdk.aws_lambda.Function(this, 'Lambda', {
      code: cdk.aws_lambda.Code.fromInline('foobar'),
      handler: 'handler',
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      logRetention: cdk.aws_logs.RetentionDays.EIGHTEEN_MONTHS, // Enforces CDK to create a custom resource
    });
  }
}

const app = new cdk.App();
const testCase = new StackUnderTest(app, 'cdk-stackset-integration-test', {});

new IntegTest(app, 'IntegTest', {
  testCases: [testCase],
});

// TODO: Waits for https://github.com/aws/aws-cdk/issues/23442

// integ.assertions.awsApiCall('CloudFormation', 'describeStackSet', {
//   StackSetName: 'MyStackSetStackName',
// });

// const result = integ.assertions.awsApiCall('S3', 'listObjects', {
//   Bucket: 'cdk-assets-shared-template-stackset',
// });
// result.expect(ExpectedResult.objectLike({ Payload: 'OK' }));
