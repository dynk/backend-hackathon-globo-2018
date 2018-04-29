function get(){
    const domains = {
        blacklisted: [
            '.snopes.',
            '.lifehacker.',
            '.gizmodo.',
            'oantagonista.',
            'forum.',
            'blog.',
            'yahoo.'
        ],
        official: [
            'routers.',
            'twitter.'
        ],
        verified: [
            'google.',
            '.cnn.',
            '.nbc.',
            '.fox.',
            '.bbc.',
            'globo.',
            'veja.abril',
            'exame.abril',
            'otempo.',
            'uol.',
            'kaskus.',
            'liveinternet.'
        ]  
    }
    return Promise.resolve(domains);
}

module.exports = {
    get
}

