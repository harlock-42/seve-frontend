const cookieExpiration: number = Number(process.env.COOKIE_EXPIRATION)

const cookieOptions = {
    maxAge: 60 * 60 * 24 * cookieExpiration
}