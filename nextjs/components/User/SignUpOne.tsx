import styles from '@/styles/components/user/SignUp.module.css'
import React, { FormEvent, SetStateAction, useEffect, useRef, useState } from 'react';
import { error } from 'console';
import axiosInstance from '@/utils/axiosInstance';
import backendUrl from '@/utils/backendUrl';
import { isEmailValid, isOnlyLetters, isOnlyLettersAndHyphens, isVatNumber } from '@/utils/checkRegex';
import { SignupFormType } from '@/types';

interface SignUpPageProps {
    onSwitch: (menu: SetStateAction<"signIn" | "signUpOne" | "signUpTwo" | "signUpThree" | "userMenu" | "forgotPassword">) => void;
    formRef: React.MutableRefObject<SignupFormType | null>
}

interface ErrorsInterface {
    email?: string,
    companyName?: string,
    vatNumber?: string,
    firstName?: string,
    lastName?: string
}

export default function SignUpOne({ onSwitch, formRef }: SignUpPageProps) {
    const inputfocusRef = useRef<HTMLInputElement>(null)
    const [errors, setErrors] = useState<ErrorsInterface>({
        email: "",
        companyName: "",
        vatNumber: "",
        firstName: "",
        lastName: "",
    })

    useEffect(() => {
        inputfocusRef.current?.focus()
    }, [])
    
    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        const newErrors = await validateFields()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            onSwitch("signUpTwo")
        }
    }

    async function validateFields() {
        const newErrors: ErrorsInterface = {}

        // checking of :

        // email
        if (!formRef.current?.email) {
            newErrors.email = "L\'email est recquis."
        } else if (!isEmailValid(formRef.current.email)) {
            newErrors.email = "Le format de l\'email n'est pas valide."            
        } else {
            // check if the email is not already use by annother account
            try {
                const response = await axiosInstance.request({
                    method: 'GET',
                    url: backendUrl.getUrl(`companies/email/${formRef.current.email}`),
                    validateStatus: function (status) {
                        return (status >= 200 && status < 300) || status === 404
                    }
                })
                if (response.status === 200) {
                    newErrors.email = "Cet email est déjà utilisé par un autre compte."
                }
            } catch (error) {
                throw error
            }
        }


        // companyName
        if (!formRef.current?.companyName) {
            newErrors.companyName = "Le nom de l'entrprise est recquis."
        }

        // vatNumber

        if (!formRef.current?.vatNumber) {
            newErrors.vatNumber = "Le numero de TVA est recquis"
        } else if (!isVatNumber(formRef.current.vatNumber)) {
            newErrors.vatNumber = "Le numero de TVA doit debute par deux lettres suivis de 10 chiffres. Exemple: FR0123456789"
        }

        // firstName
        if (!formRef.current?.firstName) {
            newErrors.firstName = "Le prénom est recquis."
        } else if (!isOnlyLettersAndHyphens(formRef.current.firstName)) {
            newErrors.firstName = "Le prénom ne doit comporter que des lettres."
        }

        // lastName
        if (!formRef.current?.lastName) {
            newErrors.lastName = "Le nom est recquis."
        } else if (!isOnlyLettersAndHyphens(formRef.current.lastName)) {
            newErrors.lastName = "Le nom de famille ne devrait comporter que des lettres."
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
                    onSwitch('signIn')
                }}>{'<-'}</button>
                <h1>{'Créer un compte'}</h1>
            </div>
            <div className={styles.errors}>
                <p>{errors.email}</p>
                <p>{errors.companyName}</p>
                <p>{errors.vatNumber}</p>
                <p>{errors.firstName}</p>
                <p>{errors.lastName}</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className= {styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        defaultValue={formRef.current?.email}
                        ref={inputfocusRef}
                        onChange={(event) => {
                            if (formRef.current) {
                                formRef.current.email = event.target.value.trim().toLowerCase()
                            }
                        }}
                        className={errors.email ? styles.formInputError : styles.formInput}
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
                    <label htmlFor="companyName">Société</label>
                    <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        defaultValue={formRef.current?.companyName}
                        onChange={(event) => { 
                            if (formRef.current) {
                                formRef.current.companyName = event.target.value.trim().toLowerCase()
                            }
                        }}
                        className={errors.companyName ? styles.formInputError : styles.formInput}
                        onClick={(event) => {
                            event.preventDefault()
                            setErrors({
                                ...errors,
                                companyName: ""
                            })
                        }}
                        >
                        </input>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="vatNumber">Numéro de TVA</label>
                        <input
                            type="text"
                            id="vatNumber"
                            name="vatNumber"
                            defaultValue={formRef.current?.vatNumber}
                            onChange={(event) => {
                                if (formRef.current) {
                                    formRef.current.vatNumber = event.target.value.trim()
                                }
                            }}
                            className={errors.firstName ? styles.formInputError : styles.formInput}
                            onClick={(event) => {
                                event.preventDefault()
                                setErrors({
                                    ...errors,
                                    vatNumber: ""
                                })
                            }}
                            />
                </div>
                <div className= {styles.formGroup}>
                    <label htmlFor="firstName">Prenom</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        defaultValue={formRef.current?.firstName}
                        onChange={(event) => {
                            if (formRef.current) {
                                formRef.current.firstName = event.target.value.trim().toLowerCase()
                            }
                        }}
                        className={errors.firstName ? styles.formInputError : styles.formInput}
                        onClick={(event) => {
                            event.preventDefault()
                            setErrors({
                                ...errors,
                                firstName: ""
                            })
                        }}
                        />
                </div>
                <div className= {styles.formGroup}>
                    <label htmlFor="lastName">Nom</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        defaultValue={formRef.current?.lastName}
                        onChange={(event) => {
                            if (formRef.current) {
                                formRef.current.lastName = event.target.value.trim().toLowerCase()
                            }
                        }}
                        className={errors.lastName ? styles.formInputError : styles.formInput}
                        onClick={(event) => {
                            event.preventDefault()
                            setErrors({
                                ...errors,
                                lastName: ""
                            })
                        }}
                        />
                </div>
                <div className={styles.submitContainer}>
                    <button className={styles.submit} type='submit'>Suivant</button>
                </div>
            </form>
        </div>
    </>)
}