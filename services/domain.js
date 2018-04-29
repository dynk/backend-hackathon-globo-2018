function get(){
    const domains = {
        blacklisted: [
            '.snopes.',
            '.lifehacker.',
            '.gizmodo.',
            'forum.',
            'blog.'
        ],
        official: [
            'routers.',
            'twitter.'
        ],
        verified: [
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

