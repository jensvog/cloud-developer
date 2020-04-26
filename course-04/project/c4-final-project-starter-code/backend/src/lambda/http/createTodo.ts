import 'source-map-support/register'
import * as AWS  from 'aws-sdk'
import * as uuid from 'uuid'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { TodoItem } from '../../models/TodoItem'
import { getUserId } from '../utils'

const todosTable = process.env.TODOS_TABLE
const dynamoDBClient = new AWS.DynamoDB.DocumentClient()

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newTodo: CreateTodoRequest = JSON.parse(event.body)

  // TODO: Implement creating a new TODO item
  var todoItem: TodoItem = {
    userId: getUserId(event),
    todoId: uuid.v4(),
    createdAt: new Date().toISOString(),
    name: newTodo.name,
    dueDate: newTodo.dueDate,
    done: false
  };
  
  console.log(newTodo);

  await dynamoDBClient
    .put({
      TableName: todosTable,
      Item: todoItem
    })
    .promise()

  return {
    statusCode: 201,
    body: JSON.stringify({
      item: todoItem
    })
  }
})

handler.use(
  cors({
    credentials: true
  })
)
