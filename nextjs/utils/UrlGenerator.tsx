class UrlGenerator {
    domain: string
    protocol: string
    port: string

    constructor(
        domain: string,
        protocol: string,
        port: string
    ) {
        this.domain = domain,
        this.protocol = protocol,
        this.port = port
    }

    getUrl(args: string = ""): string {
        console.log("--> url: ", this.protocol + "://" + this.domain + ":" + this.port + "/" + args)
        return this.protocol + "://" + this.domain + ":" + this.port + "/" + args
    }
}

export default UrlGenerator