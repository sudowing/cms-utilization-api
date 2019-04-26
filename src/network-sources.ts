import axios from "axios";
import * as config from "config";
import * as es from "elasticsearch";
import * as knex from "knex";

const dbConfig: any = config.get("db");
const { user, password, host, port, database } = dbConfig;

const elasticConfig: any = config.get("elastic");
const { host: esHost, port: esPort } = elasticConfig;

const dbUrl = `${user}:${password}@${host}:${port}/${database}`;

export const db = knex({ client: "pg", connection: dbUrl });

export const elasticsearch = new es.Client({
  host: `${esHost}:${esPort}`,
});

const validateStatus = (status: number) => {
  return status < 500;
};

export const npiRegistry = axios.create({
  baseURL: "https://npiregistry.cms.hhs.gov/api/",
  timeout: 1000,
  validateStatus,
});
