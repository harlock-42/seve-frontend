import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import axios from "axios"
import nookies from 'nookies'
import Project from "@/components/projects/Project"
import styles from '@/styles/projects/projects.module.css'
import axiosInstance from "@/utils/axiosInstance"
import { ProjectType } from "@/types"
import { GetServerSidePropsContext } from "next"
import backendUrl from "@/utils/backendUrl"
import Head from "next/head"

interface ProjectsProps {
	projects: ProjectType[]
	accessToken: string | null
} 

export default function handler({ projects, accessToken }: ProjectsProps) {
	return (<>
		<Head>
			<title>Nos projets</title>
			<meta name='description' content="Explorez les projets prêts à transformer l\'agriculture. Avec Seve, financez directement des initiatives agroforestières et faites la différence pour un avenir durable." />
		</Head>
		<Navbar accessToken={accessToken} isGreen={true} />
		<section className={styles.container}>
			{
				projects.map((project, index) => {
					return (<Project key={index} className={styles.project} data={project} />)
				})
			}
		</section>
		<Footer className={styles.footer} isGreen={true} />
	</>)
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

	const cookies = nookies.get(context)
	const accessToken = cookies['accessToken'] ?? null
	const response = await axiosInstance.get(backendUrl.getUrl('projects/all'))
	const data = response.data

	return {
		props: {
			projects: data,
			accessToken
		}
	}
}