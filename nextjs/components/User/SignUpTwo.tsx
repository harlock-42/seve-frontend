import styles from '@/styles/components/user/SignUp.module.css'
import React, { FormEvent, SetStateAction, useEffect, useReducer, useRef, useState } from 'react';
import { hasLetter, isOnlyLetters, isOnlyLettersAndHyphens, isOnlyLettersAndSpaces, isOnlyNumber } from '@/utils/checkRegex';
import { SignupFormType } from '@/types';

interface SignUpPageProps {
    onSwitch: (menu: SetStateAction<"signIn" | "signUpOne" | "signUpTwo" | "signUpThree" | "userMenu" | "forgotPassword">) => void;
    formRef: React.MutableRefObject<SignupFormType | null>
}


interface ErrorsInterface {
    streetNumber?: string,
    streetName?: string,
    zipCode?: string,
    city?: string
}

export default function SignUpTwo({ onSwitch, formRef }: SignUpPageProps) {
    const inputFocusRef = useRef<HTMLInputElement>(null)
    const [checkPassword, setCheckPassword] = useState<string>("")
    const [errors, setErrors] = useState<ErrorsInterface>({
        streetNumber: "",
        streetName: "",
        zipCode: "",
        city: "",
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
            onSwitch("signUpThree")
        }
    }

    function validateFields() {
        const newErrors: ErrorsInterface = {}
        const emailRegex = /\S+@\S+\.\S+/

        // checking of :

        // streetNumber
        if (!formRef.current?.address?.streetNumber) {
            newErrors.streetNumber = "Le numero de la voie est recquis."
        } else if (!isOnlyNumber(formRef.current.address.streetNumber)) {
            newErrors.streetNumber = "Le numero de la voie ne doit contenir que des chiffres"
        }
        // streetName

        if (!formRef.current?.address?.streetName) {
            newErrors.streetName = "Le libellé et le nom de la voie est recquis"
        } else if (!isOnlyLettersAndSpaces(formRef.current.address.streetName)) {
            newErrors.streetName = "Le libellé et le nom de la voie ne doivent contenir que des lettres"
        }

        // zipCode

        if (!formRef.current?.address?.zipCode) {
            newErrors.zipCode = "Le code postal de la ville est recquis"
        } else if (!isOnlyNumber(formRef.current.address.zipCode)) {
            newErrors.zipCode = "Le code postal de la ville ne doit comporter que des nombres"
        }

        // city
        if (!formRef.current?.address?.city) {
            newErrors.city = "Le nom de la ville est recquis."
        } else if (!isOnlyLettersAndHyphens(formRef.current.address.city)) {
            newErrors.city = "Le nom de la ville ne doit contenir que des lettres ou traits d'unions."
        } else if (!hasLetter(formRef.current.address.city)) {
            newErrors.city = "Le nom de la ville doit contenir des lettres."
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
                    onSwitch('signUpOne')
                }}>{'<-'}</button>
                <h1>{'Créer un compte'}</h1>
            </div>
            <div className={styles.errors}>
                <p>{errors.streetNumber}</p>
                <p>{errors.streetName}</p>
                <p>{errors.zipCode}</p>
                <p>{errors.city}</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className= {styles.formGroup}>
                    <label htmlFor="streetNumber">Nº de la voie</label>
                    <input
                        type="text"
                        id="streetNumber"
                        name="streetNumber"
                        defaultValue={formRef.current?.address?.streetNumber}
                        ref={inputFocusRef}
                        onChange={(event) => {
                            if (formRef.current && formRef.current.address) {
                                formRef.current.address.streetNumber = event.target.value.trim()
                            }
                        }}
                        className={errors.streetNumber ? styles.formInputError : styles.formInput}
                        onClick={(event) => {
                            event.preventDefault()
                            setErrors({
                                ...errors,
                                streetNumber: ""
                            })
                        }}
                        />
                </div>
                <div className= {styles.formGroup}>
                    <label htmlFor="streetName">Libellé et nom de la voie</label>
                    <input
                        type="text"
                        id="streetName"
                        name="streetName"
                        defaultValue={formRef.current?.address?.streetName}
                        onChange={(event) => 
                            { 
                            if (formRef.current && formRef.current.address) {
                                formRef.current.address.streetName = event.target.value.trim().toLowerCase()
                            }
                        }}
                        className={errors.streetName ? styles.formInputError : styles.formInput}
                        onClick={(event) => {
                            event.preventDefault()
                            setErrors({
                                ...errors,
                                streetName: ""
                            })
                        }}
                        >
                        </input>
                </div>
                <div className= {styles.formGroup}>
                    <label htmlFor="zipCode">Code postal</label>
                    <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        defaultValue={formRef.current?.address?.zipCode}
                        onChange={(event) => {
                            if (formRef.current && formRef.current.address) {
                                formRef.current.address.zipCode = event.target.value.trim()
                            }
                        }}
                        className={errors.zipCode ? styles.formInputError : styles.formInput}
                        onClick={(event) => {
                            event.preventDefault()
                            setErrors({
                                ...errors,
                                zipCode: ""
                            })
                        }}
                        />
                </div>
                <div className= {styles.formGroup}>
                    <label htmlFor="city">Ville</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        defaultValue={formRef.current?.address?.city}
                        onChange={(event) => {
                            if (formRef.current && formRef.current.address) {
                                formRef.current.address.city = event.target.value.trim().toLowerCase()
                            }
                        }}
                        className={errors.city ? styles.formInputError : styles.formInput}
                        onClick={(event) => {
                            event.preventDefault()
                            setErrors({
                                ...errors,
                                city: ""
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