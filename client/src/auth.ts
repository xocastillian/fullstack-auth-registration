import axios from 'axios'
import NextAuth, { NextAuthConfig } from 'next-auth'
import credentials from 'next-auth/providers/credentials'
import email from 'next-auth/providers/email'
import github from 'next-auth/providers/github'
import google from 'next-auth/providers/google'

const credentialsConfig = credentials({
	name: 'Credentials',
	credentials: {
		email: { label: 'Email', type: 'Email' },
		password: { label: 'Password', type: 'password' },
	},

	async authorize(credentials) {
		if (!credentials?.email || !credentials?.password) {
			return null
		}

		try {
			const response = await axios.get('http://localhost:4000/users')
			const user = response.data.find((user: IUser) => user?.email === credentials.email && user?.password === credentials.password)

			return user ?? null
		} catch (error) {
			console.error('Error authorizing user:', error)
			return null
		}
	},
})

const config = {
	providers: [credentialsConfig, google, github],
} satisfies NextAuthConfig

export const { auth, handlers, signIn, signOut } = NextAuth(config)
