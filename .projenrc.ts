import * as pj from 'projen';

const project = new pj.awscdk.AwsCdkConstructLibrary({
  name: 'cdk-stackset',
  defaultReleaseBranch: 'main',

  repositoryUrl: 'https://github.com/pgarbe/cdk-stackset.git',
  author: 'Philipp Garbe',
  authorAddress: 'https://github.com/pgarbe',

  projenrcTs: true,

  cdkVersion: '2.55.1',
  devDeps: ['@aws-cdk/integ-tests-alpha', '@aws-cdk/integ-runner'],
});

project.addGitIgnore('cdk-integ.out.*.snapshot');

project.addTask('integ:update', {
  exec: 'npx integ-runner --app="ts-node {filePath}" --parallel-regions eu-central-1 --test-regex \'.*integ\\.[\\w\\d-]*.ts$\' --update-on-failed -v -v -v -v',
});
project.testTask.spawn(project.addTask('integ', {
  exec: 'npx integ-runner --app="ts-node {filePath}" --parallel-regions eu-central-1 --test-regex \'.*integ\\.[\\w\\d-]*.ts$\'',
}));

project.synth();
