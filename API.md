# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### StackSet <a name="StackSet" id="cdk-stackset.StackSet"></a>

L2 construct of a StackSet.

#### Initializers <a name="Initializers" id="cdk-stackset.StackSet.Initializer"></a>

```typescript
import { StackSet } from 'cdk-stackset'

new StackSet(scope: Construct, id: string, props: StackSetProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-stackset.StackSet.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-stackset.StackSet.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-stackset.StackSet.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-stackset.StackSetProps">StackSetProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-stackset.StackSet.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-stackset.StackSet.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-stackset.StackSet.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-stackset.StackSetProps">StackSetProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-stackset.StackSet.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#cdk-stackset.StackSet.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |

---

##### `toString` <a name="toString" id="cdk-stackset.StackSet.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="cdk-stackset.StackSet.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="cdk-stackset.StackSet.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-stackset.StackSet.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#cdk-stackset.StackSet.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#cdk-stackset.StackSet.isResource">isResource</a></code> | Check whether the given construct is a Resource. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-stackset.StackSet.isConstruct"></a>

```typescript
import { StackSet } from 'cdk-stackset'

StackSet.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-stackset.StackSet.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="cdk-stackset.StackSet.isOwnedResource"></a>

```typescript
import { StackSet } from 'cdk-stackset'

StackSet.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="cdk-stackset.StackSet.isOwnedResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isResource` <a name="isResource" id="cdk-stackset.StackSet.isResource"></a>

```typescript
import { StackSet } from 'cdk-stackset'

StackSet.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="cdk-stackset.StackSet.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-stackset.StackSet.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-stackset.StackSet.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#cdk-stackset.StackSet.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#cdk-stackset.StackSet.property.sharedAssetBucket">sharedAssetBucket</a></code> | <code>aws-cdk-lib.aws_s3.IBucket</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-stackset.StackSet.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="cdk-stackset.StackSet.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="cdk-stackset.StackSet.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `sharedAssetBucket`<sup>Required</sup> <a name="sharedAssetBucket" id="cdk-stackset.StackSet.property.sharedAssetBucket"></a>

```typescript
public readonly sharedAssetBucket: IBucket;
```

- *Type:* aws-cdk-lib.aws_s3.IBucket

---


### StackSetTemplateStack <a name="StackSetTemplateStack" id="cdk-stackset.StackSetTemplateStack"></a>

#### Initializers <a name="Initializers" id="cdk-stackset.StackSetTemplateStack.Initializer"></a>

```typescript
import { StackSetTemplateStack } from 'cdk-stackset'

new StackSetTemplateStack(scope: Construct, id: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-stackset.StackSetTemplateStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-stackset.StackSetTemplateStack.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-stackset.StackSetTemplateStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-stackset.StackSetTemplateStack.Initializer.parameter.id"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-stackset.StackSetTemplateStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.addMetadata">addMetadata</a></code> | Adds an arbitary key-value pair, with information you want to record about the stack. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.exportStringListValue">exportStringListValue</a></code> | Create a CloudFormation Export for a string list value. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a string value. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |

---

##### `toString` <a name="toString" id="cdk-stackset.StackSetTemplateStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="cdk-stackset.StackSetTemplateStack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="cdk-stackset.StackSetTemplateStack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="cdk-stackset.StackSetTemplateStack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="cdk-stackset.StackSetTemplateStack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="cdk-stackset.StackSetTemplateStack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="cdk-stackset.StackSetTemplateStack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="cdk-stackset.StackSetTemplateStack.addTransform"></a>

```typescript
public addTransform(transform: string): void
```

Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template.

Duplicate values are removed when stack is synthesized.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html)

*Example*

```typescript
declare const stack: Stack;

stack.addTransform('AWS::Serverless-2016-10-31')
```


