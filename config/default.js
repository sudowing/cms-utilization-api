require("dotenv").config();

const settings = {
    port: 8042,
    urlRoot: '/graph',
    debug: true,
    db: {
        url: process.env.DB_URL || null
    },
    elastic: {
        host: process.env.ES_HOST || null,
        port: process.env.ES_PORT || null
    }
};

module.exports = {
    ...settings
}
