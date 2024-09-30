import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { CompanyType, TokenType } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import backendUrl from "@/utils/backendUrl";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import styles from "@/styles/resetPassword/resetPassword.module.css"
import Image from "next/image";
import padlock from "@/public/icons/padlock.png"
import { FormEvent, useEffect, useRef, useState } from "react";
import ChangePasswordInput from '@/components/utils/inputForm/ChangePasswordInput'
import { hasNumber, hasUppercase } from "@/utils/checkRegex";
import nookies from 'nookies'
import axios, { AxiosError } from "axios";
import Head from "next/head";

interface ResetPasswordProps {
    tokenData: string | null,
    accessToken: string | null
}

interface ErrorsInterface {
    password?: string,
    checkPassword?: string
}

export default function handler({tokenData, accessToken}: ResetPasswordProps) {
    const router = useRouter()
    const passwordRef = useRef<HTMLInputElement>(null)
    const checkPasswordRef = useRef<HTMLInputElement>(null)
    const [errors, setErrors] = useState<ErrorsInterface>({
        password: "",
        checkPassword: "",
    })
    const [passwordError, setPasswordError] = useState<boolean>(false)
    const [checkPasswordError, setCheckPasswordError] = useState<boolean>(false)

    useEffect(() => {
        passwordRef.current?.focus()
    }, [])

    function validateFields() {
        const newErrors: ErrorsInterface = {}

        // checking of :

        // password
        if (!passwordRef.current?.value) {
            setPasswordError(true)
            newErrors.password = "Le mote de passe est recquis."
        } else if (passwordRef.current.value.length < 8) {
            setPasswordError(true)
            newErrors.password = "Le mote de passe doit contenir au moins 8 caractères."
        } else if (!hasUppercase(passwordRef.current.value) || !hasNumber(passwordRef.current.value)) {
            setPasswordError(true)
            newErrors.password = "Le mote de passe doit contenir au moins une majuscule et un chiffre."
        }

        // checkPassword
        if (!checkPasswordRef.current?.value) {
            setCheckPasswordError(true)
            newErrors.checkPassword = "La verification du mot de passe est recquise."
        } else if (checkPasswordRef.current?.value !== passwordRef.current?.value) {
            setCheckPasswordError(true)
            newErrors.checkPassword = "La verification du mot de passe ne correspond pas au mot de passe."
        }
        return newErrors
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        const newErrors = validateFields()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            errors.password = ''
            errors.checkPassword = ''
            try {
                const company = await axiosInstance.request({
                    method: 'POST',
                    url: backendUrl.getUrl('companies/set/password'),
                    data: {
                        newPassword: passwordRef.current?.value,
                        token: tokenData
                    }
                })
                const response = await axiosInstance.request({
                    method: 'POST',
                    url: backendUrl.getUrl('auth/signin'),
                    data: {
                        email: company.data.email,
                        password: passwordRef.current?.value
                    }
                })
                const { accessToken } = response.data
                nookies.set(null, 'accessToken', accessToken, {
                    maxAge: 30 * 60 * 60 * 24,
                    path: '/'
                })
                nookies.set(null, 'shouldRedirect', 'true', {
                    maxAge: 30 * 24 * 60 * 60,
                    path: '/'
                })
                router.push('/')
            } catch (error: any) {
                if (error.response.data.statusCode) {
                    localStorage.setItem('Error', 'Le token est invalide')
                    router.push('/')
                }
            }
        }
    }



    return (<>
        <Head>
            <title>Mot de passe</title>
			<meta name="robots" content="noindex"/>
			<link rel="icon" href="/icons/seve-logo-page.png" type='image/png'/>
        </Head>
        <Navbar accessToken={accessToken} isGreen={true} />
        <section className={styles.section}>
            <Image
                src={padlock}
                alt="logo d\'un cadenas vert"
                width={76}
                height={98}
                />
            <h1>Pas de soucis, choisissez un nouveau mot de passe.</h1>
            <div className={styles.errors}>
                <p>{errors.password}</p>
                <p>{errors.checkPassword}</p>
            </div>    
            <form onSubmit={handleSubmit}>
                <div className={styles.inputContainer}>
                    <ChangePasswordInput
                        label="password"
                        labelName="Votre nouveau mot de passe"
                        ref={passwordRef}
                        error={passwordError}
                        setError={setPasswordError}
                        type='password'
                        className={styles.input}
                        />
                    <ChangePasswordInput
                        label="checkPassword"
                        labelName="Confirmation de votre mot de passe"
                        ref={checkPasswordRef}
                        error={checkPasswordError}
                        setError={setCheckPasswordError}
                        type='password'
                        className={styles.input}
                        />
                </div>
                <div className={styles.submitContainer}>
                    <button className={styles.submitButton} type='submit'>Valider</button>
                </div>
            </form>
        </section>
		<Footer isGreen={true} className={styles.footer} />
    </>)
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const token = context.query.token
    let tokenData: TokenType | null = null
    const cookies = nookies.get(context)
    const accessToken: string | null = cookies['accessToken']
    try {
        const response = await axiosInstance.request({
            method: "GET",
            url: backendUrl.getUrl(`tokens/${token}`)
        })
        tokenData = response.data
    } catch (error: any) {
        if ('The token has expired' === error.response.data.message) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        } else if ("The token does\'t exist" === error.response.data.message) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }
    }
    return {
        props: {
            tokenData,
            accessToken
        }
    }
}