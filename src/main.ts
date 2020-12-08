import * as cdk from '@aws-cdk/core';
import { PipelineStack } from './PipelineStack';

const app = new cdk.App();

new PipelineStack(app, 'cdk-stackset-pipeline');

app.synth();