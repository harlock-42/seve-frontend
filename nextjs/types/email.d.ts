export interface EmailType {
    from: string
    to: string
    subject: string
    text: string
}

interface ReceiveEmailInputType {
	from: string
	name: string
	company?: string
	text: string
}