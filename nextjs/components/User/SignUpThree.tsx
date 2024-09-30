import styles from '@/styles/components/user/SignUp.module.css'
import React, { FormEvent, SetStateAction, useEffect, useRef, useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import backendUrl from '@/utils/backendUrl';
import nookies from 'nookies';
import { hasNumber, hasUppercase } from '@/utils/checkRegex';
import { useRouter } from 'next/router';
import { SignupFormType } from '@/types';

interface SignUpPageProps {
    onSwitch: (menu: SetStateAction<"signIn" | "signUpOne" | "signUpTwo" | "signUpThree" | "userMenu" | "forgotPassword">) => void;
    formRef: React.MutableRefObject<SignupFormType | null>
}


interface ErrorsInterface {
    password?: string,
    checkPassword?: string
}

export default function SignUpThree({ onSwitch, formRef }: SignUpPageProps) {
    const inputFocusRef = useRef<HTMLInputElement>(null)
    const router = useRouter()
    const checkPasswordRef = useRef<string>("")
    const [errors, setErrors] = useState<ErrorsInterface>({
        password: "",
        checkPassword: "",
    })

    useEffect(() => {
        inputFocusRef.current?.focus()
    }, [])
    
    function handleSubmit(event: FormEvent) {
        event.preventDefault()
        const newErrors = validateFields()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            axiosInstance.request({
                method: 'POST',
                url: backendUrl.getUrl('auth/signup'),
                data: formRef.current
            })
                .then((response) => {
                    const { accessToken } = response.data
                    const { id } = response.data
                    nookies.set(null, 'accessToken', accessToken, {
                        maxAge: 30 * 24 * 60 * 60,
                        path: '/'
                    })
                    nookies.set(null, 'shouldRedirect', 'true', {
                        maxAge: 30 * 24 * 60 * 60,
                        path: '/'
                    })
                    router.push(`/`)
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }

    function validateFields() {
        const newErrors: ErrorsInterface = {}
        const emailRegex = /\S+@\S+\.\S+/

        // checking of :

        // password
        if (!formRef.current?.password) {
            newErrors.password = "Le mote de passe est recquis."
        } else if (formRef.current.password.length < 8) {
            newErrors.password = "Le mote de passe doit contenir au moins 8 caractères."
        } else if (!hasUppercase(formRef.current.password) || !hasNumber(formRef.current.password)) {
            newErrors.password = "Le mote de passe doit contenir au moins une majuscule et un chiffre."
        }

        // checkPassword
        if (!checkPasswordRef.current) {
            newErrors.checkPassword = "La verification du mot de passe est recquise."
        } else if (formRef.current?.password !== checkPasswordRef.current) {
            newErrors.checkPassword = "La verification du mot de passe ne correspond pas au mot de passe."
        }
        return newErrors
    }

    function handleClick(event: React.MouseEvent<HTMLDivElement>) {
        event.stopPropagation()
    }
    
    return (<>
        <div className={styles.container} onClick={handleClick}>
            <div className={styles.header}>
                <button onClick={() => {
                    onSwitch('signUpTwo')
                }}>{'<-'}</button>
                <h1>{'Créer un compte'}</h1>
            </div>
            <div className={styles.errors}>
                <p>{errors.password}</p>
                <p>{errors.checkPassword}</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className= {styles.formGroup}>
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        defaultValue={formRef.current?.password}
                        ref={inputFocusRef}
                        onChange={(event) => {
                            if (formRef.current) {
                                formRef.current.password = event.target.value

                            }
                        }}
                        className={errors.password ? styles.formInputError : styles.formInput}
                        onClick={(event) => {
                            event.preventDefault()
                            setErrors({
                                ...errors,
                                password: ""
                            })
                        }}
                        />
                </div>
                <div className= {styles.formGroup}>
                    <label htmlFor="checkPassword">Vérification de votre mot de passe</label>
                    <input
                        type="password"
                        id="checkPassword"
                        name="checkPassword"
                        onChange={(event) => {
                            checkPasswordRef.current = event.target.value
                        }}
                        className={errors.checkPassword ? styles.formInputError : styles.formInput}
                        onClick={(event) => {
                            event.preventDefault()
                            setErrors({
                                ...errors,
                                checkPassword: ""
                            })
                        }}
                        />
                </div>
                <div className={styles.submitContainer}>
                    <button className={styles.submit} type='submit'>Créer votre compte</button>
                </div>
            </form>
        </div>
    </>)
}