import { auth, signIn, signOut } from '@/auth'
import React from 'react'

import styles from './Navbar.module.scss'

const Navbar = async () => {
	const session = await auth()

	return (
		<div className={styles.navbar}>
			{session && session.user ? (
				<div className={styles.session}>
					{session.user.image && <img src={session.user.image} alt='Profile' className={styles.userImg} />}
					<p>Hi, {session.user.name}!</p>
					<form
						action={async () => {
							'use server'
							await signOut()
						}}
					>
						<button type='submit' className={styles.btn}>Sign Out</button>
					</form>
				</div>
			) : (
				<form
					action={async () => {
						'use server'
						await signIn()
					}}
				>
					<button type='submit' className={styles.btn}>Sign In</button>
				</form>
			)}
		</div>
	)
}

export default Navbar
