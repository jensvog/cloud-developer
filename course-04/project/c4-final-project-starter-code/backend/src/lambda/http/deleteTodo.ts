import 'source-map-support/register'
import * as AWS  from 'aws-sdk'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getUserId } from '../utils'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

const todosTable = process.env.TODOS_TABLE
const dynamoDBClient = new AWS.DynamoDB.DocumentClient()

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId

  // TODO: Remove a TODO item by id
  console.log(todoId);

  await dynamoDBClient
    .delete({
      TableName: todosTable,
      Key: {
        userId: getUserId(event),
        todoId: todoId
      }
    })
    .promise()

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
