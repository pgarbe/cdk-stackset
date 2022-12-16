import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StackSetSynthesizer } from './stack-set-synthesizer';

export class StackSetStack extends cdk.Stack {
  public readonly templateFile: string;

  private _templateUrl?: string;
  private _parentStack: cdk.Stack;

  constructor(scope: Construct, id: string) {
    const parentStack = findParentStack(scope);

    super(scope, id, {
      synthesizer: new StackSetSynthesizer(parentStack.synthesizer),
    });

    this._parentStack = parentStack;

    // this is the file name of the synthesized template file within the cloud assembly
    this.templateFile = `${cdk.Names.uniqueId(this)}.stackset.template.json`;
  }

  /**
   * Returns all file assets of the StackSet stack
   *
   * This list is needed to create an S3 deployment from the CDK bootstrap bucket to a bucket with wider permissions.
   *
   * @internal
   */
  public _getFileAssets(): cdk.FileAssetSource[] {
    return (this.synthesizer as StackSetSynthesizer).fileAssets;
  }

  /**
   * Fetch the template URL.
   *
   * @internal
   */
  public _getTemplateUrl(): string {
    return cdk.Lazy.uncachedString({ produce: () => this._templateUrl });
  }

  /**
   * Synthesize the product stack template, overrides the `super` class method.
   *
   * Defines an asset at the parent stack which represents the template of this
   * product stack.
   *
   * @internal
   */
  public _synthesizeTemplate(session: cdk.ISynthesisSession): void {
    let cfn = JSON.stringify(this._toCloudFormation(), undefined, 2);

    // const fileAssetBucketName = `cdk-hnb659fds-assets-${this.account}-${this.region}`;
    const fileAssetBucketName = 'cdk-hnb659fds-assets-${AWS::AccountId}-${AWS::Region}';
    const sharedFileAssetBucketName = `cdk-assets-shared-${this.node.id.toLowerCase()}`;

    // Ensure that assets in the template use the shared assets bucket
    // But in the manifest, all assets needs to be uploaded to the cdk bootstrap bucket
    cfn = cfn.replace(fileAssetBucketName, sharedFileAssetBucketName);

    const templateHash = crypto.createHash('sha256').update(cfn).digest('hex');

    this._templateUrl = this._parentStack.synthesizer.addFileAsset({
      packaging: cdk.FileAssetPackaging.FILE,
      sourceHash: templateHash,
      fileName: this.templateFile,
    }).httpUrl;

    fs.writeFileSync(path.join(session.assembly.outdir, this.templateFile), cfn);
  }
}

/**
 * Validates the scope for a product stack, which must be defined within the scope of another `Stack`.
 */
function findParentStack(scope: Construct): cdk.Stack {
  try {
    const parentStack = cdk.Stack.of(scope);
    return parentStack as cdk.Stack;
  } catch (e) {
    throw new Error('Product stacks must be defined within scope of another non-product stack');
  }
}
