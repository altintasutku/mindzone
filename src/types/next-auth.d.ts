import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    surname: string;
    username: string;
    accessToken: string;
  }

  interface Session extends DefaultSession {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    surname: string;
    username: string;
    accessToken: string;
  }
}
