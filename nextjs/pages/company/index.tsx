import styles from '@/styles/companies/company.module.css'
import Navbar from "@/components/Navbar"
import InBuilding from "@/components/InBuilding"
import Footer from "@/components/Footer"
import { GetServerSidePropsContext, GetStaticPathsResult, GetStaticPropsContext } from "next"
import { useEffect } from 'react'
import nookies, { setCookie } from 'nookies'
import Cookie from "js-cookie"
import axiosInstance from '@/utils/axiosInstance'
import backendUrl from '@/utils/backendUrl'
import { CompanyType, ProjectType } from '@/types'
import topLeftCorner from '@/public/icons/main-data-top-left.png'
import topRightCorner from '@/public/icons/main-data-top-right.png'
import bottomLeftCorner from '@/public/icons/main-data-bottom-left.png'
import bottomRightCorner from '@/public/icons/main-data-bottom-right.png'
import Image from 'next/image'
import { ContractType } from '@/types/contract'
import FetchImage from '@/components/utils/FetchImage'
import greenLine from '@/public/icons/greenLineActionUnderlying.png'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AxiosError } from 'axios'
import Head from 'next/head'

interface CompanyIdProps {
	company: CompanyType,
	accessToken: string
}

export default function handler({company, accessToken}: CompanyIdProps) {
	const router = useRouter()
	const { contracts } = company
	let projects: ProjectType[] = []
	let trees: number = 0
	let supportedProjects: number = 0
	let carbonDyoxid: number = 0
	setCookie(null, 'companyId', company.id, {
		path: '/'
	})
	contracts.map((contract: ContractType) => {
		projects.push(contract.project)
		const treeNumber: number = Math.round(contract.project.treeNumberGoal * (contract.amount / contract.project.coast))
		trees += treeNumber
		supportedProjects += 1
		if (contract.project.carbonDyoxid) {
			carbonDyoxid += contract.project.carbonDyoxid
		}
	})
	const supportedProjectsString: string = supportedProjects > 1 ? `${supportedProjects} projets` : `${supportedProjects} projet`
	const acresParagraphString: string = trees < 2 ? 'financé' : 'financés'
	useEffect(() => {
		Cookie.remove('shouldRedirect')
	}, [])

	function handleClick(project: ProjectType) {
		const projectString: string = JSON.stringify(project)
		localStorage.setItem('project', projectString)
		router.push('/company/project/')
	}
	return (<>
		<Head>
			<title>{company.companyName}</title>
			<meta name="robots" content="noindex"/>
			<link rel="icon" href="/icons/seve-logo-page.png" type='image/png'/>
		</Head>
		<Navbar accessToken={accessToken} isGreen={true}/>
			<div className={styles.main}>
				<div className={styles.titleContainer}>
					<h1>{`Bonjour ${company.companyName}`}</h1>
					<h3>Regardons où en sont vos projets financés...</h3>
				</div>
				<div className={styles.dataContainer}>
					<div className={styles.topDataContainer}>
						<Image
							src={topLeftCorner}
							alt='Icone representant l&apos;angle superieur gauche d&apos;un cadre'
							/>
						<Image
							src={topRightCorner}
							alt='Icone representant l&apos;angle superieur droit d&apos;un cadre'
							/>
					</div>
					<div className={`${styles.middleDataContainer} ${carbonDyoxid} === 0 ? ${styles.spaceAround} : ''`}>
						<div className={styles.dataBox}>
							<h2>{`${trees} arbres`}</h2>
							<h4>{acresParagraphString}</h4>
						</div>
						<div className={styles.dataBox}>
							<h2>{supportedProjectsString}</h2>
							<h4>soutenu</h4>
						</div>
						{ carbonDyoxid !== 0 &&
							<div className={styles.dataBox}>
								<h2>{`${carbonDyoxid} tonne de CO2`}</h2>
								<h4>évité</h4>
							</div>
						}
					</div>
					<div className={styles.bottomDataContainer}>
						<Image
							src={bottomLeftCorner}
							alt='Icone representant l&apos;angle inferieur gauche d&apos;un cadre'
							/>
						<Image
							src={bottomRightCorner}
							alt='Icone representant l&apos;angle inferieur droit d&apos;un cadre'
							/>						
					</div>
				</div>
				{
					projects.map((project, index) => {
						const projectUrl = `/company/project/${project.id}`
						return (<Link href={projectUrl}>
						<div key={index} className={styles.projectContainer}>
							<FetchImage
								imageName={project.profilePicture}
								alt=''
								width={0}
								height={0}
								className={styles.profilePicture}
								/>
						</div>
						</Link>)
					})
				}
				<div className={styles.otherProjectsContainer}>
					<h1 className={styles.otherProjectsTitle}>Continuez votre</h1> 
					<div className={styles.actionHOne}>
						<h1>action,</h1>
						<div className={styles.greenLineContainer}>
							<Image
								src={greenLine}
								alt=''
								className={styles.greenLine}
								/>
						</div>
					</div>
					<p>Financez un nouveau projet.</p>
					<button>Les projets</button>
				</div>
			</div>
		<Footer className={styles.footer} isGreen={true} />
	</>)
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	try {
		const cookies = nookies.get(context)
		const accessToken = cookies['accessToken']
		const { data } = await axiosInstance.request({
			method: 'GET',
			url: backendUrl.getUrl(`companies/oneByJwtToken`),
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