import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "./services/authService";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("@@@ authorize called with credentials:", credentials);
        
        if (!credentials?.email || !credentials?.password) {
          console.log("@@@ missing credentials");
          return null;
        }

        try {
          console.log("@@@ calling login service");
          const result = await login({
            email: credentials.email,
            password: credentials.password
          });

          console.log("@@@ login result:", result);

          if (!result.success || !result.data) {
            console.log("@@@ login failed");
            return null;
          }

          return {
            id: result.data.id,
            name: result.data.name,
            email: result.data.email,
            image: result.data.profilePicUrl || "https://fakeimg.pl/400x400/d97e7e/3d4070?text=avatar&font=noto-serif",
            role: result.data.role,
            accessToken: result.data.accessToken,
            refreshToken: result.data.refreshToken,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.role = token.role;
      }
      return session;
    }
  }
}; 