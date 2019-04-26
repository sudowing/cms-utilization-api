require("dotenv").config();

const settings = {
    port: 8080,
    urlRoot: process.env.API_GRAPHQL_ROUTE || '/graph',
    debug: true,
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_DATABASE || 'govdata',
        user: process.env.DB_USER || 'dbuser',
        password: process.env.DB_PASSWORD || 'dbpassword',
    },
    elastic: {
        host: process.env.ES_HOST || 'localhost',
        port: process.env.ES_PORT || 9200,
    }
};

module.exports = {
    ...settings
}