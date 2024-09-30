import styles from '@/styles/components/user/UserMenu.module.css'
import { SetStateAction } from "react";
import Link from 'next/link';
import { setCookie, destroyCookie } from 'nookies';
import { useRouter } from 'next/router';


interface UserMenuProps {
    onSwitch: (menu: SetStateAction<'signIn' | 'signUpOne' | 'signUpTwo' | 'signUpThree' | 'userMenu' | 'forgotPassword'>) => void;
    companyId: string
}

export default function UserMenu({ onSwitch, companyId }: UserMenuProps) {
    const router = useRouter()
    return (<>
        <div className={styles.container}>
            <h1 className={styles.title}>Mon compte</h1>
            <div className={styles.linksContainer}>
                <Link href={`/company`}>
                    <button className={styles.link}>Suivre mes projets</button>
                </Link>
                <Link href={`/company/settings`}>
                    <button className={styles.link}>Changer mes paramètres</button>
                </Link>
            </div>
            <div className={styles.disconexionContainer}>
            <button className={styles.disconexion} onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault()
                setCookie(null, 'accessToken', '', {
                    maxAge: -1,
                    path: '/'
                })
                setCookie(null, 'companyId', '', {
                    maxAge: -1,
                    path: '/'
                })
                onSwitch('signIn')
                router.push('/')
            }}>Se deconnecter</button>
            </div>
        </div> {/** containerEnd */}
    </>)
}