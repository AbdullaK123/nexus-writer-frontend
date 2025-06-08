'use client'
import styles from '@/app/(auth)/AuthLayout.module.css'
import React, { useState } from 'react';
import Image from 'next/image';


export default function LoginPage() {

    const [credentials, setCredentials] = useState({email: "", password: ""});

    const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setCredentials((prev) => {
           return {
                ...prev,
                [e.target.name]: e.target.value
           }
        })
    }

    //TODO: we'll worry about this later
    const handleSubmit = () => {}


    return (
        <div className={styles.card}>
             <Image
                src='./logo.svg'
                alt='Nexus Writer Logo'
                width={60} 
                height={60}
                className={styles.logo}
            />   
            <h1>Login</h1>
            <div>
                <label
                    htmlFor='email'
                >
                    Email:
                </label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    value={credentials.email}
                    onChange={handleOnChange}
                />
            </div>
            <div>
                 <label
                    htmlFor='password'
                >
                    Password:
                </label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    value={credentials.password}
                    onChange={handleOnChange}
                />
            </div>
            <button className='btn-primary'>
                Submit
            </button>
        </div>
    )
}