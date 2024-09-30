import Head from 'next/head'
import Image, { StaticImageData } from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Navbar from '@/components/Navbar'
import sdOne from '@/public/icons/sd-one-green.svg'
import sdThree from '@/public/icons/sd-three-green.svg'
import sdSix from '@/public/icons/sd-six-green.svg'
import sdHeight from '@/public/icons/sd-height-green.svg'
import sdTwelve from '@/public/icons/sd-twelve-green.svg'
import sdThirteen from '@/public/icons/sd-thirteen-green.svg'
import sdFiveteen from '@/public/icons/sd-fiveteen-green.svg'
import eye from '@/public/icons/green-eye.svg'
import hand from '@/public/icons/green-hand.svg'
import doubleHand from '@/public/icons/double-green-hand.svg'
import position from '@/public/icons/position-logo.svg'
import arrow from '@/public/icons/green-arrow.svg'
import stepsStroke from '@/public/icons/steps-yellow-stroke.svg'
import afafPicture from '@/public/images/agro-picture.jpg'
import background from '@/public/images/home-page-header-picture.jpg'
import afafLogo from '@/public/images/afaf-logo.svg'
import afafLogoWritten from '@/public/images/afaf-logo-written.svg'
import linkedinGreen from '@/public/icons/linkedin-icon-green.svg'
import instaGreen from '@/public/icons/insta-icon.svg'
import Footer from '@/components/Footer'
import Link from 'next/link'
import farmerStroke from '@/public/icons/farmer-yellow-stroke.svg'
import axiosInstance from '@/utils/axiosInstance'
import { EmailType, ProjectType } from '@/types'
import { useEffect, useRef, useState } from 'react'
import nookies from 'nookies'
import backendUrl from '@/utils/backendUrl'
import { useRouter } from 'next/router'
import { GetServerSidePropsContext } from 'next'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProjectsCarousel from '@/components/projects/ProjectsCarousel'
import stepOne from '@/public/images/step-one-home-page.jpg'
import stepTwo from '@/public/images/step-two-home-page.jpg'
import stepThree from '@/public/images/step-three-home-page.jpg'
import stepFour from '@/public/images/step-four-home-page.jpg'
import { AxiosError } from 'axios'
import { json } from 'stream/consumers'


const inter = Inter({ subsets: ['latin'] })

interface HomeProps {
	projects: ProjectType[]
	accessToken: string | null
}

