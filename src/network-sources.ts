import axios from "axios";
import * as config from "config";
import * as es from "elasticsearch";
import * as knex from "knex";

const dbUrl: string = config.get("db.url");

export const db = knex({ client: "pg", connection: dbUrl });

export const elasticsearch = new es.Client({
  host: "localhost:9200",
});

const validateStatus = (status: number) => {
  return status < 500;
};

export const npiRegistry = axios.create({
  baseURL: "https://npiregistry.cms.hhs.gov/api/",
  timeout: 1000,
  validateStatus,
});
