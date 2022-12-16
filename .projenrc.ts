import * as pj from 'projen';

const project = new pj.awscdk.AwsCdkConstructLibrary({
  name: 'cdk-stackset',
  defaultReleaseBranch: 'main',

  repositoryUrl: 'https://github.com/pgarbe/cdk-stackset',
  author: 'Philipp Garbe',
  authorAddress: 'https://garbe.io',

  projenrcTs: true,

  cdkVersion: '2.55.1',
});

project.synth();
