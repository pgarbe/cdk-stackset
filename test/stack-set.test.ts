import * as fs from 'fs';
import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Construct } from 'constructs';
import { StackSet, StackSetTemplateStack, StackSetTemplateStackProps } from '../src/index';

export class MyDoubleStackSetStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props: cdk.StackProps = {}) {
    super(scope, id, props);

    const assetBucket = new cdk.aws_s3.Bucket(this, 'Assets', {
      encryption: cdk.aws_s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const templateA = new TargetAccountAStack(this, 'TemplateA', { assetBucket });
    const templateB = new TargetAccountBStack(this, 'TemplateB', { assetBucket });

    new StackSet(this, 'StackSetA', {
      stack: templateA,
      orgId: 'o-asdf',
      stackSetName: 'MyStackSetTemplateStackNameA',
    });
    new StackSet(this, 'StackSetB', {
      stack: templateB,
      orgId: 'o-asdf',
      stackSetName: 'MyStackSetStackNameB',
    });
  };
}

export class MyStackSetStack extends cdk.Stack {

  readonly template: StackSetTemplateStack;
  constructor(scope: Construct, id: string, props: cdk.StackProps = {}) {
    super(scope, id, props);

    const assetBucket = new cdk.aws_s3.Bucket(this, 'Assets', {
      bucketName: 'test-asset-bucket',
      encryption: cdk.aws_s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    this.template = new TargetAccountAStack(this, 'Template', { assetBucket });

    new StackSet(this, 'StackSet', {
      stack: this.template,
      orgId: 'o-asdf',
      stackSetName: 'MyStackSetStackName',
    });
  };
}

export class TargetAccountAStack extends StackSetTemplateStack {

  constructor(scope: Construct, id: string, props: StackSetTemplateStackProps) {
    super(scope, id, props);

    new cdk.aws_lambda.Function(this, 'Lambda', {
      code: cdk.aws_lambda.Code.fromAsset(path.join(__dirname, 'assets')),
      handler: 'index',
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      logRetention: cdk.aws_logs.RetentionDays.EIGHTEEN_MONTHS, // Enforces CDK to create a custom resource
    });
  }
}

export class TargetAccountBStack extends StackSetTemplateStack {

  constructor(scope: Construct, id: string, props: StackSetTemplateStackProps) {
    super(scope, id, props);

    new cdk.aws_lambda.Function(this, 'Lambda', {
      code: cdk.aws_lambda.Code.fromInline('foobar'),
      handler: 'index',
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      logRetention: cdk.aws_logs.RetentionDays.EIGHTEEN_MONTHS, // Enforces CDK to create a custom resource
    });
  }
}

describe('StackSet', () => {

  it('should have a bucket with unique id based on stack and StackSet id', () => {
    const app = new cdk.App();
    const stack = new MyStackSetStack(app, 'Parent');
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::S3::Bucket', {
      BucketName: 'test-asset-bucket',
    });
  });

  it('template should use assets from shared bucket', () => {
    const app = new cdk.App();
    const stack = new MyStackSetStack(app, 'Parent');

    app.synth();

    const template = JSON.parse(fs.readFileSync(path.join(app.outdir, stack.template.templateFile), 'utf-8'));
    Template.fromJSON(template).hasResourceProperties('AWS::Lambda::Function', {
      Code: {
        S3Bucket: 'test-asset-bucket',
        S3Key: 'fa303df385580561eb8f1f859efbbe6b128c982e506f0bd01ab82085142ddd23.zip',
      },
    });
  });
});
