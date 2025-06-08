'use client'
import styles from '@/app/(auth)/AuthLayout.module.css'
import React, { useState } from 'react';


export default function RegisterPage() {

    const [userInfo, setUserInfo] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo((prev) => {
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
            <h1>Register</h1>
            <div>
                <label
                    htmlFor='username'
                >
                    Username:
                </label>
                <input
                    type='text'
                    name='username'
                    id='username'
                    value={userInfo.username}
                    onChange={handleOnChange}
                />
            </div>
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
                    value={userInfo.email}
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
                    value={userInfo.password}
                    onChange={handleOnChange}
                />
            </div>
            <div>
                 <label
                    htmlFor='confirm-password'
                >
                    Confirm Password:
                </label>
                <input
                    type='password'
                    name='confirmPassword'
                    id='confirm-password'
                    value={userInfo.confirmPassword}
                    onChange={handleOnChange}
                />
            </div>
            <button className='btn-primary'>
                Submit
            </button>
        </div>
    )
}