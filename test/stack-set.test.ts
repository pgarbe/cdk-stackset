import * as fs from 'fs';
import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Construct } from 'constructs';
import { StackSet, StackSetTemplateStack } from '../src/index';

export class MyDoubleStackSetStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props: cdk.StackProps = {}) {
    super(scope, id, props);

    const templateA = new TargetAccountAStack(this, 'TemplateA');
    const templateB = new TargetAccountBStack(this, 'TemplateB');

    new StackSet(this, 'StackSetA', {
      stack: templateA,
      orgId: 'o-asdf',
      stackSetName: 'MyStackSetStackNameA',
    });
    new StackSet(this, 'StackSetB', {
      stack: templateB,
      orgId: 'o-asdf',
      stackSetName: 'MyStackSetStackNameB',
    });
  };
}

export class MyStackSetStack extends cdk.Stack {

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

export class TargetAccountAStack extends StackSetTemplateStack {

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

export class TargetAccountBStack extends StackSetTemplateStack {

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

it('should have a bucket with unique id based on stack and StackSet id', () => {
  const app = new cdk.App();
  const stack = new MyStackSetStack(app, 'Parent');
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::S3::Bucket', {
    BucketName: 'cdk-assets-shared-template-stackset',
  });
});

it('Template for StackSet should contain shared asset bucket if env is set', () => {
  const app = new cdk.App();
  new MyStackSetStack(app, 'Parent', { env: { account: '123456789012', region: 'eu-west-1' } });

  const session = app.synth();

  const template = Template.fromJSON(readJson(session.directory, 'ParentTemplate0B4BAA82.stackset.template.json'));
  template.hasResourceProperties('AWS::Lambda::Function', {
    Code: {
      S3Bucket: 'cdk-assets-shared-template-stackset',
      S3Key: 'eb5b005c858404ea0c8f68098ed5dcdf5340e02461f149751d10f59c210d5ef8.zip',
    },
  });
});

it('Template for StackSet should contain shared asset bucket', () => {
  const app = new cdk.App();
  new MyStackSetStack(app, 'Parent');

  const session = app.synth();

  const template = Template.fromJSON(readJson(session.directory, 'ParentTemplate0B4BAA82.stackset.template.json'));
  template.hasResourceProperties('AWS::Lambda::Function', {
    Code: {
      S3Bucket: {
        'Fn::Sub': 'cdk-assets-shared-template-stackset',
      },
      S3Key: 'eb5b005c858404ea0c8f68098ed5dcdf5340e02461f149751d10f59c210d5ef8.zip',
    },
  });
});

it('should have a defined list of files in cloud assembly', () => {
  const app = new cdk.App();
  new MyStackSetStack(app, 'Parent');

  const session = app.synth();

  const parentStackFiles = ['Parent.assets.json', 'Parent.template.json'];
  const stackSetStackFiles = ['ParentTemplate0B4BAA82.stackset.template.json'];
  const cdkStandarddFiles = ['cdk.out', 'manifest.json', 'tree.json'];
  const assetsForS3Deployment = [
    'asset.2bc265c5e0569aeb24a6349c15bd54e76e845892376515e036627ab0cc70bb64', // "Copy" Lambda Function
    'asset.3f51abb709b8e65167a45aeed02bab11540603d909005d7148230ba5ce6c74d7', // Lambda for S3 AutoDelete
    'asset.5d8d1d0aacea23824c62f362e1e3c14b7dd14a31c71b53bfae4d14a6373c5510.zip', // AWS Cli as Layer
  ];

  // Use this check to find out how find the real name of the stackset.template.json.
  expect(list(session.directory)).toEqual([
    ...parentStackFiles,
    ...stackSetStackFiles,
    ...assetsForS3Deployment,
    'asset.eb5b005c858404ea0c8f68098ed5dcdf5340e02461f149751d10f59c210d5ef8', // Asset for Lambda in StackSet stack
    'asset.eb5b005c858404ea0c8f68098ed5dcdf5340e02461f149751d10f59c210d5ef8.eb5b005c858404ea0c8f68098ed5dcdf5340e02461f149751d10f59c210d5ef8', // Not sure what is this...
    ...cdkStandarddFiles,
  ]);
});

it('should match all possible snapshots', () => {
  const app = new cdk.App();
  const stack = new MyDoubleStackSetStack(app, 'Parent');
  const template = Template.fromStack(stack);
  const session = app.synth();

  template.hasResourceProperties('AWS::S3::Bucket', {
    BucketName: 'cdk-assets-shared-templatea-stackseta',
  });
  template.hasResourceProperties('AWS::S3::Bucket', {
    BucketName: 'cdk-assets-shared-templateb-stacksetb',
  });

  expect(template).toMatchSnapshot();
  expect(readJson(session.directory, 'Parent.assets.json')).toMatchSnapshot();

  const stackSetA = Template.fromJSON(readJson(session.directory, 'ParentTemplateA8A21BF8C.stackset.template.json'));
  expect(stackSetA).toMatchSnapshot();

  const stackSetB = Template.fromJSON(readJson(session.directory, 'ParentTemplateB40CD467D.stackset.template.json'));
  expect(stackSetB).toMatchSnapshot();

  // template.hasResourceProperties('AWS::CloudFormation::StackSet', {
  //   TemplateURL: {
  //     'Fn::Sub': 'https://s3.${AWS::Region}.${AWS::URLSuffix}/cdk-hnb659fds-assets-${AWS::AccountId}-${AWS::Region}/d38a796891e8525d659060af66cf2bc55b8ef4634b9120ef4a0c95ace2290417.json',
  //   },
  // });
});

it('should have the stack template as an asset', () => {
  const app = new cdk.App();
  const stack = new MyStackSetStack(app, 'Parent');
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::CloudFormation::StackSet', {
    TemplateURL: {
      'Fn::Sub': 'https://s3.${AWS::Region}.${AWS::URLSuffix}/cdk-hnb659fds-assets-${AWS::AccountId}-${AWS::Region}/2b61d5bd2f08a6595ee20070b34df68f7ff16e949dae46cd030858c69a863767.json',
    },
  });
});

