import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3_assets from 'aws-cdk-lib/aws-s3-assets';
import { StackSetTemplateStack } from '../src/index';


describe('StackSetTemplateStack', () => {
  test('Asset bucket undefined in stackset stack without assets', () => {
    // GIVEN
    const app = new cdk.App();
    const mainStack = new cdk.Stack(app, 'MyStack');
    const stackSetTemplateStack = new StackSetTemplateStack(mainStack, 'productStack');

    // THEN
    expect(stackSetTemplateStack._getAssetBucket()).toBeUndefined();
  });

  test('Used defined Asset bucket in product stack with assets', () => {
    // GIVEN
    const app = new cdk.App(
      { outdir: 'cdk.out' },
    );
    const mainStack = new cdk.Stack(app, 'MyStack');
    const testAssetBucket = new s3.Bucket(mainStack, 'TestAssetBucket', {
      bucketName: 'test-asset-bucket',
    });
    const productStack = new StackSetTemplateStack(mainStack, 'MyStackSetTemplateStack', {
      assetBucket: testAssetBucket,
    });

    // WHEN
    new s3_assets.Asset(productStack, 'testAsset', {
      path: path.join(__dirname, 'assets'),
    });

    // THEN
    expect(productStack._getAssetBucket()).toBeDefined();
  });

  test('fails if bucketName is not specified in product stack with assets', () => {
    // GIVEN
    const app = new cdk.App(
      { outdir: 'cdk.out' },
    );
    const mainStack = new cdk.Stack(app, 'MyStack');
    const testAssetBucket = new s3.Bucket(mainStack, 'TestAssetBucket', {
    });
    new StackSetTemplateStack(mainStack, 'MyStackSetTemplateStack', {
      assetBucket: testAssetBucket,
    });
  });
});
