import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

// Hitung detik sampai midnight berikutnya
function secondsUntilMidnight(): number {
  const now      = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0); // jam 00.00 hari berikutnya
  return Math.floor((midnight.getTime() - now.getTime()) / 1000);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret:    process.env.AUTH_SECRET,
  trustHost: true,
  session:   { 
    strategy: "jwt",
    maxAge:   60 * 60 * 24, // maksimal 24 jam
  },
  pages: { signIn: "/contentmanage/login" },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // Set saat pertama login — expired tepat jam 00.00 malam ini
        token.id        = user.id;
        token.role      = (user as any).role;
        token.expiredAt = Date.now() + secondsUntilMidnight() * 1000;
      }

      // Cek apakah sudah lewat midnight
      if (token.expiredAt && Date.now() > (token.expiredAt as number)) {
        // Return token kosong → session dianggap invalid
        return {};
      }

      return token;
    },
    session({ session, token }) {
      // Kalau token kosong (expired), kembalikan session kosong
      if (!token.id) {
        return { ...session, user: undefined as any };
      }

      if (token) {
        session.user.id            = token.id   as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      credentials: {
        email:    { label: "Email",    type: "email"    },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });
        if (!user) return null;
        const valid = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );
        if (!valid) return null;
        return {
          id:    user.id,
          name:  user.name,
          email: user.email,
          role:  user.role,
        };
      },
    }),
  ],
});