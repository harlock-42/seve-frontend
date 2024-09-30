import styles from "styles/components/project/projectSteps.module.css"
import Image, { StaticImageData } from "next/image"
import tree from '@/public/icons/projectSteps/greenTreeDarker.png'
import magnifyingGlass from '@/public/icons/projectSteps/magnifyingGlass.png'
import planing from '@/public/icons/projectSteps/planing.png'

interface GetIconProps {
    step: string
    className?: string
}

function GetIcon({ step, className }: GetIconProps) {
    let imagePath: string = ''
    switch (step) {
        case "Etude technique":
            imagePath = '/icons/projectSteps/magnifyingGlass.png'
            break
        case "Plants et fournitures":
            imagePath = '/icons/projectSteps/planing.png'
            break
        case "Plantation":
            imagePath = '/icons/projectSteps/greenTreeDarker.png'
            break
    }
    const image: StaticImageData = {
        src: imagePath,
        width: 27,
        height: 28
    }
    return (<Image
        src={image}
        alt=""
        className={className}
    />)
}

interface ProjectStepsProps {
    className?: string
    steps: string[]
}

export default function ProjectSteps({ className, steps }: ProjectStepsProps ) {
    const nbSteps: number = steps.length
    return (<div className={className}>
        <div className={styles.firstStep}>
            <GetIcon step={steps[0]} className={styles.icon} />
            <p className={styles.text}>{steps[0]}</p>
            { nbSteps > 1 &&
                <div className={styles.secondStep}>
                    <GetIcon step={steps[1]} className={styles.icon} />
                    <p className={styles.text}>{steps[1]}</p>
                    {
                        nbSteps > 2 &&
                        <div className={styles.thirdStep}>
                            <GetIcon step={steps[2]} className={styles.icon} />
                            <p className={styles.text}>{steps[2]}</p>
                        </div>
                    }
                </div>
            }
        </div>
    </div>)
}