import crypto from 'node:crypto';

export class User {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date | null;

  constructor(user: User) {
    this.id = user.id ?? crypto.randomUUID();
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.createdAt = user.createdAt || new Date();
    this.updatedAt = user.updatedAt || null;
  }
}
