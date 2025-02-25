import Google from "next-auth/providers/google"
import Twitter from "next-auth/providers/twitter"
import type { NextAuthConfig } from "next-auth"

export default { providers: [Google, Twitter] } satisfies NextAuthConfig