// TODO: Copy job should move it into the right bucket

it('Parent stack should have the assets of StackSet stack', () => {
  // eb5b005c858404ea0c8f68098ed5dcdf5340e02461f149751d10f59c210d5ef8.zip

});

it('Parent stack should have the StackSet template stack asset', () => {
  // const app = new cdk.App();
  // new MyStackSetStack(app, 'Parent');

  // const session = app.synth();

  // expect(readJson(session.directory, 'parent.assets.json')).toMatchObject({
  //   files: Match.objectLike({
  //     d38a796891e8525d659060af66cf2bc55b8ef4634b9120ef4a0c95ace2290417: {
  //       destinations: {
  //         'current_account-current_region': {
  //           assumeRoleArn: 'arn:${AWS::Partition}:iam::${AWS::AccountId}:role/cdk-hnb659fds-file-publishing-role-${AWS::AccountId}-${AWS::Region}',
  //           bucketName: 'cdk-hnb659fds-assets-${AWS::AccountId}-${AWS::Region}',
  //           objectKey: 'd38a796891e8525d659060af66cf2bc55b8ef4634b9120ef4a0c95ace2290417.json',
  //         },
  //       },
  //       source: {
  //         packaging: 'file',
  //         path: 'testTemplate7B2E096A.stackset.template.json',
  //       },
  //     },
  //   }),
  // });
});


it('should create StackSet after assets have been deployed', () => {
  const app = new cdk.App();
  const stack = new MyDoubleStackSetStack(app, 'Parent');
  const template = Template.fromStack(stack);

  template.hasResource('AWS::CloudFormation::StackSet', {
    DependsOn: ['StackSetADeployAwsCliLayer98C96747', 'StackSetADeployCustomResource3C31EDBA'],
  });

});

function readJson(outdir: string, file: string): any {
  return JSON.parse(fs.readFileSync(path.join(outdir, file), 'utf-8'));
}

function list(outdir: string): string[] {
  return fs.readdirSync(outdir).sort();
}

