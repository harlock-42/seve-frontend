class UrlGenerator {
    domain: string

    constructor(
        domain: string,
    ) {
        this.domain = domain
    }

    getUrl(args: string = ""): string {
        return this.domain + "/" + args
    }
}

export default UrlGenerator