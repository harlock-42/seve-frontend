import styles from '@/styles/ourApproach/ourApproach.module.css'
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import InBuilding from "@/components/InBuilding"
import nookies from 'nookies'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

interface OurApproachProps {
	accessToken: string | null
}

export default function handler({ accessToken }: OurApproachProps) {
	return (<>
		<Head>
			<title>Notre approche</title>
            <link rel="icon" href="/icons/seve-logo-page.png" type='image/png'/>
		</Head>
		<Navbar accessToken={accessToken} isGreen={true} />
		<InBuilding />
		<Footer className={styles.footer} isGreen={true} />
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