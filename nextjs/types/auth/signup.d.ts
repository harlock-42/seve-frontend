export interface addressType {
    streetNumber?: string,
    streetName?: string,
    zipCode?: string,
    city?: string
}

export interface SignupFormType {
    email?: string,
    companyName?: string,
    firstName: string,
    lastName: string,
    vatNumber: string,
    password?: string,
    address?: addressType
}