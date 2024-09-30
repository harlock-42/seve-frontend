import styles from '@/styles/components/user/UserIcon.module.css'
import userIconWhite from "@/public/icons/user-logo-white.svg"
import userIconGreen from '@/public/icons/user-icon-green.svg'
import connectedUserIconWhite from '@/public/icons/white-connected-user-icon.png'
import connectedUserIconGreen from '@/public/icons/green-connected-user-icon.png'
import Image, { StaticImageData } from 'next/image'
import React, { SetStateAction, useEffect, useRef, useState } from 'react'
import SignUpOne from './SignUpOne'
import SignIn from './SignIn'
import SignUpTwo from './SignUpTwo'
import SignUpThree from './SignUpThree'
import ForgotPassword from './ForgotPassword'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import nookies from 'nookies'
import { EmailType, SigninFormType, SignupFormType } from '@/types'
import axiosInstance from '@/utils/axiosInstance'
import backendUrl from '@/utils/backendUrl'
import UserMenu from './UserMenu'
import { GetServerSidePropsContext } from 'next'
import { type } from 'os'
import { AxiosError } from 'axios'

interface UserIconProps {
    isWhite?: boolean
    accessToken: string | null
}

export default function UserIcon({ isWhite = true, accessToken }: UserIconProps) {
    const defaultMenu: 'signIn' | 'userMenu' = accessToken ? 'userMenu' : 'signIn'
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [userStyles, setUserStyles] = useState<string>(!isWhite ? styles.iconImageContainerWhite : styles.iconImageContainer)
    const [menuToShow, setMenuToShow] = useState<'signIn' | 'signUpOne' | 'signUpTwo' | 'signUpThree' | 'userMenu' | 'forgotPassword'>(defaultMenu)
    const [companyId, setCompanyId] = useState<string>('')
    const signupRef = useRef<SignupFormType>({
        email: "",
        companyName: "",
        firstName: "",
        lastName: "",
        vatNumber: "",
        password: "",
        address: {
            streetNumber: "",
            streetName: "",
            zipCode: "",
            city: ""
        }
    })
    const signinFormRef = useRef<SigninFormType>({
        email: "",
        password: ""
    })
    const forgotPasswordFormRef = useRef<string>("")

    const divRef = useRef<HTMLDivElement | null>(null)
    const userIcon: StaticImageData = isWhite ?
        menuToShow === 'userMenu' ? connectedUserIconWhite : userIconWhite
        : menuToShow === 'userMenu' ? connectedUserIconGreen : userIconGreen
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (divRef.current && !divRef.current.contains(event.target as Node)) {
                setShowMenu(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    useEffect(() => {
        async function fetchCompanyByToken() {
            try {
                const { data } = await axiosInstance.request({
                    method: 'GET',
                    url: backendUrl.getUrl(`companies/oneByJwtToken`),
                    headers: {
                        Cookie: `accessToken=${accessToken}`
                    }
                })
                
                if (data.id === companyId) {
                    setMenuToShow('userMenu')
                    setCompanyId(companyId)
                }
            } catch (error: unknown) {
                const axiosError: AxiosError = error as AxiosError
                if (axiosError.response) {
                    if (axiosError.response.status === 401) {
                    }
                }
            }
        }
            fetchCompanyByToken()
    }, [])

    function toggleMenu() {
        setShowMenu(!showMenu)
        if (!isWhite) {
            if (!showMenu) {
                setUserStyles(styles.iconImageComtainerWhiteActivate)
            } else {
                setUserStyles(styles.iconImageContainerWhite)
            }
        } else {
            if (!showMenu) {
                setUserStyles(styles.iconImageComtainerActivate)
            } else {
                setUserStyles(styles.iconImageContainer)
            }
        }
    }

    return (<>
        <div ref={divRef} className={userStyles} onClick={toggleMenu}>
            <Image
                src={userIcon}
                alt="Icon utilisateur"
                className={styles.userImage}
            />
            {showMenu && (
                (() => {
                    switch(menuToShow) {
                        case 'signIn':
                            return <SignIn 
                                        onSwitch={(menu: SetStateAction<"signIn" | "signUpOne" | "signUpTwo" | "signUpThree" | "userMenu" | "forgotPassword">) => setMenuToShow(menu)}
                                        signinFormRef={signinFormRef}
                                        />
                        case 'signUpOne':
                            return (
                                <SignUpOne 
                                    onSwitch={(menu: SetStateAction<"signIn" | "signUpOne" | "signUpTwo" | "signUpThree" | "userMenu" | "forgotPassword">) => setMenuToShow(menu)}
                                    formRef={signupRef}
                                    />
                            )
                        case 'signUpTwo':
                            return (
                                <SignUpTwo 
                                    onSwitch={(menu: SetStateAction<"signIn" | "signUpOne" | "signUpTwo" | "signUpThree" | "userMenu" | "forgotPassword">) => setMenuToShow(menu)}
                                    formRef={signupRef}
                                    />
                            )
                        case 'signUpThree':
                            return (
                                <SignUpThree 
                                    onSwitch={(menu: SetStateAction<"signIn" | "signUpOne" | "signUpTwo" | "signUpThree" | "userMenu" | "forgotPassword">) => setMenuToShow(menu)}
                                    formRef={signupRef}
                                    />
                            )
                        case 'forgotPassword':
                            return <ForgotPassword
                                        onSwitch={(menu: SetStateAction<"signIn" | "signUpOne" | "signUpTwo" | "signUpThree" | "userMenu" | "forgotPassword">) => setMenuToShow(menu)}
                                        formRef={forgotPasswordFormRef}
                                        />
                        case 'userMenu':
                            return <UserMenu 
                                        onSwitch={(menu: SetStateAction<"signIn" | "signUpOne" | "signUpTwo" | "signUpThree" | "userMenu" | "forgotPassword">) => setMenuToShow(menu)}
                                        companyId={companyId}
                                        />
                    }                    
                })()
            )}
        </div>
    </>)
}