export default function Home({ projects, accessToken }: HomeProps) {
	const router = useRouter()
	const [step, setStep] = useState<number>(0)
	const organizationSchema = {
		"@context": "http://schema.org",
		"@type": "Organization",
		"name": "Seve",
		"url": "https://www.seve-france.fr",
		"logo": "https://www.seve-france.com/icons/seve-logo-page.png",
		"description": "Seve permet aux entreprises de financer la transition agroforestière d'agriculteurs."
	}


	useEffect(() => {
		const error = localStorage.getItem('Error')
		if (error) {
			alert(error)
			localStorage.removeItem('Error')
		}
	}, [])
	
	function handleChangeStep() {
		if (step >= 3) {
			setStep(0)
		} else {
			setStep(step + 1)
		}
	}
	
	let stepImage: StaticImageData = stepOne
	let sdStepTitle: string = "Etape 1 : plantation"
	let sdStepDescription: string = "Des essences choisies en accord avec la culture et le terrain."
	switch (step) {
		case 1:
			stepImage = stepTwo
			sdStepTitle = "Etape 2 : protection des plants"
			sdStepDescription = "Grâce à un grillage pour éviter les collisons avec des animaux et assurer le maintien et la bonne pousse des plants."
			break
		case 2:
			stepImage = stepThree
			sdStepTitle = "Etape 3 : paillage"
			sdStepDescription = "Recouvrement du sol de paille pour créer une protection efficace et éviter d’abîmer la partie inférieure des plantes cultivées"
			break
		case 3:
			stepImage = stepFour
			sdStepTitle = "Etape 4 : taillage"
			sdStepDescription = "Tout au long de la pousse et de la vie des arbres et haies."
			break
	}
				
	return (<>
      <Head>
        <title>Sēve</title>
        <meta name="description" content="Seve : Accompagnant les entreprises dans le financement de la transition agroforestière des agriculteurs. Œuvrons ensemble pour une agriculture durable." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icons/seve-logo-page.png" type='image/png'/>
		<script type="application/ld+json">
			{JSON.stringify(organizationSchema)}
		</script>
      </Head>
      <main className={styles.main}>

		{/** *** HEADER *** */}

		<section className={styles.header}>
			<Image
				src={background}
				alt="deux agriculteurs en train de planter un arbuste"
				className={styles.farmersImage}
				/>
			<div className={styles.mainGradiant}/>
			<div className={styles.navbarGradiant}/>
			<Navbar accessToken={accessToken} />
			<div className={styles.headerTitleContainer}>
				<h1>Soutenez notre <span>
						agriculture
						<Image src={farmerStroke} alt="Soulignement d&apos;agriculteur en jaune" className={styles.farmerStrokeImage} />
					</span>
				</h1>
			</div>
		</section> {/** Header end */}
		
		{/** *** SUSTAINABLE DEVELOPMENT *** */}

		<section className={styles.sustainableGoalSection}>
			<div className={styles.sustainableGoalContainer}>

				<div className={styles.sdContainer}>
					<div className={styles.sdLeftContainer}>
						<h1>Un engagement pour<br/> une agriculture durable</h1>
						<p>L&apos;agroforesterie recouvre l&apos;ensemble des pratiques agricoles qui associent, sur une même parcelle, des arbres à une culture agricole ou de l&apos;élevage. Une bonne intégration des arbres en agriculture permet à la fois d&apos;augmenter la production, de diversifier les revenus et les services écologiques et d&apos;assurer la préservation et le renouvellement des ressources naturelles: l&apos;eau, les sols et leur fertilité, la biodiversité.</p>
						<div className={styles.sdImageContainer}>
							<Image src={sdOne} alt="" className={styles.sdImage}/>
							<Image src={sdThree} alt="" className={styles.sdImage}/>
							<Image src={sdSix} alt="" className={styles.sdImage}/>
							<Image src={sdHeight} alt="" className={styles.sdImage}/>
							<Image src={sdTwelve} alt="" className={styles.sdImage}/>
							<Image src={sdThirteen} alt="" className={styles.sdImage}/>
							<Image src={sdFiveteen} alt="" className={styles.sdImage}/>
						</div>
					</div> {/** sdLeftContainer end */}
					<div className={styles.sdRightContainer}>
						<div className={styles.sdStepImageContainer} onClick={handleChangeStep}>
							<Image
								src={stepImage}
								alt="image de 5 personnes en train de travailler en plein air."
								className={styles.sdImageFarmer}
								/>
							<svg className={styles.sdArrowSvg} xmlns="http://www.w3.org/2000/svg" width="22" height="39" viewBox="0 0 22 39" fill="none">
								<path d="M2 2L19.5 19.5L2 37" stroke="#BBE87E" strokeWidth="3"/>
							</svg>
							<h3>{sdStepTitle}</h3>
							<p>{sdStepDescription}</p>
							<Link href={'#'}>
								<p className={styles.sdAgroLink}>En savoir + sur l&apos;agro-foresterie</p>
							</Link>
						</div>
					</div> {/** sdRightContainerEnd */}
				</div> {/** sdContainer end */}
				<h1 className={styles.afafTransitionTitle}>... facilitée par un<br/>partenaire privilégié</h1>
			</div> {/**sustainableGoalContainerEnd */}
		</section> {/** sustainableGoal end */}

		{/** *** AFAF *** */}

		<section className={styles.afafSection}>
				<div className={styles.afafImageContainer}>
					<Image
						src={afafPicture}
						alt="Photo d'une parcelle agroforestiere avec des gens dessus"
						className={styles.afafPicture}
						/>
					<Image
						src={afafLogoWritten}
						alt="Logo de l'AFAF, avec ecrit agrpforesterie, association francaise"
						className={styles.afafLogoWritten}
						/>
				</div>
				<div className={styles.afafText}>
					<h1>L&apos;AFAF</h1>
					<h2>Association française d&apos;Agroforesterie</h2>
					<p>L&apos;AFAF conseille et épaule des agriculteurs en transition<br/> vers l&apos;agroforesterie.</p>
				</div>
		</section>

		{/** *** AFAF CONTACT *** */}

		<section className={styles.afafContact}>
			<p>Vous êtes agriculteur ?<br/>Vous avez un projet de transition en agroforesterie ?<br/>Vous êtes à la recherche de soutien et/ou de financement ?</p>
			<Link href={'https://www.agroforesterie.fr/contact/'}><button>{"-> Soumettez votre projet"}</button></Link>
			<Image
				src={afafLogo}
				alt="Logo de l'afaf"
				/>
		</section>


		{/* *** STEPS *** */}

		<div className={styles.steps}>
			<div className={styles.stepsPadding}>
				<div className={styles.stepsTitle}>
					<h1>Notre démarche...</h1>
					<Image
						src={stepsStroke}
						alt="ligne verte pour souligner le titre notre demarche"
						className={styles.stepsStroke}
						/>
				</div>
				<div className={styles.stepsContainer}>
					<div className={styles.stepsContainerContent}>
						<div className={styles.step}>
							<Image
								src={position}
								alt="une icone de position"
								className={styles.stepImageOne}
								/>
							<p className={styles.stepOneText}>Sélection de projets<br/> <span>locaux</span> et <span>traçables</span></p>
						</div>
						<Image
							src={arrow}
							alt="icone d'une fleche verte oriente vers la droite"
							className={styles.stepsArrowOne}
							/>
						<div className={styles.step}>
							<Image
								src={hand}
								alt="icone d'une main tenant une piece"
								className={styles.stepImageTwo}
								/>
							<p className={styles.stepTwoText}>Une plateforme de <span>financement<br/> de projets</span> projets agroforestiers</p>
						</div>
						<Image
							src={arrow}
							alt="icone d'une fleche verte oriente vers la droite"
							className={styles.stepsArrowTwo}
							/>
						<div className={styles.step}>
							<Image
								src={doubleHand}
								alt="icone d'une poigne de main"
								className={styles.stepImageThree}
								/>
							<p className={styles.stepThreeText}>Un engagement qui répond aux<br/> <span>Objectifs de Développement Durable<br/> de l&apos;ONU</span></p>
						</div>
						<Image
							src={arrow}
							alt="icone d'une fleche verte oriente vers la droite"
							className={styles.stepsArrowThree}
							/>
						<div className={styles.step}>
							<Image
								src={eye}
								alt="icone d'un eye"
								className={styles.stepImageFour}
								/>
							<p className={styles.stepFourText}>Un démarche RSE facilitée par<br/> un suivi <span>simple</span> et <span>transparent</span></p>
						</div>
					</div> {/** stepsContainerContaint end */}
					<Link href={'/ourApproach'}><button>{"-> Voir notre démarche complète"}</button></Link>
				</div> {/** stepsContainer end */}
			</div> {/** stepsPadding end */}
		</div> {/** steps end */}
		
		{/** *** PROJECTS *** */}

		<div className={styles.projects}>
				<h1>Ça bouge !</h1>
				<h2>Découvrez les projets<br/> d&apos;agriculteurs français</h2>
				<ProjectsCarousel projects={projects} />
				<div className={styles.projectsButtonContainer}>
					<Link href={'/projects'}><button>{"-> Voir tous nos projets"}</button></Link>
				</div>
		</div> {/** projects end */}


		{/** *** SEVE CONTACT *** */}

		<section className={styles.seveContact}>
			<div className={styles.seveContactContainer}>
				<div className={styles.seveContactText}>
					<h1>On prend le temps<br/>d&apos;en parler ?</h1>
					<p>{"Et restons en contact ;\)"}</p>
					<Link href={"https://instagram.com/seve.france?igshid=YmMyMTA2M2Y="}>
						<Image
							src={instaGreen}
							alt="Icone d'instagramme verte"
							className={`${styles.instaGreen} ${styles.seveContactSocialNetworkImage}`}
							/>
					</Link>
					<Link href={'https://www.linkedin.com/company/sevefr/?viewAsMember=true'}>
						<Image
							src={linkedinGreen}
							alt="Icone de linkedin verte"
							className={`${styles.linkedinGreen} ${styles.seveContactSocialNetworkImage}`}
							/>
					</Link>
				</div>
				<Link href={'/contactUs'}>
					<div className={styles.seveContactMessageBox}>
						<h3>Laissez-nous un message ici...</h3>
						<div className={styles.seveContactMessageBoxInput}/>
						<p>{"-> Envoyer"}</p>
					</div>
				</Link>
			</div> {/** seveContactText end */}
			<div className={styles.seveContactStroke} />
		</section>

		{/** FOOTER */}
		<div className={styles.footerContainer}>
			<Image
				src={background}
				alt="Image en grop plan de la terre agricole avec une botte d'agriculteur"
				className={styles.imageFooter}
				/>
			<Footer className={styles.footer} />
		</div>
      </main>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const cookies = nookies.get(context)
	const accessToken = cookies['accessToken'] ?? null
	const shouldRedirect = cookies['shouldRedirect']
	if (accessToken && shouldRedirect) {
		try {
			nookies.destroy(context, 'shouldRedirect',)
			const { data } = await axiosInstance.request({
				method: 'get',
				url: backendUrl.getUrl('companies/oneByJwtToken'),
				headers: {
					Cookie: `accessToken=${accessToken}`
				}
			})
			return {
				redirect: {
					destination: `/company`,
					permanent: false
				}
			}
		} catch (error: unknown) {
			const axiosError: AxiosError = error as AxiosError
			if (axiosError.response) {
				const { status } = axiosError.response
				if (status === 401) {
					nookies.set(context, 'accessToken', '', {
						maxAge: -1
					})
					nookies.set(context, 'shoulRedirect', '', {
						maxAge: -1
					})
				}
			}
		}
	}
	
	const response = await axiosInstance.get(backendUrl.getUrl('projects/many'), {
		params: {
			limit: 1000
		}
	})

	return {
		props: {
			projects: response.data,
			accessToken
		}
	}
}