import styles from '@/styles/companies/settings.module.css'
import Navbar from "@/components/Navbar"
import { CompanyType } from "@/types"
import axiosInstance from "@/utils/axiosInstance"
import backendUrl from "@/utils/backendUrl"
import { AxiosError } from "axios"
import { GetServerSidePropsContext } from "next"
import nookies, { setCookie } from 'nookies'
import Breadcrumb from '@/components/Breadcrumb'
import { FormEvent, useRef, useState } from 'react'
import { hasLetter, isEmailValid, isOnlyLettersAndHyphens, isOnlyLettersAndSpaces, isOnlyNumber, isVatNumber } from '@/utils/checkRegex'
import Footer from '@/components/Footer'
import Head from 'next/head'

interface ReferentErrorsInterface {
    firstName?: string
    lastName?: string
    email?: string
}

interface ReferentFormType {
    firstName: string
    lastName: string
    email: string
}

interface CompanyErrorsInterface {
    companyName?: string
    vatNumber?: string
}

interface CompanyFormType {
    companyName: string
    vatNumber: string
}

interface AddressErrorsInterface {
    streetNumber?: string,
    streetName?: string,
    zipCode?: string,
    city?: string
}

interface AddressFormeType {
    streetNumber: string,
    streetName: string,
    zipCode: string,
    city: string    
}

interface CompanySettingsProps {
    company: CompanyType,
    accessToken: string | null
}

