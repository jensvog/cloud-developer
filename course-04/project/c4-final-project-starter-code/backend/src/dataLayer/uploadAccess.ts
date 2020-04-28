import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { UploadUrl } from "../models/UploadUrl";

const XAWS = AWSXRay.captureAWS(AWS)

export class UploadAccess {

    constructor(
      private readonly s3: AWS.S3 = createS3(),
      private readonly bucketName = process.env.TODO_IMAGES_S3_BUCKET,
      private readonly urlExpiration = process.env.SIGNED_URL_EXPIRATION) {
    }
  
  async generateUploadUrl(todoId: string): Promise<UploadUrl> {
    const uploadUrl = this.s3.getSignedUrl('putObject', {
        Bucket: this.bucketName,
        Key: todoId,
        Expires: this.urlExpiration
        });
    return {
        uploadUrl
    }
  }

  async getImageUrl(todoId: string): Promise<string> {
    return `https://${this.bucketName}.s3.amazonaws.com/${todoId}`
  }
}

function createS3() {
    return new XAWS.S3({
        signatureVersion: 'v4'
    })
}