###### `transform`<sup>Required</sup> <a name="transform" id="cdk-stackset.StackSetTemplateStack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportStringListValue` <a name="exportStringListValue" id="cdk-stackset.StackSetTemplateStack.exportStringListValue"></a>

```typescript
public exportStringListValue(exportedValue: any, options?: ExportValueOptions): string[]
```

Create a CloudFormation Export for a string list value.

Returns a string list representing the corresponding `Fn.importValue()`
expression for this Export. The export expression is automatically wrapped with an
`Fn::Join` and the import value with an `Fn::Split`, since CloudFormation can only
export strings. You can control the name for the export by passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

# See `exportValue` for an example of this process.

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="cdk-stackset.StackSetTemplateStack.exportStringListValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="cdk-stackset.StackSetTemplateStack.exportStringListValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `exportValue` <a name="exportValue" id="cdk-stackset.StackSetTemplateStack.exportValue"></a>

```typescript
public exportValue(exportedValue: any, options?: ExportValueOptions): string
```

Create a CloudFormation Export for a string value.

Returns a string representing the corresponding `Fn.importValue()`
expression for this Export. You can control the name for the export by
passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

## Example

Here is how the process works. Let's say there are two stacks,
`producerStack` and `consumerStack`, and `producerStack` has a bucket
called `bucket`, which is referenced by `consumerStack` (perhaps because
an AWS Lambda Function writes into it, or something like that).

It is not safe to remove `producerStack.bucket` because as the bucket is being
deleted, `consumerStack` might still be using it.

Instead, the process takes two deployments:

### Deployment 1: break the relationship

- Make sure `consumerStack` no longer references `bucket.bucketName` (maybe the consumer
   stack now uses its own bucket, or it writes to an AWS DynamoDB table, or maybe you just
   remove the Lambda Function altogether).
- In the `ProducerStack` class, call `this.exportValue(this.bucket.bucketName)`. This
   will make sure the CloudFormation Export continues to exist while the relationship
   between the two stacks is being broken.
