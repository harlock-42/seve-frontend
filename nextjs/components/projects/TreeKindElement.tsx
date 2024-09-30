import styles from '@/styles/components/project/TreeKindElement.module.css'
import { StaticImageData } from 'next/image'
import Image from 'next/image'

interface TreeKindElementProps {
    className?: string
    kind: string
}

export default function TreeKindElement({ className, kind }: TreeKindElementProps) {
    let imagePath: string = ""

    switch(kind) {
        case "abeilla grandiflora":
            imagePath = '/images/treeKind/abeillaGrandiflora.jpg'
            break
        case "glauca":
            imagePath = '/images/treeKind/blueRabbitbrush.jpg'
            break
        case "escallonia":
            imagePath = '/images/treeKind/escallonia.jpg'
            break
        case "figuier":
            imagePath = '/images/treeKind/figTree.jpg'
            break
        case "noisetier":
            imagePath = '/images/treeKind/hazel.jpg'
            break
        case "poirier":
            imagePath = '/images/treeKind/pearTree.jpg'
            break
        case "prunier":
            imagePath = '/images/treeKind/plumTree.jpg'
            break
        case "framboisier":
            imagePath = '/images/treeKind/raspberry.jpg'
            break
        case "caseillier":
            imagePath = '/images/treeKind/saskatoon.jpg'
            break
        case "myrtillier":
            imagePath = '/images/treeKind/bilberry.jpg'
            break
        case "coronille":
            imagePath = '/images/treeKind/scorpionVetch.jpg'
            break
        case "cerisier":
            imagePath = '/images/treeKind/cherryTree.jpg'
            break
        case "chêne vert":
            imagePath = '/images/treeKind/hollyOak.jpg'
            break
        case "hêtre":
            imagePath = '/images/treeKind/beech.jpg'
            break
        case "cormier":
            imagePath = '/images/treeKind/sorbTree.jpg'
            break
        case "frêne":
            imagePath = '/images/treeKind/ash.jpg'
            break
        case "févier d'amérique":
            imagePath = '/images/treeKind/kentuckyCoffeeTree.jpg'
            break
        case "houx":
            imagePath = '/images/treeKind/holly.jpg'
            break
        case "groseiller":
            imagePath = '/images/treeKind/currant.jpg'
            break
        case "noyer":
            imagePath = '/images/treeKind/walnut.jpg'
            break
        case "tilleul":
            imagePath = '/images/treeKind/linden.jpg'
            break
        case "érable":
            imagePath = '/images/treeKind/maple.jpg'
            break
        case "châtaignier":
            imagePath = '/images/treeKind/chestnut.jpg'
            break
        case "pommier":
            imagePath = '/images/treeKind/appleTree.jpg'
            break
        case "cogniassier":
            imagePath = '/images/treeKind/quince.jpg'
            break
        case "sureau":
            imagePath = '/images/treeKind/elder.jpg'
            break
        case "orme":
            imagePath = '/images/treeKind/elm.jpg'
            break
        case "laurier":
            imagePath = '/images/treeKind/bayLaurel.jpg'
            break
        case "mûrier blanc":
            imagePath = '/images/treeKind/whiteMulberry.jpg'
            break
        case "églantier":
            imagePath = '/images/treeKind/roseHip.jpg'
            break
                                                                
        default:
            imagePath = '/images/treeKind/abeillaGrandiflora.png'
    }
    const image: StaticImageData = {
        src: imagePath,
        width: 89,
        height: 89
    }

    return (<div className={className}>
        <Image 
            src={image}
            alt={kind}
            className={styles.image}
            />
        <h1 className={styles.title}>{kind}</h1>
    </div>)
}