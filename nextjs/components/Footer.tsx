import styles from '@/styles/components/Footer.module.css'
import Image from 'next/image'
import seveLogo from '@/public/icons/seve-logo-white.svg'
import insta from '@/public/icons/insta-icon-white.svg'
import linkedin from '@/public/icons/linkedIn-icon-white.svg'
import Link from 'next/link'
import linkedinGreen from '@/public/icons/linkedin-icon-green.svg'
import instaGreen from '@/public/icons/insta-icon.svg'

interface FooterProps {
	className?: string
	isGreen?: boolean
}

export default function Footer({className='', isGreen=false}: FooterProps) {
	return (<footer className={className}>
		{isGreen && <div className={styles.stroke}/>}
		<div className={styles.footerContainer}>
			<div className={styles.seveLogoContainer}>
				<div className={styles.seveLogoBackground}>
					<Image
						src={seveLogo}
						alt="Logo de seve blanc sur un fond vert"
						className={styles.seveLogo}
						/>
				</div>
				<p>© 2023 Sève</p>
			</div>
			<div className={styles.social}>
				<h4 className={isGreen ? styles.green : styles.white}>Nous suivre</h4>
				<Link href={'https://instagram.com/seve.france?igshid=YmMyMTA2M2Y='}>
					<Image
						src={isGreen ? instaGreen : insta}
						alt="Logo d'instagram blanc"
						className={styles.insta}
						/>
				</Link>
				<Link href={'https://www.linkedin.com/company/sevefr/?viewAsMember=true'}>
					<Image
						src={isGreen ? linkedinGreen : linkedin}
						alt="Logo de linkedin blanc"
						className={styles.linkedin}
						/>
				</Link>
				<h4 className={isGreen ? styles.green : styles.white}>On vous répond</h4>
				{/* <p className={isGreen ? styles.green : styles.white}>tel:</p> */}
				<Link href={"/contactUs"}>
					<p className={`styles.email ${isGreen ? styles.green : styles.white}`}>contact@seve-france.fr</p>
				</Link>
			</div>
		</div>
	</footer>)
}