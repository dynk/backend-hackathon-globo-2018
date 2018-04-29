function get(){
    const domains = {
        oficial: [
            '.routers.',
            '.twitter.'
        ],
        verified: [
            '.brasil247.',
            '.google.',
            '.cnn.',
            '.yahoo.',
            '.nbc.',
            '.fox.',
            '.bbc.'
        ],
        blacklisted: [
            '.snopes.',
            '.lifehacker.',
            '.gizmodo.'
        ]
    }
    return Promise.resolve(domains);
}

module.exports = {
    get
}

