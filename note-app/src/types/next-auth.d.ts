import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    avatar?: string;
  }

  interface Session {
    user: {
      id?: string;
      avatar?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    avatar?: string;
  }
}
