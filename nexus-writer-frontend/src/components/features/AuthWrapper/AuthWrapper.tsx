'use client'
import { useAuth } from "@/app/hooks/useAuth"
import { useRouter } from "next/navigation"
import { AuthWrapperProps } from "@/app/types"
import { useEffect } from "react"
import styles from './AuthWrapper.module.css'
import { ClipLoader } from 'react-spinners'


export default function AuthWrapper({
    children,
    redirectTo = '/login',
    requireAuth =  true
} : AuthWrapperProps) {
    // grab the user with use auth
    const { user, isLoading, isError } = useAuth()

    // grab the router with use router
    const router = useRouter()

    // if we re authenticate we need to redirect if necessary
    useEffect( () => {
        if (!isLoading && requireAuth) {
            if (!user || isError) {
                router.push(redirectTo)
            }
        }
    }, [user, isLoading, isError, router, redirectTo, requireAuth])
   

    // if loading show the loading state
    if (isLoading) {
        return (
            <div className={styles['flex-col-container']}>
                <ClipLoader size={50} color="#666" />
                <h1>Connecting to the nexus...</h1>
            </div>
        )
    }

    // if auth fails show the redirect state
    if (requireAuth && (isError || !user)) {
        return (
            <div className={styles['flex-col-container']}>
                <ClipLoader size={50} color="#666" />
                <h1>Authentication Required. Redirecting to login...</h1>
            </div>
        )
    }

    // finally render all children
    return <>{children}</>
}