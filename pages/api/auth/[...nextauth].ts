import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@email.com" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        //this email&password is for demo
        if (email !== "farmer@gmail.com" && password !== "1234") {
          return null;
        }

        //if everything is fine
        return { id: "1234", name: "farmer", email: "farmer@gmail.com" };
      },
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
