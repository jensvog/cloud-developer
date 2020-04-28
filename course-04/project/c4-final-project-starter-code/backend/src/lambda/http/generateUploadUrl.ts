import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getUserId } from '../utils'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { generateUploadUrl } from '../../businessLogic/todos'
import { createLogger } from '../../utils/logger'

const logger = createLogger('generateUploadUrl');

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId

  logger.info('generate upload url');

  // TODODONE: Return a presigned URL to upload a file for a TODO item with the provided id
  const uploadUrl = await generateUploadUrl(todoId, getUserId(event));

  return {
      statusCode: 201,
      body: JSON.stringify(uploadUrl)
    }
})

handler.use(
  cors({
    credentials: true
  })
)