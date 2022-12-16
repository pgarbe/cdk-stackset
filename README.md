# cdk-stackset

A library to deploy a CDK stack as a StackSet. It supports file-based assets.

## Example
see `./test/stack-set-test.ts`

## How does it work?
Similar to `ServiceCatalogStack` a new `StackSetStack` is introduced with it's own synthesizer. 


> It supports only file-based assets, no Docker image assets (didn't have time yet).

The StackSet construct creates a "shared asset" bucket which gets shared with the given organization id (or organizational unit id). The assets of the StackSet stack will be added to the parent stack. And for each of them an S3 deployment is created to copy the zip files from the CDK bootstrap bucket to the new  shared asset bucket.