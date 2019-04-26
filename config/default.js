require("dotenv").config();

const settings = {
    port: process.env.API_USER || 8042,
    urlRoot: process.env.API_GRAPHQL_ROUTE || '/graph',
    debug: true,
    db: {
        user: process.env.DB_USER || null,
        password: process.env.DB_PASSWORD || null,
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || null,
        database: process.env.DB_DATABASE || null,
    },
    elastic: {
        host: process.env.ES_HOST || null,
        port: process.env.ES_PORT || null,
    }
};

module.exports = {
    ...settings
}

console.log(settings)
console.log(process.env)