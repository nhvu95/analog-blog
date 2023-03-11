---
title: 'Lambda Layers. Just a concept I got at work'
description: 'Using layers can make it faster to deploy applications with the AWS SAM or the Serverless framework. By moving runtime dependencies from your function code to a layer, this can help reduce the overall size of the archive uploaded during the deployment'
date_start: '2021/10/12'
date_end: '2021/10/12'
published: true
image: 'https://dsm01pap001files.storage.live.com/y4mh3cHhqq9WoJYm77V4VOwCPhOWC9m7Gr6jLS42aPvw52U4XT-5FmrK8ZIT7oyQGQUp0po-m1mYfpp0qVAM9qyKKQbg95lwJww0mepDU35jxTg26dsn5EcvzRurREht1KIVTde8bpDaQ180naRAUgnKk0XEwWsEFtmO2SPTgL0NEXkjBUDyCGiIJz1sgAsTe45?width=660&height=660&cropmode=none'
header_image: 'https://dsm01pap001files.storage.live.com/y4mCzIL23s6S1PXdKvE1x74MjS7wukQjGsg45Nu5EpGicBj2xNquWj7sEv5QcFIqodFFdLC7ykJdIE0ZpNty0NNHBkmRJmshRT2jZWL1YOUQp06g_X8ZtUF3emPssC6Bzoi74og4HfW5vUG3sJXdkjKpZbpyE8NtaDKperUbQjQouZUGaOhV44Uk9ExHFbiYRTs?width=1024&height=416&cropmode=none'
tags: ['DevOps','AWS','Backend','Lambda']
priority: 1
link: '/blog/lambda-layers'
slug: lambda-layers
location: 'Hanoi, Vietnam'
---

Source: https://aws.amazon.com/vi/blogs/compute/using-lambda-layers-to-simplify-your-development-process/

## Overall about Lambda Layers
- A Lambda layer is an archive containing additional, such as library, dependencies, or even custom runtimes.  
- When you include a layer in a lambda function, the contents are extracted to the /opt directory in the execution environment.  
You can include up to five layers per function, which count towards the standard Lambda deployment size limits.  
    * For uploaded functions (.zip file archives) and layers. Each function version and layer version consumes storage have default quota is 75GB.
    * For storage functions defined as container images. These images are stored in Amazon ECR and use quota of Amazon ECR service.

Layers are deployed as **immutable** versions. And the version number increments each time you publish a new layer.  
When you include a layer in a lambda function, you specify the layer version you want to use. Layers are automatically set as private, but they can be shared with others AWS accounts, or share publicly. Permission only apply to a single version of layer.
<p align="center" width="100%">
    <img src="https://dsm01pap001files.storage.live.com/y4mVq7p6cerhMP1CfJ65aIzxQKlJzbybVVZk5vtziJfY7ckmvxAYyJYR_g7GQbJCXlJVrWo1D_S1oissQwVpYouYm1l7oKD8TWkE2pdV7D8aHLuXqBcJfTV6XcfW3M-IAl1bT_uDGlKis-KP0BAZJbpxoxYpBRqfyuM1Jxwul1Dqb17bY92JWR6LuKFdzmOySbX?width=757&height=532&cropmode=none"/>
</p>

## Why we should use Lambda layers ?

Using layers can make it faster to deploy applications with the AWS SAM or the Serverless framework. **By moving runtime dependencies from your function code to a layer, this can help reduce the overall size of the archive uploaded during the deployment**

## Creating a layer containing the AWS SDK

The AWS SDK allow you to interact programmatically with AWS services using one of the supported runtimes. The Lambda service includes the AWS SDK, so you can use it without explicitly importing in your deployment package.

However there is nor guarantee of the version provided in the execution environment. The SDK is upgraded frequently to support new AWS services and features. As a result, the version may change at any time. You can see the current version used by Lambda by declaring an instance of the SDK and logging out the version method:

<p align="center" width="100%">
    <img src="https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2020/09/01/lambda-layers1.png" alt="AWS SDK"/>
</p>

For production workloads, it's best practice to lock the version of the AWS SDK used in your functions. You can archive this by including the SDK with your code package.  
Once you include this library, your code always uses the version in the deployment package and not the version included in the Lambda service.

A serverless application may consist of many function, Which all use a common SDK version. Instead of bundling the SDK with each function deployment, you can  create a layer containing the SDK. The effect of this is to reduce the size of upload archive, which makes your deployments faster.

