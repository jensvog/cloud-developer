import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { getUserId } from '../utils'
import * as AWS  from 'aws-sdk'

const todosTable = process.env.TODOS_TABLE
const dynamoDBClient = new AWS.DynamoDB.DocumentClient()

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
  console.log(todoId);
  console.log(updatedTodo);

  await dynamoDBClient
  .update({
    TableName: todosTable,
    Key: {
      userId: getUserId(event),
      todoId: todoId
    },
    UpdateExpression: "set #n = :n, dueDate = :du, done = :do",
    ExpressionAttributeNames: {
      "#n": "name"
    },
    ExpressionAttributeValues: {
        ":n": updatedTodo.name,
        ":du": updatedTodo.dueDate,
        ":do": updatedTodo.done
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