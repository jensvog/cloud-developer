import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getUserId } from '../utils'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { deleteTodo } from '../../businessLogic/todos'
import { createLogger } from '../../utils/logger'


const logger = createLogger('deleteTodo');

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId

  logger.info('delete ToDo');

  // TODODONE: Remove a TODO item by id
  deleteTodo(todoId, getUserId(event));

  return {
    statusCode: 200,
    body: ''
  }
})

handler.use(
  cors({
    credentials: true
  })
)
