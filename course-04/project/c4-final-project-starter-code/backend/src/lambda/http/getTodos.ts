import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getTodos } from '../../businessLogic/todos'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'

const logger = createLogger('getTodos');

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // TODODONE: Get all TODO items for a current user
  const todos = await getTodos(getUserId(event));

  logger.info('get all ToDos');

  return {
      statusCode: 200,
      body: JSON.stringify({
        items: todos
      })
    }
})

handler.use(
  cors({
    credentials: true
  })
)
