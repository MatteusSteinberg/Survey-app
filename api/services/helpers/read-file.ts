import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

const client = new S3Client({    
  endpoint: process.env.SPACES_ENDPOINT as string,
  region: process.env.SPACES_REGION as string,
  credentials: {
    accessKeyId: process.env.SPACES_ACCESS_KEY as string,
    secretAccessKey: process.env.SPACES_SECRET as string,
  },
});

const readFile = async (bucket: string | undefined, key: any, endpoint?: string) => {

  const params = {
    Bucket: bucket,
    Key: key,
  };

  const command = new GetObjectCommand(params);
  try {
    const response = await client.send(command);
    
    return response.Body as any

  } catch (err) {
    return err.$metadata
  }
};

export default async (key: string) => {
  return readFile(process.env.SPACES_BUCKET, key);
};