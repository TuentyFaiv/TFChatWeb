import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import Providers from "next-auth/providers";

const options: NextAuthOptions = {
  debug: true,
  session: {},
  jwt: {},
  providers: [
    Providers.Credentials({
      name: "Verhga",
      credentials: {
        password: {
          type: "password",
          label: "What is your fucking password!!???"
        }
      },
      async authorize(credentials) {
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/verhga`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-type": "application/json"
          }
        });
        const data = await response.json();

        if (response.ok && data) {
          return data;
        }

        return null;
      }
    }),
    Providers.GitHub({
      clientId: process.env.AUTH_ID_GITHUB,
      clientSecret: process.env.AUTH_SECRET_GITHUB,
    }),
    Providers.Spotify({
      clientId: process.env.AUTH_ID_SPOTIFY,
      clientSecret: process.env.AUTH_SECRET_SPOTIFY
    }),
    Providers.Google({
      clientId: process.env.AUTH_ID_GOOGLE,
      clientSecret: process.env.AUTH_SECRET_GOOGLE,
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code' // Remove to connect a database
    }),
    Providers.Twitter({
      clientId: process.env.AUTH_ID_TWITTER,
      clientSecret: process.env.AUTH_SECRET_TWITTER
    })
  ]
};

export default NextAuth(options);
