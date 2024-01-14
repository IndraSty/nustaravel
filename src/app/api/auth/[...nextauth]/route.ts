import { NextAuthOptions, Session } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { login, loginWithGoogle } from "@/lib/database/service";
import { JWT } from "next-auth/jwt";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user: any = await login({ email });
        if (user) {
          const passwordConfirm = await bcrypt.compare(password, user.password);

          if (passwordConfirm) {
            return user;
          }
          return null;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.fullname = user.fullname;
        if(user.phone != null){
          token.phone = user.phone
        }else {
          
        }
      }
      if (account?.provider === "google") {
        const data = {
          fullname: user.name,
          email: user.email,
          image: user.image,
          phone: user.phone
        };
      
        await loginWithGoogle(
          data,
          (result: { status: boolean; data: any }) => {
            if (result.status) {
              token.email = result.data.email;
              token.fullname = result.data.fullname;
              token.image = result.data.image;
              token.phone = result.data.phone
      
              if (!result.data.phone) {
                token.phone = ''
                token.redirectUrl = "/auth/phone";
              }
            }
          }
        );
      }
      return token;
    },

    async session(params: { session: Session; token: JWT; }) {
      if ("email" in params.token) {
        if (params.session.user) {
          params.session.user.email = params.token.email;
        }
      }
      if ("fullname" in params.token) {
        if (params.session.user) {
          (params.session.user as any).fullname = params.token.fullname;
        }
      }
      if ("phone" in params.token) {
        if (params.session.user) {
          (params.session.user as any).phone = params.token.phone;
        }
      }
      if ("redirectUrl" in params.token) {
        params.session.redirectUrl = params.token.redirectUrl;
      }
      return params.session;
    },
    
  },
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, handler as PUT };