export default function CompanySettings({company, accessToken}: CompanySettingsProps) {
    const [isDisplayPasswordInput, setIsDisplayPasswordInput] = useState<boolean>(false)
    const [isMailSent, setIsMailSent] = useState<boolean>(false)
    
    const [referentErrors, setReferentErrors] = useState<ReferentErrorsInterface>({
        firstName: "",
        lastName: "",
        email: ""
    })
    const [companyErrors, setCompanyErrors] = useState<CompanyErrorsInterface>({
        companyName: "",
        vatNumber: ""
    })
    const [addressErrors, setAddressErrors] = useState<AddressErrorsInterface>({
        streetNumber: "",
        streetName: "",
        zipCode: "",
        city: ""
    })

    const referentFormRef = useRef<ReferentFormType>({
        firstName: company.firstName,
        lastName: company.lastName,
        email: company.email
    })
    const companyFormRef = useRef<CompanyFormType>({
        companyName: company.companyName,
        vatNumber: company.vatNumber
    })
    const addressFormRef = useRef<AddressFormeType>({
        streetNumber: company.address.streetNumber.toString(),
        streetName: company.address.streetName,
        zipCode: company.address.zipCode.toString(),
        city: company.address.city
    })
    const breadcrumbItems = [
        {
            path: '/',
            label: 'Page d\'accueil'
        },
        {
            path: `/company`,
            label: `mon espace`
        },
        {
            path: `/company/settings`,
            label: `mes paramettres`
        }
    ]

    async function validateReferentFields(): Promise<ReferentErrorsInterface> {
        const newErrors: ReferentErrorsInterface = {}
        const {firstName, lastName, email} = referentFormRef.current
        
        // firstName
        if (firstName === "") {
            newErrors.firstName = "Veuillez entrer votre prénom"
        } else if (!isOnlyLettersAndHyphens(firstName)) {
            newErrors.firstName = "Le prénom ne doit comporter que des lettres."
        }

        // lastName
        if (lastName === "") {
            newErrors.lastName = "Veuillez entrer votre nom"
        } else if (!isOnlyLettersAndHyphens(lastName)) {
            newErrors.lastName = "Le nom ne doit comporter que des lettres."
        }

        // email
        if (email === "") {
            newErrors.email = "Veuillez entrer votre email"
        } else if (!isEmailValid(email)) {
            newErrors.email = "Le format de l\'email n'est pas valide."
        } else {
            // check if the email is not already use by annother account
            try {
                const response = await axiosInstance.request({
                    method: 'GET',
                    url: backendUrl.getUrl(`companies/email/${email}`),
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
        return newErrors
    }
    
    async function handleReferentSubmit(event: FormEvent) {
        event.preventDefault()
        const newErrors: ReferentErrorsInterface = await validateReferentFields()
        if (Object.keys(newErrors).length > 0) {
            console.log(newErrors)
            setReferentErrors(newErrors)
        } else {
            axiosInstance.request({
                method: "PUT",
                url: backendUrl.getUrl('companies/set/referentData'),
                data: referentFormRef.current
            })
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                })
        }

    }

    async function validateCompanyFields() {
        const newErrors: CompanyErrorsInterface = {}
        const { companyName, vatNumber } = companyFormRef.current

        // companyName
        if (companyName === "") {
            newErrors.companyName = "Veuillez entrer le nom de votre entreprise"
        }
        
        // vatNumber
        if (vatNumber === "") {
            newErrors.vatNumber = "Veuillez entrer le numero de TVA de votre entreprise"
        } else if (!isVatNumber(vatNumber)) {
            newErrors.vatNumber = "Le numero de TVA doit debute par deux lettres suivis de 10 chiffres. Exemple: FR0123456789"
        }
        return newErrors
    }

    async function handleCompanySubmit(event: FormEvent) {
        event.preventDefault()
        const newErrors: CompanyErrorsInterface = await validateCompanyFields()
        if (Object.keys(newErrors).length > 0) {
            setCompanyErrors(newErrors)
        } else {
            axiosInstance.request({
                method: "PUT",
                url: backendUrl.getUrl('companies/set/companyData'),
                data: companyFormRef.current
            })
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    async function validateAddressFields() {
        const newErrors: AddressErrorsInterface = {}
        const { streetNumber, streetName, zipCode, city } = addressFormRef.current

        // streetNumber
        if (!streetNumber) {
            newErrors.streetNumber = "Le numero de la voie est recquis."
        } else if (!isOnlyNumber(streetNumber)) {
            newErrors.streetNumber = "Le numero de la voie ne doit contenir que des chiffres"
        }
        // streetName

        if (!streetName) {
            newErrors.streetName = "Le libellé et le nom de la voie est recquis"
        } else if (!isOnlyLettersAndSpaces(streetName)) {
            newErrors.streetName = "Le libellé et le nom de la voie ne doivent contenir que des lettres"
        }

        // zipCode

        if (!zipCode) {
            newErrors.zipCode = "Le code postal de la ville est recquis"
        } else if (!isOnlyNumber(zipCode)) {
            newErrors.zipCode = "Le code postal de la ville ne doit comporter que des nombres"
        }

        // city
        if (!city) {
            newErrors.city = "Le nom de la ville est recquis."
        } else if (!isOnlyLettersAndHyphens(city)) {
            newErrors.city = "Le nom de la ville ne doit contenir que des lettres ou traits d'unions."
        } else if (!hasLetter(city)) {
            newErrors.city = "Le nom de la ville doit contenir des lettres."
        }

        return newErrors
    }

    async function handleAddressSubmit(event: FormEvent) {
        event.preventDefault()
        const newErrors: AddressErrorsInterface = await validateAddressFields()
        if (Object.keys(newErrors).length > 0) {
            setAddressErrors(newErrors)
        } else {
            axiosInstance.request({
                method: "PUT",
                url: backendUrl.getUrl('companies/set/addressData'),
                data: addressFormRef.current
            })
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    async function handleResetPassword(event: FormEvent) {
        event.preventDefault()
        axiosInstance.request({
            method: 'POST',
            url: backendUrl.getUrl('mail/sendWithToken'),
            data: {
                from: 'contact@seve-france.fr',
                to: company.email,
                subject: "",
                text: ""
            }
            
        })
            .then((response) => {
                setIsMailSent(true)
            })
    }

    return (<>
        <Head>
            <title>Mes paramètres</title>
			<meta name="robots" content="noindex"/>
            <link rel="icon" href="/icons/seve-logo-page.png" type='image/png'/>
        </Head>
        <main>
        <Navbar accessToken={accessToken} isGreen={true} activateBreadscumb={false}/>
        <div className={styles.breadcrumbContainer}>
            <Breadcrumb items={breadcrumbItems} />
        </div>
        <section className={styles.mainSection}>
            <h1>Modifiez vos paramètres...</h1>
            <div className={styles.inputsContainer}>
                <h2>référant de votre entreprise</h2>
                <div className={styles.elementInputContainer}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="firstName">Prénom</label>
                        <p className={styles.errorMessage}>{referentErrors.firstName}</p>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            className={styles.inputText}
                            defaultValue={referentFormRef.current.firstName}
                            onChange={(event) => {
                                event.preventDefault()
                                referentFormRef.current.firstName = event.target.value
                            }}
                            onClick={(event) => {
                                event.preventDefault()
                                setReferentErrors({
                                    ...referentErrors,
                                    firstName: ""
                                })
                            }}
                            />
                    </div> {/** inputContainerEnd */}
                    <div className={styles.inputContainer}>
                        <label htmlFor="lastName">Nom</label>
                        <p className={styles.errorMessage}>{referentErrors.lastName}</p>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            className={styles.inputText}
                            defaultValue={referentFormRef.current.lastName}
                            onChange={(event) => {
                                event.preventDefault()
                                referentFormRef.current.lastName = event.target.value
                            }}
                            onClick={(event) => {
                                event.preventDefault()
                                setReferentErrors({
                                    ...referentErrors,
                                    lastName: ""
                                })
                            }}
                            />
                    </div> {/** inputContainerEnd */}
                    <div className={styles.inputContainer}>
                        <label htmlFor="email">Email</label>
                        <p className={styles.errorMessage}>{referentErrors.email}</p>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={styles.inputText}
                            defaultValue={referentFormRef.current.email}
                            onChange={(event) => {
                                event.preventDefault()
                                referentFormRef.current.email = event.target.value
                            }}
                            onClick={(event) => {
                                event.preventDefault()
                                setReferentErrors({
                                    ...referentErrors,
                                    email: ""
                                })
                            }}
                            />
                    </div> {/** inputContainerEnd */}
                </div> {/** elementInputContainerEnd */}
                <div className={styles.submitButtonContainer}>
                    <button 
                        className={styles.submitButton}
                        onClick={handleReferentSubmit}
                        >Valider</button>
                </div>
                    <h2>votre entreprise</h2>
                    <div className={styles.elementInputContainer}>
                        <div className={styles.inputContainer}>
                            <label htmlFor="companyName">Nom de l'entreprise</label>
                            <p className={styles.errorMessage}>{companyErrors.companyName}</p>
                            <input
                                type="text"
                                id="companyName"
                                name="companyName"
                                className={styles.inputText}
                                defaultValue={companyFormRef.current.companyName}
                                onChange={(event) => {
                                    event.preventDefault()
                                    companyFormRef.current.companyName = event.target.value
                                }}
                                onClick={(event) => {
                                    event.preventDefault()
                                    setCompanyErrors({
                                        ...companyErrors,
                                        companyName: ""
                                    })
                                }}
                                />
                    </div> {/** inputContainerEnd */}
                    <div className={styles.inputContainer}>
                        <label htmlFor="vatNumber">Numero de TVA</label>
                        <p className={styles.errorMessage}>{companyErrors.vatNumber}</p>
                        <input
                            type="text"
                            id="vatNumber"
                            name="vatNumber"
                            className={styles.inputText}
                            defaultValue={companyFormRef.current.vatNumber}
                            onChange={(event) => {
                                event.preventDefault()
                                companyFormRef.current.vatNumber = event.target.value
                            }}
                            onClick={(event) => {
                                event.preventDefault()
                                setCompanyErrors({
                                    ...companyErrors,
                                    vatNumber: ""
                                })
                            }}
                            />
                    </div> {/** inputContainerEnd */}
                </div> {/** elementInputContainerEnd */}
                <div className={styles.submitButtonContainer}>
                    <button 
                        className={styles.submitButton}
                        onClick={handleCompanySubmit}
                        >Valider</button>
                </div>
                <h2>L'addresse de votre entreprise</h2>
                    <div className={styles.elementInputContainer}>
                        <div className={styles.inputContainer}>
                            <label htmlFor="streetNumber">Nº de la voie</label>
                            <p className={styles.errorMessage}>{addressErrors.streetNumber}</p>
                            <input
                                type="text"
                                id="streetNumber"
                                name="streetNumber"
                                className={styles.inputText}
                                defaultValue={addressFormRef.current.streetNumber}
                                onChange={(event) => {
                                    event.preventDefault()
                                    addressFormRef.current.streetNumber = event.target.value
                                }}
                                onClick={(event) => {
                                    event.preventDefault()
                                    setAddressErrors({
                                        ...addressErrors,
                                        streetNumber: ""
                                    })
                                }}
                                />
                    </div> {/** inputContainerEnd */}
                    <div className={styles.inputContainer}>
                        <label htmlFor="streetName">Libellé et nom de la voie</label>
                        <p className={styles.errorMessage}>{addressErrors.streetName}</p>
                        <input
                            type="text"
                            id="streetName"
                            name="streetName"
                            className={styles.inputText}
                            defaultValue={addressFormRef.current.streetName}
                            onChange={(event) => {
                                event.preventDefault()
                                addressFormRef.current.streetName = event.target.value
                            }}
                            onClick={(event) => {
                                event.preventDefault()
                                setAddressErrors({
                                    ...addressErrors,
                                    streetName: ""
                                })
                            }}
                            />
                    </div> {/** inputContainerEnd */}
                    <div className={styles.inputContainer}>
                            <label htmlFor="zipCode">Code postal</label>
                            <p className={styles.errorMessage}>{addressErrors.streetNumber}</p>
                            <input
                                type="text"
                                id="zipCode"
                                name="zipCode"
                                className={styles.inputText}
                                defaultValue={addressFormRef.current.zipCode}
                                onChange={(event) => {
                                    event.preventDefault()
                                    addressFormRef.current.zipCode = event.target.value
                                }}
                                onClick={(event) => {
                                    event.preventDefault()
                                    setAddressErrors({
                                        ...addressErrors,
                                        zipCode: ""
                                    })
                                }}
                                />
                    </div> {/** inputContainerEnd */}
                    <div className={styles.inputContainer}>
                        <label htmlFor="city">Ville</label>
                        <p className={styles.errorMessage}>{addressErrors.city}</p>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            className={styles.inputText}
                            defaultValue={addressFormRef.current.city}
                            onChange={(event) => {
                                event.preventDefault()
                                addressFormRef.current.city = event.target.value
                            }}
                            onClick={(event) => {
                                event.preventDefault()
                                setAddressErrors({
                                    ...addressErrors,
                                    city: ""
                                })
                            }}
                            />
                    </div> {/** inputContainerEnd */}
                </div> {/** elementInputContainerEnd */}
                <div className={styles.submitButtonContainer}>
                    <button 
                        className={styles.submitButton}
                        onClick={handleAddressSubmit}
                        >Valider</button>
                </div>
                <h2>Sécurité</h2>
                <div className={styles.elementInputContainer}>
                    <div className={styles.passwordContainer}>
                        <h3>Mot de passe</h3>
                        <div className={styles.submitButtonContainer}>
                            { !isMailSent ?
                                <button
                                    className={styles.submitButton}
                                    onClick={handleResetPassword}
                                    >Par ici</button>
                                :
                                <p className={styles.mailSentText}>Vous avez reçu un mail</p>
                            }
                        </div>
                    </div>
                </div> {/** elementInputContainerEnd */}
            </div> {/** inputsContainerEnd */}
        </section>
        <Footer className={styles.footer} isGreen={true} />
    </main>
    </>)
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const cookies = nookies.get(context)
        const accessToken: string | null = cookies['accessToken'] ?? null
        const { data } = await axiosInstance.request({
            method: 'GET',
            url: backendUrl.getUrl(`companies/OneByJwtToken`),
            headers: {
                Cookie: `accessToken=${accessToken}`
            }
        })
        return {
            props: {
                company: data,
                accessToken
            }
        }
    } catch (error: unknown) {
		const axiosError: AxiosError = error as AxiosError
		if (axiosError.response && axiosError.response.status) {
			if (axiosError.response.status === 401) {
				nookies.set(context, 'accessToken', '', {
					maxAge: -1,
					path: '/'
				})
				nookies.set(context, 'companyId', '', {
					maxAge: -1,
					path: '/'
				})
				return {
					redirect: {
						destination: '/',
						permanent: false
					}
				}
			}
		}
    }
}