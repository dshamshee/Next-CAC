import { DefaultSession } from "next-auth";

declare module "next-auth" {
    // Overwriting the User Schema of the next-auth library for adding extra fields
//   interface User {
//     id?: string;
//     username?: string;
//     avatar?: string;
//   }

  // Overwriting the Session Schema of the next-auth library for adding extra fields
  interface Session {
    user: {
      _id?: string;
      username?: string;
      avatar?: string;
    } & DefaultSession["user"];
  }
}
