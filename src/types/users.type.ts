export type User = {
  _id: string;
  email: string;
  name: string;
  status: boolean;
  roles?: string[];
};

export type UpdateUser = Pick<User, "_id" | "name" | "roles">;
