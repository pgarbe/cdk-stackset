import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StackSetSynthesizer } from './stack-set-synthesizer';

export interface StackSetTemplateStackProps {
  /**
   * Regions can be passed to store assets, enabling StackSetTemplateStack Asset support
   * @default No region provided and Assets will not be supported.
   */
  readonly assetRegions?: string[];

  /**
   * @default 'cdk'
   */
  readonly qualifier?: string;
}

/**
 * A StackSet template stack, which is similar in form to a Cloudformation nested stack.
 * You can add the resources to this stack that you want to define for your StackSet template.
 *
 * This stack will not be treated as an independent deployment
 * artifact (won't be listed in "cdk list" or deployable through "cdk deploy"),
 * but rather only synthesized as a template and uploaded as an asset to S3.
 *
 * It supports file-based assets which will be added to the parent stack.
 *
 * It is used to define the resources for your StackSet template. The StackSetTemplateStack
 * is not treated as an independent deployment artifact and is synthesized as a template
 * and uploaded as an asset to S3.
 */
export class StackSetTemplateStack extends cdk.Stack {
  public readonly templateFile: string;

  private _templateUrl?: string;
  private _parentStack: cdk.Stack;

  constructor(scope: Construct, id: string, props: StackSetTemplateStackProps = {}) {
    const parentStack = findParentStack(scope);

    super(scope, id, {
      synthesizer: new StackSetSynthesizer(props.assetRegions, props.qualifier),
    });

    this._parentStack = parentStack;

    // this is the file name of the synthesized template file within the cloud assembly
    this.templateFile = `${cdk.Names.uniqueId(this)}.stackset.template.json`;
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
