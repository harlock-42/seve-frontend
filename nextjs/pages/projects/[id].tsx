import styles from '@/styles/projects/project.module.css'
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { GetServerSidePropsContext, GetStaticPathsResult, GetStaticPropsContext } from "next"
import axiosInstance from '@/utils/axiosInstance'
import backendUrl from '@/utils/backendUrl'
import { ProjectType } from '@/types'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import ProgressBarProject from '@/components/ProgressBarProject'
import FarmingKind, { ProductionKindType } from '@/components/projects/FarmingKind'
import DynamicBreadrumb from '@/components/DynamicBreadcrumb'
import topLeftCorner from '@/public/icons/main-data-top-left.png'
import topRightCorner from '@/public/icons/main-data-top-right.png'
import bottomLeftCorner from '@/public/icons/main-data-bottom-left.png'
import bottomRightCorner from '@/public/icons/main-data-bottom-right.png'
import greenStrokeProjectTitle from '@/public/icons/green-stroke-tree-kind.png'
import TreeKindElement from '@/components/projects/TreeKindElement'
import ProjectSteps from '@/components/projects/ProjectSteps'
import Link from 'next/link'
import nookies from 'nookies'
import FetchImage from '@/components/utils/FetchImage'
import Head from 'next/head'

interface ProjectIdProps {
	project: ProjectType,
	accessToken: string | null
}

