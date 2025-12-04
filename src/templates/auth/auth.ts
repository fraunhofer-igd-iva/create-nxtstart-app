import { betterAuth } from 'better-auth'
import Database from 'better-sqlite3'

export const auth = betterAuth({
  database: new Database('./auth.db'),
  // Configure one or more authentication providers
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    },
  },
  emailAndPassword: {
    enabled: true,
    // workaround as callback URL for sign up was not working,
    // if fixed => remove the following line and adjust sign up method in app\[locale]\signIn\SignupEmailComponent.tsx
    autoSignIn: false,
  }
})
