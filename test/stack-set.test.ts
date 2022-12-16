import * as fs from 'fs';
import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Construct } from 'constructs';
import { StackSet, StackSetStack } from '../src/index';

export class MyStackSetStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props: cdk.StackProps = {}) {
    super(scope, id, props);

    const template = new TargetAccountStack(this, 'Template');

    new StackSet(this, 'StackSet', {
      stack: template,
      orgId: 'o-asdf',
      stackSetName: 'MyStackSetStackName',
    });
  };
}

export class TargetAccountStack extends StackSetStack {

  constructor(scope: Construct, id: string) {
    super(scope, id);

    new cdk.aws_lambda.Function(this, 'Lambda', {
      code: cdk.aws_lambda.Code.fromInline('foobar'),
      handler: 'index',
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      logRetention: cdk.aws_logs.RetentionDays.EIGHTEEN_MONTHS, // Enforces CDK to create a custom resource
    });
  }
}

it('Snapshot', () => {
  const app = new cdk.App();
  const stack = new MyStackSetStack(app, 'test');
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::CloudFormation::StackSet', {
    TemplateURL: {
      'Fn::Sub': 'https://s3.${AWS::Region}.${AWS::URLSuffix}/cdk-hnb659fds-assets-${AWS::AccountId}-${AWS::Region}/d38a796891e8525d659060af66cf2bc55b8ef4634b9120ef4a0c95ace2290417.json',
    },
  });
});

it('Template for StackSet should contain shared asset bucket', () => {
  const app = new cdk.App();
  new MyStackSetStack(app, 'test');

  const session = app.synth();

  // Use this check to find out how find the real name of the stackset.template.json.
  console.log(list(session.directory));

  const template = Template.fromJSON(readJson(session.directory, 'testTemplate7B2E096A.stackset.template.json'));
  template.hasResourceProperties('AWS::Lambda::Function', {
    Code: {
      S3Bucket: {
        'Fn::Sub': 'cdk-assets-shared-template',
      },
      S3Key: 'eb5b005c858404ea0c8f68098ed5dcdf5340e02461f149751d10f59c210d5ef8.zip',
    },
  });
});

it('Template for StackSet should not have any assets', () => {
  const app = new cdk.App();
  new MyStackSetStack(app, 'test');

  const session = app.synth();

  expect(readJson(session.directory, 'testTemplate7B2E096A.assets.json')).toMatchObject({
    dockerImages: {},
    files: {},
    version: '22.0.0',
  });
});

// it('Parent stack should have the parent stack asset', () => {
//   const app = new cdk.App();
//   new MyStackSetStack(app, 'test');

//   const session = app.synth();

//   // testTemplate7B2E096A.assets.json
//   expect(readJson(session.directory, 'test.assets.json')).toBe({
//     foo: 'bar',
//   });
// });

// it('Parent stack should have the StackSet template stack asset', () => {
//   const app = new cdk.App();
//   new MyStackSetStack(app, 'test');

//   const session = app.synth();

//   // testTemplate7B2E096A.assets.json
//   expect(readJson(session.directory, 'test.assets.json')).toBe({
//     foo: 'bar',
//   });
// });

// it('Parent stack should have the assets of the StackSet template stack', () => {
//   const app = new cdk.App();
//   new MyStackSetStack(app, 'test');

//   const session = app.synth();

//   // testTemplate7B2E096A.assets.json
//   expect(readJson(session.directory, 'test.assets.json')).toBe({
//     foo: 'bar',
//   });
// });

function readJson(outdir: string, file: string) {
  return JSON.parse(fs.readFileSync(path.join(outdir, file), 'utf-8'));
}

function list(outdir: string) {
  return fs.readdirSync(outdir).sort();
}
