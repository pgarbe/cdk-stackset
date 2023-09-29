import * as pj from 'projen';

const project = new pj.awscdk.AwsCdkConstructLibrary({
  name: 'cdk-stackset',
  defaultReleaseBranch: 'main',

  repositoryUrl: 'https://github.com/pgarbe/cdk-stackset.git',
  author: 'Philipp Garbe',
  authorAddress: 'https://github.com/pgarbe',

  projenrcTs: true,

  cdkVersion: '2.99.0',
  jsiiVersion: '~5.0.0',
  devDeps: ['@aws-cdk/integ-tests-alpha', '@aws-cdk/integ-runner'],
});

project.addGitIgnore('cdk-integ.out.*.snapshot');

project.addTask('integ:update', {
  exec: 'npx integ-runner --parallel-regions eu-west-1 -l typescript --update-on-failed',
});
project.addTask('integ', {
  exec: 'npx integ-runner --parallel-regions eu-west-1 -l typescript ',
});

project.synth();
