function get(){
    const domains = {
        official: [
            'routers.',
            'twitter.'
        ],
        verified: [
            'brasil247.',
            'google.',
            '.cnn.',
            'yahoo.',
            '.nbc.',
            '.fox.',
            '.bbc.',
            'globo.',
            'oantagonista.',
            'veja.abril',
            'exame.abril',
            'otempo.',
            'uol.'
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

