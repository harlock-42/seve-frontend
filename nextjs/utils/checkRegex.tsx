export function isOnlyLetters(str: string): boolean {
    return /^[a-zA-Z]+$/.test(str)
}

export function isOnlyLettersAndSpaces(str: string): boolean {
    return /^[a-z\s]+$/.test(str)
}

export function isOnlyLettersAndHyphens(str: string): boolean {
    return /^[a-z\-]*$/.test(str)
}

export function isEmailValid(str: string): boolean {
    return /\S+@\S+\.\S+/.test(str)
}

export function isOnlyNumber(str: string): boolean {
    return /^[0-9]*$/.test(str)
}

export function hasLetter(str: string): boolean {
    return /[a-z]/.test(str)
}

export function hasUppercase(str: string): boolean {
    return /[A-Z]/.test(str)
}

export function hasNumber(str: string): boolean {
    return /[0-9]/.test(str)
}

export function isVatNumber(str: string): boolean {
    return /^[A-Za-z]{2}\d{10}$/.test(str)
}