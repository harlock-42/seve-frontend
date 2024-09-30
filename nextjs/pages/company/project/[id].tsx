import DynamicBreadrumb from '@/components/DynamicBreadcrumb'
import Navbar from '@/components/Navbar'
import ProgressBarProject from '@/components/ProgressBarProject'
import FarmingKind, { ProductionKindType } from '@/components/projects/FarmingKind'
import FetchImage from '@/components/utils/FetchImage'
import styles from '@/styles/companies/project/project.module.css'
import { NewsArrType, NewsType, PdfFilesType, ProjectType } from '@/types'
import axiosInstance from '@/utils/axiosInstance'
import backendUrl from '@/utils/backendUrl'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import nookies, { parseCookies } from 'nookies'
import topLeftCorner from '@/public/icons/main-data-top-left.png'
import topRightCorner from '@/public/icons/main-data-top-right.png'
import bottomLeftCorner from '@/public/icons/main-data-bottom-left.png'
import bottomRightCorner from '@/public/icons/main-data-bottom-right.png'
import Image from 'next/image'
import ProjectPlanning from '@/components/company/ProjectPlannig'
import DownloadFileButton from '@/components/company/DownloadFileButon'
import { ContractType } from '@/types/contract'
import { useEffect, useState } from 'react'
import VisitFarm from '@/components/company/visitFarm/VisitFarm'
import Footer from '@/components/Footer'
import { AxiosError } from 'axios'
import { redirect } from 'next/dist/server/api-utils'
import Breadcrumb from '@/components/Breadcrumb'
import Head from 'next/head'

interface CompanyProjectProps {
    project: ProjectType,
	accessToken: string | null
}

interface pdfFiles {
	sponsorshipAgreement?: string
    commitmentCertificate?: string
    plantingReport?: string
    financialReport?: string
    projectSummary?: string
}

