import styles from "@/styles/agroforestry/agroforestry.module.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import agro from '@/public/images/agroforestry-parcel.jpg'
import driedRiver from '@/public/images/dried-river.jpg'
import healthyParcel from '@/public/images/healthy-parcel.jpg'
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { GetServerSidePropsContext } from "next"
import nookies from 'nookies'
import Head from "next/head"

interface AgroforestryProps {
	accessToken: string | null
}

export default function handler({ accessToken }: AgroforestryProps) {
	const [isTextOneVisible, setIsTextOneVisible] = useState<boolean>(false)
	const [isTextTwoVisible, setIsTextTwoVisible] = useState<boolean>(false)
	const [isTextThreeVisible, setIsTextThreeVisible] = useState<boolean>(false)
	const [isTextFourVisible, setIsTextFourVisible] = useState<boolean>(false)
	return (<>
		<Head>
			<title>L'agroforesterie</title>
			<link rel="icon" href="/icons/seve-logo-page.png" type='image/png'/>
		</Head>
		<Navbar accessToken={accessToken} isGreen={true}/>
		<h1 className={styles.agroforestryTitle}>L&apos;agroforesterie</h1>
		<section className={styles.main}>
			<div className={styles.subjectOne}>
				<div className={styles.imageContainer} onClick={() => setIsTextOneVisible(!isTextOneVisible)}>
					<Image
						src={agro}
						alt="Image d'une parcel agroforestiere"
						className={styles.image}
						/>
					<h1 className={styles.number}>1</h1>
					<div className={styles.titleTextContainer}>
						<h1 className={styles.title}>L&apos;agroforesterie ?</h1>
							<div className={`${styles.circle} ${isTextOneVisible ? styles.rotated : ""}`}>
								<p className={styles.arrow}>{'->'}</p>
							</div>
						<h3>{'L\'agroforesterie est une pratique agricole durable qui combine la culture des arbres avec celle des cultures ou de l\'élevage sur une même parcelle de terre. Elle vise à maximiser les bénéfices écologiques, économiques et sociaux tout en préservant les ressources naturelles.'}</h3>
					</div>
				</div>
			</div>
			{ isTextOneVisible &&
				<div className={styles.textContainer}>
					<p>Nous l&apos;avons vu précédemment, les arbres ont été retirés des parcelles afin de faciliter le développement de la monoculture. Cependant, ces choix ont perturbé l&apos;équilibre naturel qui existait et nuisent directement à la résilience de nos écosystèmes.</p>
					<p>En agroforesterie, les arbres sont plantés de manière stratégique pour créer des systèmes agro écologiques diversifiés. Ils peuvent être disposés en rangées, en haies, en îlots ou en associations avec les cultures. Les arbres fournissent une variété d&apos;avantages aux agriculteurs et à l&apos;environnement.</p>
					<p>Comme le dit l&apos;Association Française des arbres & haies champêtres en 2009, “L&apos;association des arbres aux activités agricoles, judicieusement organisée dans l&apos;espace et dans le temps, permet d’instaurer des relations de complémentarité. Un cycle se met en place entre les éléments du climat, de la biodiversité, du sol, de l’eau, les cultures, les animaux et les arbres, au bénéfice de la production et des paysages.”</p>
					<p>Pourquoi soutenir l&aposl;agroforesterie ?</p>
					<p>D&apos;un point de vue écologique, les arbres en agroforesterie contribuent à la conservation des sols en réduisant l&apos;érosion et en améliorant la fertilité. Leurs racines profondes aident à retenir l&apos;eau et à réguler les cycles hydrologiques. De plus, ils agissent comme des puits de carbone en absorbant le CO2 de l&apos;atmosphère, contribuant ainsi à atténuer le changement climatique.</p>
					<p>Du point de vue économique, l&apos;agroforesterie permet une utilisation plus efficace des ressources. Les arbres peuvent fournir du bois d'œuvre, du bois de chauffage, des fruits, des noix ou des produits forestiers non ligneux. Ces produits peuvent être vendus sur le marché, ce qui diversifie les sources de revenus des agriculteurs.</p>
					<p>Sur le plan social, l&apos;agroforesterie favorise la résilience des communautés rurales en améliorant la sécurité alimentaire. Les arbres fournissent de la nourriture, du fourrage pour le bétail et de l&apos;ombre pour les cultures sensibles à la chaleur. De plus, les systèmes agroforestiers peuvent favoriser la biodiversité en créant des habitats pour la faune et en préservant les corridors écologiques.</p>
					<p className={styles.noMarginBottom}>Pour plus d&apos;informations, rendez-vous sur</p>
					<Link href={'https://www.agroforesterie.fr/les-12-principes-de-lagroforesterie/'}>
						<p>https://www.agroforesterie.fr/les-12-principes-de-lagroforesterie/</p>
					</Link>
				</div>
			}

			<div className={styles.subjectTwo} onClick={() => setIsTextTwoVisible(!isTextTwoVisible)}>
				<div className={styles.imageContainer}>
					<Image
						src={driedRiver}
						alt="Image d'une parcel agroforestiere"
						className={styles.image}
						/>

					<h1 className={styles.number}>2</h1>
					<div className={styles.titleTextContainer}>
						<h1 className={styles.title}>Les maux de l&apos;agriculture</h1>
							<div className={`${styles.circle} ${isTextTwoVisible ? styles.rotated : ""}`}>
								<p className={styles.arrow}>{'->'}</p>
							</div>
						<h3>{'La mécanisation et la monoculture à grande échelle ont conduit à des problèmes tels que l\'utilisation excessive de produits chimiques, la diminution de la biodiversité, la pollution de l\'eau ou encore la dégradation des sols... '}</h3>
					</div>
				</div>
			</div>
			{ isTextTwoVisible &&
				<div className={styles.textContainer}>
					<p>Les insectes pollinisateurs, essentiels à la sécurité alimentaire, sont en déclin, tandis que les pratiques agricoles intensives épuisent les sols et entraînent une pollution environnementale. De plus, les agriculteurs font face à des difficultés financières, physiques et aux pressions du marché mondialisé. Cette situation souligne la nécessité de repenser notre approche agricole pour préserver l&apos;environnement et soutenir les agriculteurs.</p>
					<p>Notre système agricole moderne s&apos;est construit sur la mécanisation de l&apos;agriculture.</p>
					<p>Afin de faciliter l&apos;utilisation des engins à moteur sur les terres agricoles, l&apos;Homme s&apos;est orienté vers la fin de la diversification des cultures et l&apos;abattement des arbres érigés sur ses parcelles donnant ainsi naissance à la monoculture à grande échelle.</p>
					<p>La nature s&apos;est construite sur des associations d&apos;espèces animales et végétales afin de se prévenir des prédateurs, des catastrophes météorologiques et des maladies. Dans un écosystème résilient, l&apos;équilibre naturel ainsi construit permet aux espèces de résister à ces contraintes extérieures.</p>
					<p>La monoculture s&apos;oppose à cet équilibre naturel et se retrouve ainsi confronté à des faiblesses. Pour pallier ces faiblesses, notamment les maladies, les mauvaises herbes, les ravageurs et les insectes, l&apos;Homme s&apos;est appuyé sur le deuxième pilier de notre agriculture moderne: l&apos;industrie agrochimique. Ainsi, pesticides, insecticides, fongicides et herbicides ont fait leur apparition sur nos terres.</p>
					<p>Cela n&apos;est bien sûr pas sans conséquence.</p>
					<p>Les pesticides ont en effet permis d&apos;éloigner les ravageurs mais ont par la même occasion conduit à un effondrement de la biodiversité dans les milieux agricoles. Les insectes en sont les premières victimes et nous assistons à un déclin catastrophique: au cours des trente dernières années, 80% des insectes ont disparu des sols européens.Il s&apos;agit d&apos;une menace directe à notre système alimentaire. Aujourd'hui, 60% de notre alimentation provient des insectes pollinisateurs.</p>
					<p>Mauvaise gestion de l&apos;eau: utilisation excessive et pollution des nappes phréatiques.</p>
					<p>Pollution importante.</p>
					<p>Les végétaux ont besoin de nutriments, de soleil et d&apos;oxygène pour croître. Les plantes répondent à leurs besoins en puisant les nutriments du sol grâce, notamment, à leurs racines. Sauf que, l&apos;agriculture intensive ne laisse pas le temps aux sols de reconstituer ces nutriments. Ainsi, nous utilisons aujourd&apos;hui des engrais pour apporter aux cultures ce dont elles ont besoin. Cependant, au-delà de la pollution qui est engendrée par la production des engrais, l&apos;utilisation excessive de ces derniers empêche les plantes d&apos;absorber la totalité et le surplus se retrouve alors dans les lacs et les rivières. L&apos;impact de surplus d’azote ou de métaux dans les sols, les lacs et les rivières est considérable car il est à la source de la destruction d'environnements.</p>
					<p>Et nos agriculteurs sont en souffrance! Entre contraintes physiques, investissements massifs et difficultés du marché agricole mondialisé, les agriculteurs français peinent à se rémunérer à hauteur de leur travail. Le constat est alarmant: en 2022, 26% des agriculteurs vivaient en dessous du seuil de pauvreté.</p>
				</div>
			}

			<div className={styles.subjectThree} onClick={() => setIsTextThreeVisible(!isTextThreeVisible)}>
				<div className={styles.imageContainer}>
					<Image
						src={healthyParcel}
						alt="Image d'une parcel agroforestiere"
						className={styles.image}
						/>
					<h1 className={styles.number}>3</h1>
					<div className={styles.titleTextContainer}>
						<h1 className={styles.title}>Les bénéfices</h1>
							<div className={`${styles.circle} ${isTextThreeVisible ? styles.rotated : ""}`}>
								<span className={styles.arrow}>{'->'}</span>
							</div>
						<h3>{'L\'agroforesterie offre de nombreux avantages : une double source de revenue, l’effet brise-vent et l’effet parasol, la séquestration carbone, abris multiples et pollinisateurs favorisés, des sols plus riches et plus résistants...'}</h3>
					</div>
				</div>
			</div>

			{ isTextThreeVisible &&
				<div className={styles.textContainer}>
					<p>Les bénéfices sont multiples</p>
					<ol className={styles.list}>
						<li>Les bénéfices production: une double source de revenue</li>
						<li>Les bénéfices protecteurs: l&apos;effet brise-vent et l&apos;effet parasol</li>
						<li>Les bénéfices climatiques: la séquestration carbone</li>
						<li>Les bénéfices biodiversité: entre abris multiples et pollinisateurs favorisés + auxiliaires de culture</li>
						<li>Les bénéfices sols: des sols plus riches et plus résistants</li>
						<li>Les bénéfices hydraulique</li>
					</ol>
					<p>Les systèmes agroforestiers sont une aubaine pour les agriculteurs qui se voient offrir la possibilité de diversifier leurs revenus. En faisant appel à des conseillers en agroforesterie qui vont judicieusement concevoir l&apos;agencement entre les arbres et les cultures, il est possible de ne pas diminuer la production agricole tout en redécouvrant la production de bois.</p>
					<p>Les systèmes agroforestiers sont des systèmes fortement résilients. Et cela provient de caractéristiques protectrices de l&apos;arbre. Tout d&apos;abord, les experts agroforestiers réalisent une étude de l&apos;exposition des parcelles au vent et au soleil. Par des alignements et des placements réfléchis, l&apos;arbre a un effet brise-vent qui permet de protéger les cultures du dessèchement, du déracinement et du stress climatique. Par ailleurs, l’arbre apporte un effet parasol et apporte de l&apos;ombre aux cultures pour lutter contre les chaleurs estivales et l&apos;évaporation de l&apos;eau.</p>
					<p>Aujourd&apos;hui, l&apos;agroforesterie fait surtout couler de l&apos;encre pour son potentiel de séquestration carbone. En effet, les arbres ont un potentiel de stockage de carbone dans leur biomasse qui est décuplé lorsque ces derniers sont cultivés en agroforesterie. S&apos;engager en agroforesterie c&apos;est donc aussi contribuer à la séquestration du carbone à grande échelle.</p>
					<p>La biodiversité s&apos;avère être elle-aussi l&apos;une des grandes bénéficiaires de ces systèmes agro-écologiques durables. Déjà, les arbres se transforment en habitat favorable à l&apos;épanouissement de la faune et de la flore locales.</p>
					<p>Mais ce n&apos;est pas tout, l&apos;arbre permet de le grand retour des auxiliaires de culture, de la vie au sol et surtout des pollinisateurs. Ainsi, en plus de la préservation de la biodiversité, les cultures en bénéficient directement ce qui permet aux agriculteurs de diminuer la quantité de pesticides qu'ils utilisent tout en augmentant leur production.</p>
					<p>La qualité des sols et des ressources qu&apos;ils contiennent est essentielle à une agriculture saine et durable. L&apos;agroforesterie permet de bonifier les sols car les arbres, qualifiés de flore à racine profonde, agit comme une pompe à nutriment en puisant les éléments nutritifs en profondeur et en les apportant aux cultures agricoles dont les racines sont bien moins profondes.</p>
					<p>L&apos;agroforesterie est clé pour la gestion des ressources en eau sur les terres agricoles. Les racines des arbres augmentent la perméabilité des sols ce qui réduit l&apos;intensité des crue, les pollutions diffuses tout en permettant une meilleure infiltration de l&apos;eau dans les sols et donc une meilleure gestion de l&apos;eau, si essentielle au développement des cultures.</p>
				</div>
			}

			{/* <div className={styles.subjectFour} onClick={() => setIsTextFourVisible(!isTextFourVisible)}>
				<div className={styles.imageContainer}>
					<Image
						src={vinePlantation}
						alt="Image d'une parcel agroforestiere"
						className={styles.image}
						/>
					<h1 className={styles.number}>4</h1>
					<div className={styles.titleTextContainer}>
						<h1 className={styles.title}>Mener un projet</h1>
							<div className={`${styles.circle} ${isTextFourVisible ? styles.rotated : ""}`}>
								<p className={styles.arrow}>{'->'}</p>
							</div>
						<h3>{'C\'est bien plus que planter des arbres...'}</h3>
					</div>
				</div>
			</div>
			{ isTextFourVisible &&
				<div className={styles.textContainer}>
					<p>L&apos;agroforesterie est un système agro-écologique durable qui incorpore l&apos;arbre aux cultures agricoles mais dont l&apos;aménagement doit être judicieusement réalisé. Il est important pour les agriculteurs d&apos;être accompagnés dans leur transition vers l&apos;agroforesterie. Cet accompagnement est réalisé par des experts en agroforesterie dont le travail est d’analyser les projets de l’agriculteur, les points forts et les points faibles du terrain ainsi que les ressources présentes. Une fois la plantation réalisée, il est indispensable de suivre l’évolution de la croissance des arbres afin d’ajuster si besoin les choix réalisés.</p>
				</div>
			} */}
		</section>
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