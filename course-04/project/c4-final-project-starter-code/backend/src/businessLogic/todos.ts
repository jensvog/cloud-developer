import { CreateTodoRequest } from "../requests/CreateTodoRequest";
import { TodoItem } from "../models/TodoItem";
import { UploadUrl } from "../models/UploadUrl";
import * as uuid from 'uuid'
import { TodoAccess } from "../dataLayer/todoAccess";
import { UploadAccess } from "../dataLayer/uploadAccess";
import { UpdateTodoRequest } from "../requests/UpdateTodoRequest";

const todoAccess = new TodoAccess()
const uploadAccess = new UploadAccess()

export async function createTodo(newTodo: CreateTodoRequest, userId: string): Promise<TodoItem> {
  const todoItem: TodoItem = {
    userId,
    todoId: uuid.v4(),
    createdAt: new Date().toISOString(),
    name: newTodo.name,
    dueDate: newTodo.dueDate,
    done: false
   };

   return await todoAccess.createTodo(todoItem);
}

export async function deleteTodo(todoId: string, userId: string) {
    await todoAccess.deleteTodo(todoId, userId);
}

export async function generateUploadUrl(todoId: string, userId: string): Promise<UploadUrl> {
    const uploadUrl = await uploadAccess.generateUploadUrl(todoId);
  
    const imageUrl = await uploadAccess.getImageUrl(todoId);

    await todoAccess.updateImage(todoId, userId, imageUrl);

    return uploadUrl;
}

export async function getTodos(userId: string): Promise<TodoItem[]> {
    return await todoAccess.getTodos(userId);
}

export async function updateTodo(updatedTodo: UpdateTodoRequest, todoId: string, userId: string) {
    await todoAccess.updateTodo(updatedTodo, todoId, userId);
}