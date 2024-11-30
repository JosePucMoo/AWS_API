import { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESES_KEY, AWS_BUCKET_NAME, AWS_SESSION_TOKEN} from './config.js'

const client = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESES_KEY,
        sessionToken: AWS_SESSION_TOKEN
    }
})

export async function uploadFile(id,file) {
    const filename = id + "_" + file.name;
    const uploadParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: filename,
        Body: file.data
    }
    const command = new PutObjectCommand(uploadParams)
    await client.send(command)

    return `https://${AWS_BUCKET_NAME}.s3.amazonaws.com/${filename}`;

}