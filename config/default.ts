require("dotenv").config();

export default {
    port: 8088,
    urlRoot: '/graph',
    debug: true,
    db: {
        url: process.env.DB_URL || null,
    },
    elastic: {
        host: process.env.ES_HOST || null,
        port: process.env.ES_PORT || null,
    }
}
