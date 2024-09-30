import styles from "@/styles/components/Navbar.module.css"
import Image from "next/image"
import seveLogoWhite from "@/public/icons/seve-logo-white.svg"
import userIconWhite from "@/public/icons/user-logo-white.svg"
import seveLogoGreen from "@/public/icons/seve-logo-green.svg"
import userLogoGreen from "@/public/icons/user-icon-green.svg"
import DynamicBreadrumb from "./DynamicBreadcrumb"
import Link from "next/link"
import UserIcon from "./User/UserIcon"

interface NavbarProps {
	accessToken: string | null
	isGreen?: boolean
	activateBreadscumb?: boolean
}

export default function Navbar({accessToken, isGreen = false, activateBreadscumb = true}: NavbarProps) {
	return (<>
		<div className={styles.mainContainer}>
			<div className={styles.buttonsContainer}>
				<Link href={'/'}>
					<Image
						src={isGreen ? seveLogoGreen : seveLogoWhite}
						alt="Logo de seve en blanc"
						className={styles.logoImage}
					/>
				</Link>
				<nav className={styles.rightContainer}>
					<Link href={'/ourApproach'}><span className={`${isGreen ? styles.green : styles.white}`}>Notre démarche</span></Link>
					<Link href={'/projects'}><span className={`${isGreen ? styles.green : styles.white}`}>Nos projets</span></Link>
					<Link href={'/agroforestry'}><span className={isGreen ? styles.green : styles.white}>L&apos;agroforesterie</span></Link>
					<UserIcon accessToken={accessToken} isWhite={!isGreen}/>
                    
				</nav>
			</div>
		</div>
		{activateBreadscumb && isGreen && <DynamicBreadrumb className={styles.breadcrumb}/>}
	</>
	)
}