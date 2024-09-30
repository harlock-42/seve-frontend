import styles from '@/styles/components/user/ForgotPassword.module.css'
import { EmailType } from '@/types';
import axiosInstance from '@/utils/axiosInstance';
import backendUrl from '@/utils/backendUrl';
import { isEmailValid } from '@/utils/checkRegex';
import { FormEvent, SetStateAction, useEffect, useRef, useState } from 'react';
import messageIcon from '@/public/icons/message-icon.png'
import Image from 'next/image';

interface ForgotPasswordPageProps {
    onSwitch: (menu: SetStateAction<"signIn" | "signUpOne" | "signUpTwo" | "signUpThree" | "userMenu" | "forgotPassword">) => void;
    formRef: React.MutableRefObject<string>
}

export default function ForgotPassword({ onSwitch, formRef }: ForgotPasswordPageProps) {
    const emailInputRef = useRef<HTMLInputElement>(null)
    const [errors, setErrors] = useState<string>("")
    const [isMailSent, setIsMailSent] = useState<boolean>(false)
    
    function handleClick(event: React.MouseEvent<HTMLDivElement>) {
        event.stopPropagation()
    }

    useEffect(() => {
        emailInputRef.current?.focus()
    }, [])
    
    async function validateFields() {
        let newErrors: string = ""

        if (!emailInputRef.current?.value) {
            newErrors = "L\'email est recquis."
        } else if (!isEmailValid(emailInputRef.current.value)) {
            newErrors = "Le format de l\'email n'est pas valide."            
        } else {
            // check if the email is not already use by annother account
            try {
                const response = await axiosInstance.request({
                    method: 'GET',
                    url: backendUrl.getUrl(`companies/email/${emailInputRef.current.value}`),
                    validateStatus: function (status) {
                        return (status >= 200 && status < 300) || status === 404
                    }
                })
                if (response.status === 404) {
                    newErrors = "Cet email ne correspond à aucun compte enregistré chez nous."
                }
            } catch (error) {
                throw error
            }
        }
        return newErrors
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        if (emailInputRef && emailInputRef.current) {
            emailInputRef.current.value = emailInputRef.current?.value.trim().toLowerCase()
        }
        const newErrors = await validateFields()
        if (newErrors !== "") {
            setErrors(newErrors)
        } else {
            axiosInstance.request({
                method: 'POST',
                url: backendUrl.getUrl('mail/sendWithToken'),
                data: {
                    from: 'contact@seve-france.fr',
                    to: emailInputRef.current?.value,
                    subject: "",
                    text: ""
                }
            })
                .then((response) => {
                    setIsMailSent(true)
                })
        }
    }

    
    return (<>
        <div className={styles.container}>
            <div className={styles.nestedContainer} onClick={handleClick}>
                <div className={styles.header}>
                    <button onClick={() => {
                        onSwitch('signIn')
                    }}>{'<-'}</button>
                    <h1>Mot de passe oublié ?</h1>
                </div>
                <div className={styles.errors}>
                    <p>{errors}</p>
                </div>
                {!isMailSent ?
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">
                                <p>Renseignez votre adresse mail,<br/>nous vous enverrons un mail</p>
                            </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                defaultValue={formRef.current}
                                ref={emailInputRef}
                                className={errors ? styles.formInputError : styles.formInput}
                                onClick={(event) => {
                                    event.preventDefault()
                                    setErrors("")
                                }}
                            />
                            <div className={styles.submitContainer}>
                                <button className={styles.submit} type='submit'>Envoyer</button>
                            </div>
                        </div>
                    </form>
                :
                <div className={styles.mailContainer}>
                    <Image
                        src={messageIcon}
                        alt='icon of a green letter'
                        width={57}
                        height={37}
                        className={styles.messageIcon}
                        />
                    <h2>Vous avez reçu un mail</h2>
                </div>
                }
            </div>

        </div>
    </>)
}