export default function handler({project, accessToken}: ProjectIdProps) {
	const agroLinkRef = useRef<HTMLParagraphElement>(null)
	const [moneyRaised, setMoneyRaised] = useState<number>(0)
	useEffect(() => {
		const moneySum: number = project.contracts.reduce((total, obj) => total + obj.amount, 0)
		setMoneyRaised(moneySum)
		if (agroLinkRef.current) {
			agroLinkRef.current.addEventListener('mouseover', (event) => {
				event.preventDefault()
				if (agroLinkRef.current) {
					agroLinkRef.current.textContent = "Accéder à plus de ressources"
					agroLinkRef.current.style.color = '#72BF01'
					agroLinkRef.current.style.fontSize = '15px'
				}
			})
			agroLinkRef.current.addEventListener('mouseout', (event) => {
				event.preventDefault()
				if (agroLinkRef.current) {
					agroLinkRef.current.textContent = "-> En savoir + sur l’agro-foresterie"
					agroLinkRef.current.style.color = "#02302D"
					agroLinkRef.current.style.fontSize = "12px" 
				}
			})
		}
	}, [])
	return (<>
		<Head>
			<title>{project.name}</title>
			<meta name="robots" content="noindex"/>
			<link rel="icon" href="/icons/seve-logo-page.png" type='image/png'/>
		</Head>
		{/* <Navbar isGreen={true} /> */}
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
			<FarmingKind className={styles.farmimgKind} kind={project.production as keyof typeof ProductionKindType}/>
		</section>
		<section className={styles.sectionTwo}>
			<DynamicBreadrumb className={styles.dynamicBreadcrumb}/>
			<div className={styles.mainDataTop}>
					<Image
						src={topLeftCorner}
						alt='Icone representant l&apos;angle superieur gauche d&apos;un cadre'
						/>
					<Image
						src={topRightCorner}
						alt='Icone representant l&apos;angle superieur droit d&apos;un cadre'
						/>
			</div> {/** mainDataTopEnd */}
			<div className={`${styles.mainDataCenter} ${!project.carbonDyoxid ? styles.spaceAround : ''}`}>
				<div className={styles.mainDataBox}>
					<h1>{project.treeNumberGoal} arbres</h1>
					<h2>à planter</h2>
				</div>
				<div className={styles.mainDataBox}>
					<h1>{project.treeTypeNumber} essences</h1>
					<h2>différentes</h2>
				</div>
				{ project.carbonDyoxid &&
					<div className={styles.mainDataBox}>
						<h1>{project.carbonDyoxid} tonnes de CO2</h1>
						<h2>évité</h2>
						<h3>*prévisionnel (calculé sur les projets similaires)</h3>
					</div>
				}
			</div> {/** mainDataCenter */}
			<div className={styles.mainDataBottom}>
				<Image
					src={bottomLeftCorner}
					alt='Icone representant l&apos;angle inferieur gauche d&apos;un cadre'
					/>
				<Image
					src={bottomRightCorner}
					alt='Icone representant l&apos;angle inferieur droit d&apos;un cadre'
					/>
			</div> {/** mainDataBottomEnd */}
			{ project.parcelDescription &&
				<div className={styles.parcelDescriptionContainer}>
					<h4>Description de la ferme</h4>
					<p>{project.parcelDescription}</p>
				</div>
			}
			<div className={styles.projectTitleContainer}>
				<h1>Son projet</h1>
				<Image
					src={greenStrokeProjectTitle}
					alt='soulignement du titre nos projets en vert' 
					className={styles.greenStrokeProjectTitle}
					/>
			</div>
			<div className={styles.farmerInfo}>
				{ project.message ?
					<div className={styles.farmerMessage}>
						<h1>Le mot de {project.name}</h1>
						<p>"{project.message}"</p>
					</div>
					:
					<div className={styles.farmerMessage}>
						<h1>Le souhait de {project.name}</h1>
						<p>{project.farmerWishes}</p>
					</div>
				}
				<div className={styles.locationMapImageContainer}>
					<FetchImage
						imageName={project.locationPicture}
						alt='Carte de france indiquant la localisation de la parcelle'
						width={217}
						height={217}
						className={styles.locationMapImage}
						/>
				</div>
			</div> {/** farmerInfoEnd */}
			<div className={styles.locationText}>
				<p>{`${project.district} (${project.districtNumber})`}</p>
			</div>
			<div className={styles.locationMobileDeviceContainer}>
				<p>{`${project.district} (${project.districtNumber})`}</p>
				<div className={styles.locationMapImageMobileDeviceContainer}>
					<FetchImage
						imageName={project.locationPicture}
						alt='Carte de france indiquant la localisation de la parcelle'
						width={217}
						height={217}
						className={styles.locationMapImageMobileDevice}
						/>
				</div>
			</div> {/** locationMobileDeviceContainerEnd */}
			<div className={styles.parcelInfo}>
				<h2>Plantation d’arbres fruitiers sur ses parcelles.</h2>
				<div className={styles.treeKindContainer}>
					{
						project.treeTypes.map((element, index) => {
							return (<TreeKindElement key={index} className={styles.treeKindElement} kind={element}/>)
						})
					}
				</div>
				<ProjectSteps steps={project.steps} className={styles.steps}/>
				<div className={styles.agroforestryLinkContainer}>
					<div className={styles.agroforestryLink}>
						<Link href={'/agroforestry'}>
							<p ref={agroLinkRef}>{'-> En savoir + sur l\'agro-foresterie'}</p>
						</Link>
					</div>
				</div>
				<h1 className={styles.parcelImagesTitle}>Les photos de la ferme :</h1>
				<div className={styles.picturesCarouselContainer}>
					{
						project.pictures.map((imageName, index) => {
							return (
								<FetchImage
									imageName={imageName}
									alt={`Photo prise par ${project.name}`}
									width={420}
									height={279}
									key={index}
									className={styles.pictureCarousel}
									/>
							)
						})
					}
				</div>
				<div className={styles.contactContainer}>
					<div className={styles.contactTextContainer}>
						<h1>Ce projet vous intéresse ?</h1>
						<h2>Prenons le temps d’en parler.</h2>	
					</div>
					<div className={styles.contactBoxContainer}>
						<p>Laissez-nous un message ici...</p>
						<div className={styles.contactBoxNested}>
							<Link href={'/contactUs'}>
								<button>
									{'->Envoyer'}
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div> {/** parcelInfoEnd */}
		</section> {/** sectionTwoEnd */}
		<Footer className={styles.footer} isGreen={true} />
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
	const { data } = await axiosInstance.request({
		method: 'GET',
		url: backendUrl.getUrl('projects/one'),
		params: {
			id
		}
	})
	console.log(data)
	return {
		props: {
			project: data,
			accessToken
		}
	}
}