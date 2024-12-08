import { config } from 'dotenv'

config()

export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME
export const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESES_KEY
export const AWS_SESSION_TOKEN = process.env.AWS_SESSION_TOKEN
export const AWS_TOPIC_ARN = process.env.AWS_TOPIC_ARN

export const DB_HOST = process.env.DB_HOST
export const DB_USER = process.env.DB_USER
export const DB_NAME = process.env.DB_NAME
export const DB_PORT = process.env.DB_PORT
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_DIALECT = process.env.DB_DIALECT