- Deploy (this will effectively only change the `consumerStack`, but it's safe to deploy both).

### Deployment 2: remove the bucket resource

- You are now free to remove the `bucket` resource from `producerStack`.
- Don't forget to remove the `exportValue()` call as well.
- Deploy again (this time only the `producerStack` will be changed -- the bucket will be deleted).

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="cdk-stackset.StackSetTemplateStack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="cdk-stackset.StackSetTemplateStack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="cdk-stackset.StackSetTemplateStack.formatArn"></a>

```typescript
public formatArn(components: ArnComponents): string
```

Creates an ARN from components.

If `partition`, `region` or `account` are not specified, the stack's
partition, region and account will be used.

If any component is the empty string, an empty string will be inserted
into the generated ARN at the location that component corresponds to.

The ARN will be formatted as follows:

   arn:{partition}:{service}:{region}:{account}:{resource}{sep}{resource-name}

The required ARN pieces that are omitted will be taken from the stack that
the 'scope' is attached to. If all ARN pieces are supplied, the supplied scope
can be 'undefined'.

###### `components`<sup>Required</sup> <a name="components" id="cdk-stackset.StackSetTemplateStack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="cdk-stackset.StackSetTemplateStack.getLogicalId"></a>

```typescript
public getLogicalId(element: CfnElement): string
```

Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource.

This method is called when a `CfnElement` is created and used to render the
initial logical identity of resources. Logical ID renames are applied at
this stage.

This method uses the protected method `allocateLogicalId` to render the
logical ID for an element. To modify the naming scheme, extend the `Stack`
class and override this method.

###### `element`<sup>Required</sup> <a name="element" id="cdk-stackset.StackSetTemplateStack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="cdk-stackset.StackSetTemplateStack.regionalFact"></a>

```typescript
public regionalFact(factName: string, defaultValue?: string): string
```

Look up a fact value for the given fact for the region of this stack.

Will return a definite value only if the region of the current stack is resolved.
If not, a lookup map will be added to the stack and the lookup will be done at
CDK deployment time.

What regions will be included in the lookup map is controlled by the
`@aws-cdk/core:target-partitions` context value: it must be set to a list
of partitions, and only regions from the given partitions will be included.
If no such context key is set, all regions will be included.

This function is intended to be used by construct library authors. Application
builders can rely on the abstractions offered by construct libraries and do
not have to worry about regional facts.

If `defaultValue` is not given, it is an error if the fact is unknown for
the given region.

###### `factName`<sup>Required</sup> <a name="factName" id="cdk-stackset.StackSetTemplateStack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="cdk-stackset.StackSetTemplateStack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="cdk-stackset.StackSetTemplateStack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="cdk-stackset.StackSetTemplateStack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="cdk-stackset.StackSetTemplateStack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="cdk-stackset.StackSetTemplateStack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="cdk-stackset.StackSetTemplateStack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="cdk-stackset.StackSetTemplateStack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="cdk-stackset.StackSetTemplateStack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="cdk-stackset.StackSetTemplateStack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="cdk-stackset.StackSetTemplateStack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="cdk-stackset.StackSetTemplateStack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="cdk-stackset.StackSetTemplateStack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="cdk-stackset.StackSetTemplateStack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="cdk-stackset.StackSetTemplateStack.toJsonString.parameter.space"></a>

- *Type:* number

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-stackset.StackSetTemplateStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-stackset.StackSetTemplateStack.isConstruct"></a>

```typescript
import { StackSetTemplateStack } from 'cdk-stackset'

StackSetTemplateStack.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-stackset.StackSetTemplateStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="cdk-stackset.StackSetTemplateStack.isStack"></a>

```typescript
import { StackSetTemplateStack } from 'cdk-stackset'

StackSetTemplateStack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="cdk-stackset.StackSetTemplateStack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="cdk-stackset.StackSetTemplateStack.of"></a>

```typescript
import { StackSetTemplateStack } from 'cdk-stackset'

StackSetTemplateStack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="cdk-stackset.StackSetTemplateStack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-stackset.StackSetTemplateStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#cdk-stackset.StackSetTemplateStack.property.stackId">stackId</a></code> | <code>string</code> | The ID of the stack. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.property.stackName">stackName</a></code> | <code>string</code> | The concrete CloudFormation physical stack name. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#cdk-stackset.StackSetTemplateStack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#cdk-stackset.StackSetTemplateStack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-stackset.StackSetTemplateStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="cdk-stackset.StackSetTemplateStack.property.account"></a>

```typescript
public readonly account: string;
```

- *Type:* string

The AWS account into which this stack will be deployed.

This value is resolved according to the following rules:

1. The value provided to `env.account` when the stack is defined. This can
    either be a concrete account (e.g. `585695031111`) or the
    `Aws.ACCOUNT_ID` token.
3. `Aws.ACCOUNT_ID`, which represents the CloudFormation intrinsic reference
    `{ "Ref": "AWS::AccountId" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concerete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.account)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **account-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="cdk-stackset.StackSetTemplateStack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="cdk-stackset.StackSetTemplateStack.property.availabilityZones"></a>

```typescript
public readonly availabilityZones: string[];
```

- *Type:* string[]

Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack.

If the stack is environment-agnostic (either account and/or region are
tokens), this property will return an array with 2 tokens that will resolve
at deploy-time to the first two availability zones returned from CloudFormation's
`Fn::GetAZs` intrinsic function.

If they are not available in the context, returns a set of dummy values and
reports them as missing, and let the CLI resolve them by calling EC2
`DescribeAvailabilityZones` on the target environment.

To specify a different strategy for selecting availability zones override this method.

---

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="cdk-stackset.StackSetTemplateStack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="cdk-stackset.StackSetTemplateStack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="cdk-stackset.StackSetTemplateStack.property.environment"></a>

```typescript
public readonly environment: string;
```

- *Type:* string

The environment coordinates in which this stack is deployed.

In the form
`aws://account/region`. Use `stack.account` and `stack.region` to obtain
the specific values, no need to parse.

You can use this value to determine if two stacks are targeting the same
environment.

If either `stack.account` or `stack.region` are not concrete values (e.g.
`Aws.ACCOUNT_ID` or `Aws.REGION`) the special strings `unknown-account` and/or
`unknown-region` will be used respectively to indicate this stack is
region/account-agnostic.

---

##### `nested`<sup>Required</sup> <a name="nested" id="cdk-stackset.StackSetTemplateStack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="cdk-stackset.StackSetTemplateStack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="cdk-stackset.StackSetTemplateStack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="cdk-stackset.StackSetTemplateStack.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

The AWS region into which this stack will be deployed (e.g. `us-west-2`).

This value is resolved according to the following rules:

1. The value provided to `env.region` when the stack is defined. This can
    either be a concerete region (e.g. `us-west-2`) or the `Aws.REGION`
    token.
3. `Aws.REGION`, which is represents the CloudFormation intrinsic reference
    `{ "Ref": "AWS::Region" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concerete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.region)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **region-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `stackId`<sup>Required</sup> <a name="stackId" id="cdk-stackset.StackSetTemplateStack.property.stackId"></a>

```typescript
public readonly stackId: string;
```

- *Type:* string

The ID of the stack.

---

*Example*

```typescript
// After resolving, looks like
'arn:aws:cloudformation:us-west-2:123456789012:stack/teststack/51af3dc0-da77-11e4-872e-1234567db123'
```


##### `stackName`<sup>Required</sup> <a name="stackName" id="cdk-stackset.StackSetTemplateStack.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string

The concrete CloudFormation physical stack name.

This is either the name defined explicitly in the `stackName` prop or
allocated based on the stack's location in the construct tree. Stacks that
are directly defined under the app use their construct `id` as their stack
name. Stacks that are defined deeper within the tree will use a hashed naming
scheme based on the construct path to ensure uniqueness.

If you wish to obtain the deploy-time AWS::StackName intrinsic,
you can use `Aws.STACK_NAME` directly.

---

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="cdk-stackset.StackSetTemplateStack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="cdk-stackset.StackSetTemplateStack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="cdk-stackset.StackSetTemplateStack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="cdk-stackset.StackSetTemplateStack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="cdk-stackset.StackSetTemplateStack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="cdk-stackset.StackSetTemplateStack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="cdk-stackset.StackSetTemplateStack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Optional</sup> <a name="terminationProtection" id="cdk-stackset.StackSetTemplateStack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

---


## Structs <a name="Structs" id="Structs"></a>

### StackSetProps <a name="StackSetProps" id="cdk-stackset.StackSetProps"></a>

#### Initializer <a name="Initializer" id="cdk-stackset.StackSetProps.Initializer"></a>

```typescript
import { StackSetProps } from 'cdk-stackset'

const stackSetProps: StackSetProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-stackset.StackSetProps.property.orgId">orgId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-stackset.StackSetProps.property.stack">stack</a></code> | <code><a href="#cdk-stackset.StackSetTemplateStack">StackSetTemplateStack</a></code> | *No description.* |
| <code><a href="#cdk-stackset.StackSetProps.property.stackSetName">stackSetName</a></code> | <code>string</code> | *No description.* |

---

##### `orgId`<sup>Required</sup> <a name="orgId" id="cdk-stackset.StackSetProps.property.orgId"></a>

```typescript
public readonly orgId: string;
```

- *Type:* string

---

##### `stack`<sup>Required</sup> <a name="stack" id="cdk-stackset.StackSetProps.property.stack"></a>

```typescript
public readonly stack: StackSetTemplateStack;
```

- *Type:* <a href="#cdk-stackset.StackSetTemplateStack">StackSetTemplateStack</a>

---

##### `stackSetName`<sup>Required</sup> <a name="stackSetName" id="cdk-stackset.StackSetProps.property.stackSetName"></a>

```typescript
public readonly stackSetName: string;
```

- *Type:* string

---

## Classes <a name="Classes" id="Classes"></a>

### StackSetSynthesizer <a name="StackSetSynthesizer" id="cdk-stackset.StackSetSynthesizer"></a>

Deployment environment for an AWS StackSet stack.

Interoperates with the StackSynthesizer of the parent stack.

#### Initializers <a name="Initializers" id="cdk-stackset.StackSetSynthesizer.Initializer"></a>

```typescript
import { StackSetSynthesizer } from 'cdk-stackset'

new StackSetSynthesizer(parentDeployment: IStackSynthesizer)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-stackset.StackSetSynthesizer.Initializer.parameter.parentDeployment">parentDeployment</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | *No description.* |

---

##### `parentDeployment`<sup>Required</sup> <a name="parentDeployment" id="cdk-stackset.StackSetSynthesizer.Initializer.parameter.parentDeployment"></a>

- *Type:* aws-cdk-lib.IStackSynthesizer

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-stackset.StackSetSynthesizer.addDockerImageAsset">addDockerImageAsset</a></code> | Register a Docker Image Asset. |
| <code><a href="#cdk-stackset.StackSetSynthesizer.addFileAsset">addFileAsset</a></code> | Register a File Asset. |
| <code><a href="#cdk-stackset.StackSetSynthesizer.bind">bind</a></code> | Bind to the stack this environment is going to be used on. |
| <code><a href="#cdk-stackset.StackSetSynthesizer.synthesize">synthesize</a></code> | Synthesize the associated stack to the session. |

---

##### `addDockerImageAsset` <a name="addDockerImageAsset" id="cdk-stackset.StackSetSynthesizer.addDockerImageAsset"></a>

```typescript
public addDockerImageAsset(_asset: DockerImageAssetSource): DockerImageAssetLocation
```

Register a Docker Image Asset.

Returns the parameters that can be used to refer to the asset inside the template.

The synthesizer must rely on some out-of-band mechanism to make sure the given files
are actually placed in the returned location before the deployment happens. This can
be by writing the intructions to the asset manifest (for use by the `cdk-assets` tool),
by relying on the CLI to upload files (legacy behavior), or some other operator controlled
mechanism.

###### `_asset`<sup>Required</sup> <a name="_asset" id="cdk-stackset.StackSetSynthesizer.addDockerImageAsset.parameter._asset"></a>

- *Type:* aws-cdk-lib.DockerImageAssetSource

---

##### `addFileAsset` <a name="addFileAsset" id="cdk-stackset.StackSetSynthesizer.addFileAsset"></a>

```typescript
public addFileAsset(asset: FileAssetSource): FileAssetLocation
```

Register a File Asset.

Returns the parameters that can be used to refer to the asset inside the template.

The synthesizer must rely on some out-of-band mechanism to make sure the given files
are actually placed in the returned location before the deployment happens. This can
be by writing the intructions to the asset manifest (for use by the `cdk-assets` tool),
by relying on the CLI to upload files (legacy behavior), or some other operator controlled
mechanism.

###### `asset`<sup>Required</sup> <a name="asset" id="cdk-stackset.StackSetSynthesizer.addFileAsset.parameter.asset"></a>

- *Type:* aws-cdk-lib.FileAssetSource

---

##### `bind` <a name="bind" id="cdk-stackset.StackSetSynthesizer.bind"></a>

```typescript
public bind(stack: Stack): void
```

Bind to the stack this environment is going to be used on.

Must be called before any of the other methods are called.

###### `stack`<sup>Required</sup> <a name="stack" id="cdk-stackset.StackSetSynthesizer.bind.parameter.stack"></a>

- *Type:* aws-cdk-lib.Stack

---

##### `synthesize` <a name="synthesize" id="cdk-stackset.StackSetSynthesizer.synthesize"></a>

```typescript
public synthesize(session: ISynthesisSession): void
```

Synthesize the associated stack to the session.

###### `session`<sup>Required</sup> <a name="session" id="cdk-stackset.StackSetSynthesizer.synthesize.parameter.session"></a>

- *Type:* aws-cdk-lib.ISynthesisSession

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-stackset.StackSetSynthesizer.property.bootstrapQualifier">bootstrapQualifier</a></code> | <code>string</code> | The qualifier used to bootstrap this stack. |
| <code><a href="#cdk-stackset.StackSetSynthesizer.property.cloudFormationExecutionRoleArn">cloudFormationExecutionRoleArn</a></code> | <code>string</code> | Returns the ARN of the CFN execution Role. |
| <code><a href="#cdk-stackset.StackSetSynthesizer.property.deployRoleArn">deployRoleArn</a></code> | <code>string</code> | Returns the ARN of the deploy Role. |
| <code><a href="#cdk-stackset.StackSetSynthesizer.property.fileAssets">fileAssets</a></code> | <code>aws-cdk-lib.FileAssetSource[]</code> | *No description.* |

---

##### `bootstrapQualifier`<sup>Optional</sup> <a name="bootstrapQualifier" id="cdk-stackset.StackSetSynthesizer.property.bootstrapQualifier"></a>

```typescript
public readonly bootstrapQualifier: string;
```

- *Type:* string

The qualifier used to bootstrap this stack.

---

##### `cloudFormationExecutionRoleArn`<sup>Required</sup> <a name="cloudFormationExecutionRoleArn" id="cdk-stackset.StackSetSynthesizer.property.cloudFormationExecutionRoleArn"></a>

```typescript
public readonly cloudFormationExecutionRoleArn: string;
```

- *Type:* string

Returns the ARN of the CFN execution Role.

---

##### `deployRoleArn`<sup>Required</sup> <a name="deployRoleArn" id="cdk-stackset.StackSetSynthesizer.property.deployRoleArn"></a>

```typescript
public readonly deployRoleArn: string;
```

- *Type:* string

Returns the ARN of the deploy Role.

---

##### `fileAssets`<sup>Required</sup> <a name="fileAssets" id="cdk-stackset.StackSetSynthesizer.property.fileAssets"></a>

```typescript
public readonly fileAssets: FileAssetSource[];
```

- *Type:* aws-cdk-lib.FileAssetSource[]

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-stackset.StackSetSynthesizer.property.DEFAULT_BOOTSTRAP_STACK_VERSION_SSM_PARAMETER">DEFAULT_BOOTSTRAP_STACK_VERSION_SSM_PARAMETER</a></code> | <code>string</code> | Default bootstrap stack version SSM parameter. |
| <code><a href="#cdk-stackset.StackSetSynthesizer.property.DEFAULT_CLOUDFORMATION_ROLE_ARN">DEFAULT_CLOUDFORMATION_ROLE_ARN</a></code> | <code>string</code> | Default CloudFormation role ARN. |
| <code><a href="#cdk-stackset.StackSetSynthesizer.property.DEFAULT_DEPLOY_ROLE_ARN">DEFAULT_DEPLOY_ROLE_ARN</a></code> | <code>string</code> | Default deploy role ARN. |
| <code><a href="#cdk-stackset.StackSetSynthesizer.property.DEFAULT_DOCKER_ASSET_PREFIX">DEFAULT_DOCKER_ASSET_PREFIX</a></code> | <code>string</code> | Default Docker asset prefix. |
| <code><a href="#cdk-stackset.StackSetSynthesizer.property.DEFAULT_FILE_ASSET_KEY_ARN_EXPORT_NAME">DEFAULT_FILE_ASSET_KEY_ARN_EXPORT_NAME</a></code> | <code>string</code> | Name of the CloudFormation Export with the asset key name. |
| <code><a href="#cdk-stackset.StackSetSynthesizer.property.DEFAULT_FILE_ASSET_PREFIX">DEFAULT_FILE_ASSET_PREFIX</a></code> | <code>string</code> | Default file asset prefix. |
| <code><a href="#cdk-stackset.StackSetSynthesizer.property.DEFAULT_FILE_ASSET_PUBLISHING_ROLE_ARN">DEFAULT_FILE_ASSET_PUBLISHING_ROLE_ARN</a></code> | <code>string</code> | Default asset publishing role ARN for file (S3) assets. |
| <code><a href="#cdk-stackset.StackSetSynthesizer.property.DEFAULT_FILE_ASSETS_BUCKET_NAME">DEFAULT_FILE_ASSETS_BUCKET_NAME</a></code> | <code>string</code> | Default file assets bucket name. |
| <code><a href="#cdk-stackset.StackSetSynthesizer.property.DEFAULT_IMAGE_ASSET_PUBLISHING_ROLE_ARN">DEFAULT_IMAGE_ASSET_PUBLISHING_ROLE_ARN</a></code> | <code>string</code> | Default asset publishing role ARN for image (ECR) assets. |
| <code><a href="#cdk-stackset.StackSetSynthesizer.property.DEFAULT_IMAGE_ASSETS_REPOSITORY_NAME">DEFAULT_IMAGE_ASSETS_REPOSITORY_NAME</a></code> | <code>string</code> | Default image assets repository name. |
| <code><a href="#cdk-stackset.StackSetSynthesizer.property.DEFAULT_LOOKUP_ROLE_ARN">DEFAULT_LOOKUP_ROLE_ARN</a></code> | <code>string</code> | Default lookup role ARN for missing values. |
| <code><a href="#cdk-stackset.StackSetSynthesizer.property.DEFAULT_QUALIFIER">DEFAULT_QUALIFIER</a></code> | <code>string</code> | Default ARN qualifier. |

---

##### `DEFAULT_BOOTSTRAP_STACK_VERSION_SSM_PARAMETER`<sup>Required</sup> <a name="DEFAULT_BOOTSTRAP_STACK_VERSION_SSM_PARAMETER" id="cdk-stackset.StackSetSynthesizer.property.DEFAULT_BOOTSTRAP_STACK_VERSION_SSM_PARAMETER"></a>

```typescript
public readonly DEFAULT_BOOTSTRAP_STACK_VERSION_SSM_PARAMETER: string;
```

- *Type:* string

Default bootstrap stack version SSM parameter.

---

##### `DEFAULT_CLOUDFORMATION_ROLE_ARN`<sup>Required</sup> <a name="DEFAULT_CLOUDFORMATION_ROLE_ARN" id="cdk-stackset.StackSetSynthesizer.property.DEFAULT_CLOUDFORMATION_ROLE_ARN"></a>

```typescript
public readonly DEFAULT_CLOUDFORMATION_ROLE_ARN: string;
```

- *Type:* string

Default CloudFormation role ARN.

---

##### `DEFAULT_DEPLOY_ROLE_ARN`<sup>Required</sup> <a name="DEFAULT_DEPLOY_ROLE_ARN" id="cdk-stackset.StackSetSynthesizer.property.DEFAULT_DEPLOY_ROLE_ARN"></a>

```typescript
public readonly DEFAULT_DEPLOY_ROLE_ARN: string;
```

- *Type:* string

Default deploy role ARN.

---

##### `DEFAULT_DOCKER_ASSET_PREFIX`<sup>Required</sup> <a name="DEFAULT_DOCKER_ASSET_PREFIX" id="cdk-stackset.StackSetSynthesizer.property.DEFAULT_DOCKER_ASSET_PREFIX"></a>

```typescript
public readonly DEFAULT_DOCKER_ASSET_PREFIX: string;
```

- *Type:* string

Default Docker asset prefix.

---

##### `DEFAULT_FILE_ASSET_KEY_ARN_EXPORT_NAME`<sup>Required</sup> <a name="DEFAULT_FILE_ASSET_KEY_ARN_EXPORT_NAME" id="cdk-stackset.StackSetSynthesizer.property.DEFAULT_FILE_ASSET_KEY_ARN_EXPORT_NAME"></a>

```typescript
public readonly DEFAULT_FILE_ASSET_KEY_ARN_EXPORT_NAME: string;
```

- *Type:* string

Name of the CloudFormation Export with the asset key name.

---

##### `DEFAULT_FILE_ASSET_PREFIX`<sup>Required</sup> <a name="DEFAULT_FILE_ASSET_PREFIX" id="cdk-stackset.StackSetSynthesizer.property.DEFAULT_FILE_ASSET_PREFIX"></a>

```typescript
public readonly DEFAULT_FILE_ASSET_PREFIX: string;
```

- *Type:* string

Default file asset prefix.

---

##### `DEFAULT_FILE_ASSET_PUBLISHING_ROLE_ARN`<sup>Required</sup> <a name="DEFAULT_FILE_ASSET_PUBLISHING_ROLE_ARN" id="cdk-stackset.StackSetSynthesizer.property.DEFAULT_FILE_ASSET_PUBLISHING_ROLE_ARN"></a>

```typescript
public readonly DEFAULT_FILE_ASSET_PUBLISHING_ROLE_ARN: string;
```

- *Type:* string

Default asset publishing role ARN for file (S3) assets.

---

##### `DEFAULT_FILE_ASSETS_BUCKET_NAME`<sup>Required</sup> <a name="DEFAULT_FILE_ASSETS_BUCKET_NAME" id="cdk-stackset.StackSetSynthesizer.property.DEFAULT_FILE_ASSETS_BUCKET_NAME"></a>

```typescript
public readonly DEFAULT_FILE_ASSETS_BUCKET_NAME: string;
```

- *Type:* string

Default file assets bucket name.

---

##### `DEFAULT_IMAGE_ASSET_PUBLISHING_ROLE_ARN`<sup>Required</sup> <a name="DEFAULT_IMAGE_ASSET_PUBLISHING_ROLE_ARN" id="cdk-stackset.StackSetSynthesizer.property.DEFAULT_IMAGE_ASSET_PUBLISHING_ROLE_ARN"></a>

```typescript
public readonly DEFAULT_IMAGE_ASSET_PUBLISHING_ROLE_ARN: string;
```

- *Type:* string

Default asset publishing role ARN for image (ECR) assets.

---

##### `DEFAULT_IMAGE_ASSETS_REPOSITORY_NAME`<sup>Required</sup> <a name="DEFAULT_IMAGE_ASSETS_REPOSITORY_NAME" id="cdk-stackset.StackSetSynthesizer.property.DEFAULT_IMAGE_ASSETS_REPOSITORY_NAME"></a>

```typescript
public readonly DEFAULT_IMAGE_ASSETS_REPOSITORY_NAME: string;
```

- *Type:* string

Default image assets repository name.

---

##### `DEFAULT_LOOKUP_ROLE_ARN`<sup>Required</sup> <a name="DEFAULT_LOOKUP_ROLE_ARN" id="cdk-stackset.StackSetSynthesizer.property.DEFAULT_LOOKUP_ROLE_ARN"></a>

```typescript
public readonly DEFAULT_LOOKUP_ROLE_ARN: string;
```

- *Type:* string

Default lookup role ARN for missing values.

---

##### `DEFAULT_QUALIFIER`<sup>Required</sup> <a name="DEFAULT_QUALIFIER" id="cdk-stackset.StackSetSynthesizer.property.DEFAULT_QUALIFIER"></a>

```typescript
public readonly DEFAULT_QUALIFIER: string;
```

- *Type:* string

Default ARN qualifier.

---


