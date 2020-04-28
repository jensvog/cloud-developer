import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { TodoItem } from '../models/TodoItem'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest';

const XAWS = AWSXRay.captureAWS(AWS)

export class TodoAccess {

    constructor(
      private readonly docClient: DocumentClient = createDynamoDBClient(),
      private readonly todosTable = process.env.TODOS_TABLE,
      private readonly indexName = process.env.INDEX_NAME) {
    }
  
    // async getAllGroups(): Promise<Group[]> {
    //   console.log('Getting all groups')
  
    //   const result = await this.docClient.scan({
    //     TableName: this.groupsTable
    //   }).promise()
  
    //   const items = result.Items
    //   return items as Group[]
    // }
  
    async createTodo(todo: TodoItem): Promise<TodoItem> {
      await this.docClient.put({
        TableName: this.todosTable,
        Item: todo
      }).promise()
  
      return todo;
    }

    async deleteTodo(todoId: string, userId: string) {
      await this.docClient.delete({
        TableName: this.todosTable,
        Key: {
          userId: userId,
          todoId: todoId
        }
      })
      .promise()
    }

    async updateImage(todoId: string, userId: string, imageUrl: string) {
        await this.docClient.update({
          TableName: this.todosTable,
          Key: {
            userId: userId,
            todoId: todoId
          },
          UpdateExpression: "set attachmentUrl = :a",
          ExpressionAttributeValues: {
              ":a": imageUrl
          }
        })
        .promise()
      }

      async getTodos(userId: string): Promise<TodoItem[]> {
        const result = await this.docClient.query({
          TableName: this.todosTable,
          IndexName: this.indexName,
          KeyConditionExpression: 'userId = :userId',
          ExpressionAttributeValues: {
            ':userId': userId
          }
        })
        .promise()

        return result.Items as TodoItem[];
      }

      async updateTodo(updatedTodo: UpdateTodoRequest, todoId: string, userId: string) {
        await this.docClient.update({
          TableName: this.todosTable,
          Key: {
            userId: userId,
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
      }
}
  
function createDynamoDBClient() {
    return new XAWS.DynamoDB.DocumentClient()
}