import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface StackSetBootstrapStackProps extends cdk.StackProps {
  /**
   * Define the organization id where the S3 Bucket is shared with (read-only)
   */
  readonly orgId: string;

  /**
   * Optional qualifier. Used as prefix for the S3 Bucket.
   *
   * @default 'cdk'
   */
  readonly qualifier?: string;

  /**
   * Whether all objects should be automatically deleted when the bucket is removed from the stack or when the stack is deleted.
   *
   * @default true
   */
  readonly autoDeleteObjects?: boolean;
}

export class StackSetBootstrapStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: StackSetBootstrapStackProps) {
    super(scope, id, props);

    const assetBucket = new cdk.aws_s3.Bucket(this, 'SharedStackSetAssets', {
      bucketName: `${props.qualifier ?? 'cdk'}-assets-shared-${this.account}-${this.region}`,
      encryption: cdk.aws_s3.BucketEncryption.S3_MANAGED,
      versioned: true,
      blockPublicAccess: {
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      },
      enforceSSL: true,
      autoDeleteObjects: props.autoDeleteObjects ?? true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    assetBucket.grantRead(new cdk.aws_iam.OrganizationPrincipal(props.orgId));
  }
}
