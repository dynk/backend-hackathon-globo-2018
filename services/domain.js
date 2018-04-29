function get(){
    const domains = {
        oficial: [
            'routers.com',
            'twitter.com/RCMPAlberta'
        ],
        trusted: [
            'google.com',
            'cnn.com',
            'yahoo.com',
            'nbc.com',
            'fox.com',
            'bbc.com'
        ],
        blacklisted: [
            'snopes.com',
            'lifehacker.com',
            'gizmodo.com'
        ]
    }
    return Promise.resolve(domains);
}

module.exports = {
    get
}

