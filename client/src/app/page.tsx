'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import styles from './page.module.scss'
import { useSession } from 'next-auth/react'

export default function Home() {
	const { data: session } = useSession()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm()
	const [isRegistered, setIsRegistered] = useState(false)

	const onSubmit = async (data: any, event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		try {
			await axios.post('http://localhost:4000/users', data)
			reset()
			setIsRegistered(true)
		} catch (error) {
			alert('Error registering user')
		}
	}

	return (
		<div className='container'>
			{!session?.user ? (
				!isRegistered ? (
					<>
						<h1 className={styles.title}>Регистрация</h1>
						<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
							<input className={styles.input} {...register('name', { required: true })} placeholder='Имя пользователя:' />
							{errors.username && <span>Это поле обязательно для заполнения</span>}

							<input className={styles.input} type='email' {...register('email', { required: true })} placeholder='Email:' />
							{errors.email && <span>Это поле обязательно для заполнения</span>}

							<input className={styles.input} type='password' {...register('password', { required: true })} placeholder='Пароль:' />
							{errors.password && <span>Это поле обязательно для заполнения</span>}

							<button className={styles.button} type='submit'>
								Зарегистрироваться
							</button>
						</form>
					</>
				) : (
					<div className={styles.successMessage}>Вы успешно зарегистрированы!</div>
				)
			) : (
				<div className={styles.successMessage}>Вы уже зарегистрированы!</div>
			)}
		</div>
	)
}
