import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import { StackSetTemplateStack } from './stack-set-template-stack';

/**
 * Deployment environment for an AWS StackSet stack.
 *
 * Interoperates with the StackSynthesizer of the parent stack.
 */
export class StackSetSynthesizer extends cdk.DefaultStackSynthesizer {
  private readonly assetBucket?: cdk.aws_s3.IBucket;
  private bucketDeployment?: cdk.aws_s3_deployment.BucketDeployment;

  constructor(assetBucket?: cdk.aws_s3.IBucket) {
    super();
    this.assetBucket = assetBucket;
  }

  public addFileAsset(asset: cdk.FileAssetSource): cdk.FileAssetLocation {
    if (!this.assetBucket) {
      throw new Error('An Asset Bucket must be provided to use Assets');
    }
    const outdir = cdk.App.of(this.boundStack)?.outdir ?? 'cdk.out';
    const assetPath = `${outdir}/${asset.fileName}`; // was `./${outdir}/${asset.fileName}`

    if (!this.bucketDeployment) {
      const parentStack = (this.boundStack as StackSetTemplateStack)._getParentStack();
      if (!cdk.Resource.isOwnedResource(this.assetBucket)) {
        cdk.Annotations.of(parentStack).addWarning('[WARNING] Bucket Policy Permissions cannot be added to' +
          ' referenced Bucket. Please make sure your bucket has the correct permissions');
      }

      this.bucketDeployment = new cdk.aws_s3_deployment.BucketDeployment(parentStack, 'AssetsBucketDeployment', {
        sources: [cdk.aws_s3_deployment.Source.asset(assetPath)],
        destinationBucket: this.assetBucket,
        extract: false,
        prune: false,
      });

    } else {
      this.bucketDeployment.addSource(cdk.aws_s3_deployment.Source.asset(assetPath));
    }

    const physicalName = this.physicalNameOfBucket(this.assetBucket);

    const bucketName = physicalName;
    if (!asset.fileName) {
      throw new Error('Asset file name is undefined');
    }
    const assetFileBaseName = path.basename(asset.fileName);
    const s3Filename = assetFileBaseName.split('.')[1] + '.zip';

    const objectKey = `${s3Filename}`;
    const s3ObjectUrl = `s3://${bucketName}/${objectKey}`;
    const httpUrl = `https://s3.${bucketName}/${objectKey}`;

    return { bucketName, objectKey, httpUrl, s3ObjectUrl };
    // return { bucketName, objectKey, httpUrl, s3ObjectUrl, s3Url: httpUrl };
  }

  private physicalNameOfBucket(bucket: cdk.aws_s3.IBucket) {
    let resolvedName;
    if (cdk.Resource.isOwnedResource(bucket)) {
      resolvedName = cdk.Stack.of(bucket).resolve((bucket.node.defaultChild as cdk.aws_s3.CfnBucket).bucketName);
    } else {
      resolvedName = bucket.bucketName;
    }
    if (resolvedName === undefined) {
      throw new Error('A bucketName must be provided to use Assets');
    }
    return resolvedName;
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