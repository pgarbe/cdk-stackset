import * as fs from 'fs';
import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Construct } from 'constructs';
import { StackSet, StackSetTemplateStack, StackSetTemplateStackProps } from '../src/index';

export class MyStackSetStack extends cdk.Stack {

  readonly template: StackSetTemplateStack;
  constructor(scope: Construct, id: string, props: cdk.StackProps = {}) {
    super(scope, id, props);

    this.template = new TargetAccountAStack(this, 'Template', { assetRegions: ['eu-west-1'] });

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

  it('template should use assets from shared bucket', () => {
    const app = new cdk.App();
    const stack = new MyStackSetStack(app, 'Parent', { env: { account: '123456789012', region: 'eu-west-1' } });

    app.synth();

    const template = JSON.parse(fs.readFileSync(path.join(app.outdir, stack.template.templateFile), 'utf-8'));
    Template.fromJSON(template).hasResourceProperties('AWS::Lambda::Function', {
      Code: {
        S3Bucket: {
          'Fn::Join': [
            '-',
            [
              'cdk-assets-shared-123456789012',
              {
                Ref: 'AWS::Region',
              },
            ],
          ],
        },
        S3Key: 'fa303df385580561eb8f1f859efbbe6b128c982e506f0bd01ab82085142ddd23.zip',
      },
    });
  });
});
