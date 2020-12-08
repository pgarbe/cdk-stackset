const { AwsCdkTypeScriptApp } = require('projen');

const project = new AwsCdkTypeScriptApp({
  cdkVersion: '1.77.0',
  name: 'cdk-stackset',
  cdkDependencies: [
    '@aws-cdk/aws-cloudformation',
    '@aws-cdk/aws-codebuild',
    '@aws-cdk/aws-codepipeline',
    '@aws-cdk/aws-codepipeline-actions',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-s3',
    '@aws-cdk/aws-s3-assets',
    '@aws-cdk/aws-s3-deployment',
    '@aws-cdk/aws-sns',
    '@aws-cdk/pipelines',
  ],
  deps: [
    'cdk-iam-floyd',
  ],
  context: {
    '@aws-cdk/core:newStyleStackSynthesis': 'true',
  },

});

project.synth();
