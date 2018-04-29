function get(){
    const domains = {
        verified: [
            '.esmaelmorais.',
            '.brasil247.'
        ],
        blacklist: [
            '.alljazeera.'
        ]
    }
    return Promise.resolve(domains);
}

module.exports = {
    get
}

