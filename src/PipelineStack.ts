import * as codebuild from '@aws-cdk/aws-codebuild';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import * as cdk from '@aws-cdk/core';
import * as pipelines from '@aws-cdk/pipelines';
import { StackSetStack } from './StackSetStack';
import { TargetAccountStack } from './TargetAccountStack';

export class PipelineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps = {}) {
    super(scope, id, props);

    const sourceArtifact = new codepipeline.Artifact();
    const cloudAssemblyArtifact = new codepipeline.Artifact();

    const pipeline = new pipelines.CdkPipeline(this, 'Pipeline', {
      cloudAssemblyArtifact,

      sourceAction: new codepipeline_actions.GitHubSourceAction({
        actionName: 'GitHub',
        output: sourceArtifact,
        oauthToken: cdk.SecretValue.secretsManager('GITHUB_TOKEN_NAME'),
        owner: 'pgarbe',
        repo: 'cdk-stackset',
      }),

      synthAction: pipelines.SimpleSynthAction.standardYarnSynth({
        environment: { buildImage: codebuild.LinuxBuildImage.STANDARD_4_0, privileged: true },
        sourceArtifact: sourceArtifact,
        cloudAssemblyArtifact,
        buildCommand: 'yarn build',
      }),
    });

    const stack = new TargetAccountStack(this.node.root as cdk.App, 'TargetAccountStack');
    pipeline.addApplicationStage(new StackSetStage(this, 'stacksetstack', { stack }));

  }
}

export interface StackSetStageProps extends cdk.StageProps {
  stack: cdk.Stack;
}

export class StackSetStage extends cdk.Stage {
  constructor(scope: cdk.Construct, id: string, props: StackSetStageProps) {
    super(scope, id, props);

    new StackSetStack(this, 'StackSet', props);
  }
}
