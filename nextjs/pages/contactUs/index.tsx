import styles from '@/styles/contactUs/contactUs.module.css'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Breadcrumb from '@/components/Breadcrumb'
import DynamicBreadrumb from '@/components/DynamicBreadcrumb'
import Footer from '@/components/Footer'
import React, { useRef, useState } from 'react'
import axiosInstance from '@/utils/axiosInstance'
import messageIcon from '@/public/icons/message-icon.svg'
import { EmailType } from '@/types'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import nookies from 'nookies'
import Head from 'next/head'

interface ReceiveEmailInputType {
	from: string
	name: string
	company?: string
	text: string
}

interface ContactUsProps {
	accessToken: string | null
}

export default function handler({ accessToken }: ContactUsProps) {
	const protocol: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL_PROTOCOL
	const domain: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL_DOMAIN_NAME
	const port: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL_PORT
	const url = `${protocol}://${domain}:${port}/mail/send`

	const formData = useRef<ReceiveEmailInputType>({
		from: "",
		name: "",
		company: "",
		text: ""
	})

	const [isSent, setIsSent] = useState<boolean>(false)

	function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = e.target
        formData.current = {
            ...formData.current,
            [name]: value
        }
	}

	async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
		e.preventDefault()

		try {
            const sendEmail: EmailType = {
                from: formData.current.from,
                to: 'contact@seve-france.fr',
                subject: formData.current.company === "" ? 'Message de ' + formData.current.name : 'Message de ' + formData.current.name + ', travaillant pour ' + formData.current.company,
                text: formData.current.text
            }
			await axiosInstance.post(url, sendEmail)
			formData.current = {
				from: "",
				name: "",
				company: "",
				text: ""
			}
			setIsSent(true)
		} catch (error) {
			console.error("Error during trying sending mail", error)
		}
	}

	return (<>
		<Head>
			<title>Nous contacter</title>
			<link rel="icon" href="/icons/seve-logo-page.png" type='image/png'/>
		</Head>
		<Navbar accessToken={accessToken} isGreen={true} />
		<section className={styles.section}>
			<h1>On prend rendez-vous<br/>pour en parler ?</h1>
			<form onSubmit={handleSubmit}>
				<div className={styles.contactDetailsContainer}>
					<div className={styles.contactDetails}>
						<label htmlFor="from">Votre adresse mail</label>
						<input disabled={isSent} type="email" id="from" name="from" value={formData.current.from} onChange={handleChange} required/>
					</div>
					<div className={styles.contactDetails}>
						<label htmlFor="name">Votre nom et prenom</label>
						<input disabled={isSent} type="text" id="name" name="name" value={formData.current.name} onChange={handleChange} required/>
					</div>
					<div className={styles.contactDetails}>
						<label htmlFor="company">Votre entrepise (facultatif)</label>
						<input disabled={isSent} type="text" id="company" name="company" value={formData.current.company} onChange={handleChange} required={false}/>
					</div>
				</div>
				<div className={styles.inputMessageBox}>
					<label htmlFor="text">Laissez-nous un message ici...</label>
					<textarea disabled={isSent} name="text" id="text" value={formData.current.text} onChange={handleChange} required />
					<button type='submit' >{"-> Envoyer"}</button>
					<div className={`${styles.messageSentContainer} ${isSent ? styles.visible : ''}`}>
						<Image
							src={messageIcon}
							alt='Icone d&apos;une enveloppe ferme'
							className={styles.messageIcon}
							/>
						<p>Nous avons bien reçu votre message,<br/>nous reviendrons vers vous rapidement.<br/><span>A bientôt !</span></p>
				</div> 
					</div>
			</form>
		</section>
		<Footer className={styles.footer} isGreen={true}/>
	</>)
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const cookies = nookies.get(context)
	const accessToken: string | null = cookies['accessToken'] ?? null

	return {
		props: {
			accessToken
		}
	}
}