export default function handler({ project, accessToken }: CompanyProjectProps) {
    const router = useRouter()
	const [treeNumber, setTreeNumber] = useState<number>(0)
	const [pdfFiles, setPdfFiles] = useState<pdfFiles | null>(null)
	const [newsArr, setNewsArr] = useState<NewsType[]>([])
	const [moneyRaised, setMoneyRaised] = useState<number>(0)
	const [companyIdState, setCompanyId] = useState<string>('')
	const downloadPdfPath: string = backendUrl.getUrl('contracts/pdfFiles/')
	const monthArr: string[] = [
		'janvier',
		'février',
		'mars',
		'avril',
		'mai',
		'juin',
		'juillet',
		'août',
		'septembre',
		'octobre',
		'novembre',
		'decembre'
	]
	const breadcrumbItems = [
		{
			path: '/',
			label: 'Page d\'accueil',
			isCurrentPage: false
		},
		{
			path: `/company`,
			label: 'mon espace',
			isCurrentPage: false
		},
		{
			path: `/company/project/${project.id}`,
			label: `${project.name}`,
			isCurrentPage: true
		}
	]
	useEffect(() => {
		const cookies = parseCookies()
		const companyId: string = cookies['companyId']
		setCompanyId(companyId)
		const sumMoney: number = project.contracts.reduce((total, obj) => total + obj.amount, 0)
		setMoneyRaised(sumMoney)
		const contract: ContractType = project.contracts.filter((contract) => {
			if (contract.company.id === companyId) {
				return contract
			}
		})[0]
		const pdfFiles: PdfFilesType = contract.pdfFiles
		const updatedNewsArr = [...newsArr]
		contract.newsArr.forEach((news) => {
			const isNewsPresent = updatedNewsArr.some(element => element.id === news.id)
			if (!isNewsPresent) {
				updatedNewsArr.push(news)
			}
		})
		const trees: number = Math.round(project.treeNumberGoal * (contract.amount / project.coast))
		setTreeNumber(trees)
		setNewsArr(updatedNewsArr)
		setPdfFiles(pdfFiles)
	}, [])
	function goToProject(projectId: string) {
		const projectUrl: string = `/projects/${projectId}`
        router.push(projectUrl)
    }
	const treesParagraphString: string = treeNumber < 2 ? 'financé' : 'financés'
   return (
	<>
		<Head>
			<title>{project.name}</title>
			<meta name="robots" content="noindex"/>
			<link rel="icon" href="/icons/seve-logo-page.png" type='image/png'/>
		</Head>
		<main>
			<section className={styles.sectionOne}>
				<Navbar accessToken={accessToken}/>
				<FetchImage
					imageName={project.profilePicture}
					alt=''
					width={0}
					height={0}
					className={styles.profilePicture}
					/>
				<div className={styles.resumeContainer}>
					<ProgressBarProject 
						className={styles.progressBar}
						name={project.name}
						value={moneyRaised}
						total={project.coast}
						treeNumber={project.treeNumber}
						treeNumberGoal={project.treeNumberGoal}
						/>
				</div>
			</section> {/** sectionOneEnd */}
			<section className={styles.sectionTwo}>
				<div className={styles.sectionTwoHeader}>
					<button onClick={() => {goToProject(project.id)}}>{`Revoir le projet de ${project.name}`}</button>
					<div className={styles.dynamicBreadcrumb}>
						<Breadcrumb items={breadcrumbItems} />
					</div>
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
						<div className={`${styles.middleDataContainer} ${project.carbonDyoxid} ? ${styles.spaceAround} : ''`}>
							<div className={styles.dataBox}>
								<h2>{`${treeNumber} arbres`}</h2>
								<h4>{treesParagraphString}</h4>
							</div>
							<div className={styles.dataBox}>
								<h2>{project.treeTypeNumber} essences</h2>
								<h4>différentes</h4>
							</div>
							{ project.carbonDyoxid &&
								<div className={styles.dataBox}>
									<h2>{`${project.carbonDyoxid} tonne de CO2`}</h2>
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
					<h1>Calendrier du projet</h1>
					<ProjectPlanning className={styles.projectPlanning} />
					{ pdfFiles && (
							pdfFiles.commitmentCertificate
							|| pdfFiles.financialReport
							|| pdfFiles.plantingReport
							|| pdfFiles.projectSummary
							|| pdfFiles.sponsorshipAgreement
						) && 
						<div className={styles.downloadFilesContainer}>
							<h1>A télécharger :</h1>
							<div className={styles.filesButtonContainer}>
								{ pdfFiles && pdfFiles.sponsorshipAgreement &&
									<DownloadFileButton url={`${downloadPdfPath}${pdfFiles.sponsorshipAgreement}`} name={'Convention de mécénat'} className={styles.downloadButton} accessToken={accessToken}/>
								}
								{ pdfFiles && pdfFiles.commitmentCertificate &&
									<DownloadFileButton url={`${downloadPdfPath}${pdfFiles.commitmentCertificate}`} name={'Certificat d\'engagement'} className={styles.downloadButton} accessToken={accessToken}/>
								}
								{ pdfFiles && pdfFiles.plantingReport &&
									<DownloadFileButton url={`${downloadPdfPath}${pdfFiles.plantingReport}`} name={'Rapport de plantation'} className={styles.downloadButton} accessToken={accessToken}/>
								}
								{ pdfFiles && pdfFiles.financialReport &&
									<DownloadFileButton url={`${downloadPdfPath}${pdfFiles.financialReport}`} name={'Rapport financier'} className={styles.downloadButton} accessToken={accessToken}/>
								}
								{ pdfFiles && pdfFiles.projectSummary &&
									<DownloadFileButton url={`${downloadPdfPath}${pdfFiles.projectSummary}`} name={'Bilan du projet'} className={styles.downloadButton} accessToken={accessToken}/>
								}

							</div>
						</div>
					}
					{ newsArr.length > 0 &&
						<div className={styles.newsContainer}>
							<h1>Les dernières actualités :</h1>
							<div className={styles.newsArrayContainer}>
								{ newsArr &&
									newsArr.map((news: NewsType, index) => {
										const date: Date = new Date(news.date)
										const month: string = monthArr[date.getMonth()]
										const year: number = date.getFullYear()
										return (<div key={index} className={styles.newsElementContainer}>
											<FetchImage imageName={news.picture} alt='' width={384} height={284} className={styles.newsImage} />
											<p className={styles.newsDate}>{`${month} ${year}`}</p>
											<p className={styles.newsTitle}>{news.title}</p>
											<p className={styles.newsText}>{news.text}</p>
										</div>)
									})
								}
							</div>
						</div>
					}
					<VisitFarm />
			</section> {/** sectionTwoEnd */}
			<Footer isGreen={true} className={styles.footer}/>
		</main>
	</>)
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { params } = context
    if (!params) {
        return {
            notFound: true
        }
    }
    const { id } = params
    const cookies = nookies.get(context)
	const accessToken: string | null = cookies['accessToken'] ?? null
    const projectUrl = `companies/project/${id}`
	try {
		const { data } = await axiosInstance.request({
			method: 'GET',
			url: backendUrl.getUrl(projectUrl),
			headers: {
				Cookie: `accessToken=${accessToken}`
			}
		})
		return {
			props: {
				project: data,
				accessToken
			}
		}		
	} catch (error: unknown) {
		const axiosError: AxiosError = error as AxiosError
		if (axiosError.response && axiosError.response.status) {
			const { status } = axiosError.response
			if (status === 401) {
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