**To create an AWS SDK Layer:**
1. First, clone this blog post’s [GitHub repo](https://github.com/aws-samples/aws-lambda-layers-aws-sam-examples). From a terminal window, execute:
>``git clone https://github.com/aws-samples/aws-lambda-layers-aws-sam-examples
cd ./aws-sdk-layer``
2. This directory contains an AWS SAM template and Node.js package.json file. Install the package.json contents:
>``npm install``
3. Create the layer directory defined in the AWS SAM template and the nodejs directory required by Lambda. Next, move the node_modules directory:
>``mkdir -p ./layer/nodejs
mv ./node_modules ./layer/nodejs``
4. Next, deploy the AWS SAM template to create the layer:
>``sam deploy --guided``
5. For the Stack name, enter ``aws-sdk-layer``. Enter your preferred AWS Region and accept the other defaults.
6. After the deployment completes, the new Lambda layer is available to use. Run this command to see the available layers:
>``aws lambda list-layers``
<p align="center" width="100%">
    <img src="https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2020/09/01/lambda-layers2.png"/>
</p>

**Adding a layer to a Lambda function**

After adding a layer to a function, you can use console.log to log out the AWS SDK version. This shows that the function is now using the SDK version in the layer instead of the version provided by Lambda service.

**Creating layers with OS-specific binaries.**

Many code libraries include binaries that are operating-system specific. When you build packages on your local development machine, by default the binaries for that OS are used. These may not be the right binaries for Lambda, which run on Amazon Linux. If you are not using a compatible OS, you must ensure you include Linux binaries in the layer.

The simplest way to package these libraries correctly is to use AWS Cloud9. This is an IDE in the AWS Cloud, which runs on AWS EC2. After creating an environment, you can clone a git repository directly to the local storage if the instance, and run the necessary build scripts.

For example:  
The Happy Path application resizes images using the Sharp npm library. This library uses **libvips**, which is written in C, so the compilation is operating system-specific. By creating a layer containing this library, it simplifies the packaging and deployment of the consuming Lambda function.  
**To create a Sharp layer using AWS Cloud9:**  
1. Navigate to the **AWS Cloud9** console.
2. Choose **Create environment**.
3. Enter the name “My IDE” and choose **Next step**.
4. Accept all the default and choose **Next step**.
5. Review the settings and choose **Create environment**.
6. In the terminal panel, enter:
>``git clone https://github.com/aws-samples/aws-lambda-layers-aws-sam-examples
cd ./aws-lambda-layers-aws-sam-examples/sharp-layer
npm install``
7. From a terminal window, ensure you are in the directory where you cloned this post’s GitHub repo. Execute the following commands:
>``cd ./sharp-layer
npm install
mkdir -p ./layer/nodejs
mv ./node_modules ./layer/nodejs``
8. Next, deploy the AWS SAM template to create the layer:
>``sam deploy --guided``  
For the Stack name, enter “sharp-layer”. Enter your preferred AWS Region and accept the other defaults. After the deployment completes, the new Lambda layer is available to use.

In some runtimes, you can **specify a local set of packages for development**, **and another set for production**. For example, in Node.js, the package.json file allows you to specify two sections for dependencies. If your development machine uses a different operating system to Lambda, and therefore uses different binaries, you can use package.json to resolve this. In the Happy Path Resizer function, which uses the Sharp layer, the package.json refers to a local binary for development.

<p align="center" width="100%">
    <img src="https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2020/09/01/lambda-layers6.png" alt="Version"/>
</p>

AWS SAM defines Lambda functions with the AWS::Serverless::Function resource. Layers are defined as a property of functions, as a list of layer ARNs including the version:

```yaml
  MyLambdaFunction:
    Type: AWS::Serverless::Function 
    Properties:
      CodeUri: myFunction/
      Handler: app.handler
      MemorySize: 128
      Layers:
        - !Ref SharpLayerARN
```

## Sharing a layer
Layers are private to your account by default but you can optionally share with other AWS accounts or make a layer public. You cannot share layers via the AWS Management Console but instead use the AWS CLI.

```bash
aws lambda add-layer-version-permission \
  --layer-name node-sharp \
  --principal '*' \
  --action lambda:GetLayerVersion \
  --version-number 3 
  --statement-id public 
  --region us-east-1
```

In the principal parameter, specify an individual account ID or use an asterisk to make the layer public. The CLI responds with a RevisionId containing the current revision of the policy:

<p align="center" width="100%">
    <img src="https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2020/09/01/lambda-layers7.png" alt="Sharing Lamdalayer"/>
</p>

You can check the permissions associated with a layer version by calling get-layer-version-policy with the layer name and version:

```bash
aws lambda remove-layer-version-permission \
 -- layer-name node-sharp \
 -- statement-id public \
 -- version-number 3
```

Once the permissions are removed, calling get-layer-version-policy results in an error:
<p align="center" width="100%">
    <img src="https://d2908q01vomqb2.cloudfront.net/1b6453892473a467d07372d45eb05abc2031647a/2020/09/01/lambda-layers9.png" alt="Sharing Lamdalayer"/>
</p>
