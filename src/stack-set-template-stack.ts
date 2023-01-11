import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StackSetSynthesizer } from './stack-set-synthesizer';

export interface StackSetTemplateStackProps {
  /**
      * A Bucket can be passed to store assets, enabling ProductStack Asset support
      * @default No Bucket provided and Assets will not be supported.
      */
  readonly assetBucket?: cdk.aws_s3.IBucket;
}

export class StackSetTemplateStack extends cdk.Stack {
  public readonly templateFile: string;

  private _templateUrl?: string;
  private _parentStack: cdk.Stack;
  private assetBucket?: cdk.aws_s3.IBucket;

  constructor(scope: Construct, id: string, props: StackSetTemplateStackProps = {}) {
    const parentStack = findParentStack(scope);

    super(scope, id, {
      synthesizer: new StackSetSynthesizer(props.assetBucket),
    });

    this._parentStack = parentStack;

    // this is the file name of the synthesized template file within the cloud assembly
    this.templateFile = `${cdk.Names.uniqueId(this)}.stackset.template.json`;

    this.assetBucket = props.assetBucket;
  }

  /**
     * Fetch the asset bucket.
     *
     * @internal
     */
  public _getAssetBucket(): cdk.aws_s3.IBucket | undefined {
    return this.assetBucket;
  }

  /**
   * Fetch the parent Stack.
   *
   * @internal
   */
  public _getParentStack(): cdk.Stack {
    return this._parentStack;
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

    const cfn = JSON.stringify(this._toCloudFormation(), undefined, 2);
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
