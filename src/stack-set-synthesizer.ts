/* eslint-disable @typescript-eslint/naming-convention */
import * as cdk from 'aws-cdk-lib';
import { StackSetTemplateStack } from './stack-set-template-stack';

/**
 * Synthesizer for StackSetStack stacks.
 *
 * It works only with StackSetStack (which is a nested Stack).
 * File Assets will be added as assets to the parent stack.
 *
 * In addition, it creates a BucketDeployment to copy these
 * assets from the parent's asset bucket to a given bucket
 * to support cross-account and cross-region usage.
 *
 */
export class StackSetSynthesizer extends cdk.DefaultStackSynthesizer {
  private readonly assetBucketQualifier?: string;
  private readonly regions?: string[];
  private bucketDeployments: Record<string, cdk.aws_s3_deployment.BucketDeployment> = {};

  constructor(regions?: string[], assetBucketQualifier?: string) {
    super();

    this.assetBucketQualifier = assetBucketQualifier;
    this.regions = regions;
  }

  public addFileAsset(asset: cdk.FileAssetSource): cdk.FileAssetLocation {
    if (!this.regions) {
      throw new Error('Regions must be provided to use Assets');
    }
    const parentStack = (this.boundStack as StackSetTemplateStack)._getParentStack();
    const accountId = parentStack.account;
    if (cdk.Token.isUnresolved(accountId)) {
      throw new Error(
        'AccountId can not be an unresolved token. Ensure that you are setting "env" properties on the stack, and passing the props to the super() call',
      );
    }

    const assetBucket = `${this.assetBucketQualifier ?? 'cdk'}-assets-shared-${accountId}`;

    const outdir = cdk.App.of(this.boundStack)?.outdir ?? 'cdk.out';
    const assetPath = `${outdir}/${asset.fileName}`;

    this.regions.forEach((region) => {
      if (!this.bucketDeployments[region]) {
        const destinationBucket = cdk.aws_s3.Bucket.fromBucketName(
          parentStack,
          `DestBucket${region.replace('-', '')}`,
          `${assetBucket}-${region}`,
        );
        this.bucketDeployments[region] = new cdk.aws_s3_deployment.BucketDeployment(
          parentStack,
          `AssetsBucketDeployment${region.replace('-', '')}`,
          {
            sources: [cdk.aws_s3_deployment.Source.asset(assetPath)],
            destinationBucket,
            extract: false,
            prune: false,
          },
        );
      } else {
        this.bucketDeployments[region].addSource(cdk.aws_s3_deployment.Source.asset(assetPath));
      }
    });

    const assetBucketWithRegion = cdk.Fn.join('-', [assetBucket, this.boundStack.region]);
    if (!asset.fileName) {
      throw new Error('Asset file name is undefined');
    }

    const assetFileBaseName = cdk.FileSystem.fingerprint(assetPath);
    const s3Filename = assetFileBaseName + '.zip';

    const objectKey = `${s3Filename}`;
    const s3ObjectUrl = `s3://${assetBucketWithRegion}/${objectKey}`;
    const httpUrl = `https://s3.${assetBucketWithRegion}/${objectKey}`;

    return { bucketName: assetBucketWithRegion, objectKey, httpUrl, s3ObjectUrl };
  }

  /**
   * Fetch the BucketDeployment
   *
   * @internal
   */
  public _getBucketDeployments(): Record<string, cdk.aws_s3_deployment.BucketDeployment> | undefined {
    return this.bucketDeployments;
  }

  public addDockerImageAsset(_asset: cdk.DockerImageAssetSource): cdk.DockerImageAssetLocation {
    throw new Error('StackSet Stacks do not support Docker Image Assets, yet');
  }

  public synthesize(session: cdk.ISynthesisSession): void {
    // Synthesize the template, but don't emit as a cloud assembly artifact.
    // It will be registered as an S3 asset of its parent instead.
    this.synthesizeTemplate(session);
  }
}
