import React, { ForwardedRef, Ref, forwardRef } from "react"
import styles from "@/styles/components/utils/inputForm/ChangePasswordInput.module.css"

interface Props {
    label: string
    labelName: string
    error: boolean
    setError: React.Dispatch<React.SetStateAction<boolean>>
    type: string
    className?: string
}

const handler = ({
    label, 
    labelName,
    error,
    setError,
    type='text',
    className=''
}: Props, ref: any) => {
    return (<>
        <div className={className}>
            <div className={styles.container}>
                <label htmlFor={label} className={styles.label}>{labelName}</label>
                <input
                    type={type}
                    id="password"
                    name="password"
                    ref={ref}
                    className={error ? styles.formInputError : styles.input}
                    onClick={(event) => {
                        event.preventDefault()
                        setError(false)
                    }}
                    />
            </div>
        </div>
    </>)
}

export default forwardRef(handler)