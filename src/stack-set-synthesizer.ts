import * as cdk from 'aws-cdk-lib';

/**
 * Deployment environment for an AWS StackSet stack.
 *
 * Interoperates with the StackSynthesizer of the parent stack.
 */
export class StackSetSynthesizer extends cdk.DefaultStackSynthesizer {
  public readonly fileAssets: cdk.FileAssetSource[] = [];

  constructor(private readonly parentDeployment: cdk.IStackSynthesizer) {
    super({ generateBootstrapVersionRule: false });
  }

  public addFileAsset(asset: cdk.FileAssetSource): cdk.FileAssetLocation {
    // TODO: Do we need to add the asset?
    const fileAssetLocation = this.parentDeployment.addFileAsset(asset);
    this.fileAssets.push(asset);
    return fileAssetLocation;
  }

  public addDockerImageAsset(_asset: cdk.DockerImageAssetSource): cdk.DockerImageAssetLocation {
    throw new Error('StackSet Stacks do not support Docker Image Assets, yet');
  }
}