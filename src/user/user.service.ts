import { Injectable } from '@nestjs/common';

export interface UserRequest {
  id: string;
}

export interface User {
  id: string;
  name: string;
}

export interface UserResponse {
  user: User;
}

@Injectable()
export class UserService {
  getUser(data: UserRequest): UserResponse {
    return { user: { id: data.id, name: 'John Doe' } };
  }
}
