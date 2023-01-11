import { IntegTest } from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StackSet, StackSetTemplateStack, StackSetTemplateStackProps } from '../src';

export class StackUnderTest extends cdk.Stack {

  constructor(scope: Construct, id: string, props: cdk.StackProps = {}) {
    super(scope, id, props);

    const assetBucket = new cdk.aws_s3.Bucket(this, 'Assets', {
      bucketName: `${id.toLocaleLowerCase()}-stackset-assets`,
      encryption: cdk.aws_s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const template = new TargetAccountAStack(this, 'Template', { assetBucket });

    new StackSet(this, 'StackSet', {
      stack: template,
      orgId: 'o-asdf',
      stackSetName: 'MyStackSetStackName',
    });
  };
}

export class TargetAccountAStack extends StackSetTemplateStack {

  constructor(scope: Construct, id: string, props: StackSetTemplateStackProps) {
    super(scope, id, props);

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

// const apiCall = integ.assertions.awsApiCall('S3', 'listObjects', {
//   Bucket: 'cdk-assets-shared-template-stackset',
// });

// apiCall.provider.addToRolePolicy({
//   Effect: 'Allow',
//   Action: ['s3:GetObject', 's3:ListBucket'],
//   Resource: ['*'],
// });

// apiCall.expect(ExpectedResult.objectLike({ Payload: 'OK' }));

// TODO: Check that the template links to the shared bucket

app.synth();
