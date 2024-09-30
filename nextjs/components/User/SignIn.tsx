import styles from '@/styles/components/user/SignIn.module.css'
import axiosInstance from '@/utils/axiosInstance';
import backendUrl from '@/utils/backendUrl';
import { useRouter } from 'next/router';
import React, { FormEvent, SetStateAction, useEffect, useRef, useState } from 'react'
import nookies from 'nookies'
import { SigninFormType } from '@/types';
import { AxiosError } from 'axios';

interface ErrorsInterface {
    email?: string,
    password?: string
}

interface SignInProps {
    onSwitch: (menu: SetStateAction<"signIn" | "signUpOne" | "signUpTwo" | "signUpThree" | "userMenu" | "forgotPassword">) => void;
    signinFormRef: React.MutableRefObject<SigninFormType>
}

export default function SignIn({ onSwitch, signinFormRef }: SignInProps) {
    const inputFocusRef = useRef<HTMLInputElement>(null)
    const [errors, setErrors] = useState<ErrorsInterface>({
        email: "",
        password: ""
    })

    useEffect(() => {
        inputFocusRef.current?.focus()
    }, [])

    const router = useRouter()

    function handleSubmit(event: FormEvent) {
        event.preventDefault()
        const newErrors = validateFields()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            axiosInstance.request({
                method: 'POST',
                url: backendUrl.getUrl('auth/signin'),
                data: signinFormRef.current
            })
            .then((response) => {
                const { accessToken } = response.data
                const { id } = response.data
                nookies.set(null, 'accessToken', accessToken, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: '/',
                })
                nookies.set(null, 'shouldRedirect', 'true', {
                    maxAge: 30 * 24 * 60 * 60,
                    path: '/'
                })
                router.push(`/`)
            })
                .catch((error: unknown) => {
                    const axiosError: AxiosError = error as AxiosError
                    setErrors({
                        ...errors,
                        password: 'Votre identifiant ou mot de passe comporte une erreur'
                    })
                })
            }
        }
        
        function validateFields() {
            const newErrors: ErrorsInterface = {}
            const emailRegex = /\S+@\S+\.\S+/

        if (signinFormRef.current.email === '') {
            newErrors.email = "L\'email est recquis."
        } else if (!emailRegex.test(signinFormRef.current.email)) {
            newErrors.email = "Le format de l\'email n'est pas valide."            
        }
        if (signinFormRef.current.password === '') {
            newErrors.password = "Le mote de passe est recquis."
        }
        return newErrors
    }

    function handleClick(event: React.MouseEvent<HTMLDivElement>) {
        event.stopPropagation()
    }

    return (<>
        <div className={styles.container} onClick={handleClick}>
            <h1>{'-> Se connecter'}</h1>
            <div className={styles.errors}>
                <p>{errors.email}</p>
                <p>{errors.password}</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className= {styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        className={errors.email ? styles.formInputError : styles.formInput}
                        defaultValue={signinFormRef.current.email}
                        ref={inputFocusRef}
                        onChange={(event) => {
                            signinFormRef.current.email = event.target.value
                        }}
                        onClick={(event) => {
                            event.preventDefault()
                            setErrors({
                                ...errors,
                                email: ""
                            })
                        }}
                        />
                </div>
                <div className= {styles.formGroup}>
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className={errors.password ? styles.formInputError : styles.formInput}
                        onChange={(event) => {
                            signinFormRef.current.password = event.target.value
                        }}
                        onClick={(event) => {
                            event.preventDefault()
                            setErrors({
                                ...errors,
                                password: ""
                            })
                        }}></input>
                </div>
                <button
                    className={styles.forgotPassword}
                    type='button'
                    onClick={() => {
                        onSwitch('forgotPassword')
                    }}
                    >
                    Mot de passe oublié ?
                    </button>
                <div className={styles.submitOrSignUp}>
                    <div className={styles.signUpContainer}>
                        <p>Vous n&apos;avez pas de compte ?</p>
                        <button
                            type='button'
                            onClick={() => onSwitch('signUpOne')}>
                            {'->Créer un compte'}
                        </button>
                    </div>
                    <button className={styles.submit} type='submit'>Se connecter</button>
                </div>
            </form>
        </div>
    </>)
}