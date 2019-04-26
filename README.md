# CMS Utilization API

### The purpose of the project is to provide a GraphQL API to multiple data sources related to healthcare costs and services.

- [CMS-Utilization-DB](https://github.com/sudowing/cms-utilization-db)
- [CMS-Utilization-Search](https://github.com/sudowing/cms-utilization-search)
- [NPI Registry](https://npiregistry.cms.hhs.gov/)

The __[CMS-Utilization-DB](https://github.com/sudowing/cms-utilization-db)__ is a containerized PostgreSQL instance loaded with millions of records related to healthcare costs and services. Specifically, the database holds 2016 CMS Utilization & Payment Data , which is a data set published by the U.S. Centers for Medicare & Medicaid Services.

__[CMS-Utilization-Search](https://github.com/sudowing/cms-utilization-search)__ is a containerized ElasticSearch instance, seeded with records from the [CMS-Utilization-DB](https://github.com/sudowing/cms-utilization-db). This Elastic service powers the autocomplete, suggest and geo search features provided by this API.

The __[NPI Registry](https://npiregistry.cms.hhs.gov/)__, is a goverment API that provides access to physicians' National Provider Identifier (NPI) registration records.


---

##  <a id="table-of-contents"></a>Table of Contents

* [Quick Start](#quick-start)
* [API Documentation](#api-documentation)
* [Development](#development)
  * [Run Service](#dev-run-Service)
  * [Container Maintenance](#dev-container-maintenance)
  * [Generate DB Export](#dev-generate-db-export)
  * [Restore DB from Export](#dev-restore-db-from-export)
  * [Build & Load DB via ETL Process](#dev-full-etl-process)
  * [Container Entry Shortcut](#dev-container-entry-shortcut)
* [Versioning](#versioning)
* [License](#license)


---

##  <a id="quick-start"></a>Quick Start

Elasticsearch requires the ability to create many memory-mapped areas. [(Details Here)](https://www.elastic.co/guide/en/elasticsearch/reference/current/_maximum_map_count_check.html). Before you run Elastic and attempt to seed it with 2M+ records, run the following to set the `max_map_count` to the min amount required by Elastic.

```sh
# increase max_map_count
sysctl -w vm.max_map_count=262144
```

Once that's done, you can start and seed the Elastic instance:

```sh
#------------------
#   STARTS
#------------------
#   - local postgres
#   - elastic service
#   - containerized GraphQL API
#------------------

make start

# seed the elastic instance with precompiled records
make seed
```

This seeding process will take 45 mins (sample `time` report provided below) to complete on the first run. Subsequent starts rely on persistent data.

    :: real    42m58.263s
    :: user    0m0.884s
    :: sys     0m1.160s


The database & index setup processes are well detailed in their respective repos. If you have any issues, reference their respective readmes.


---

##  <a id="api-documentation"></a>API Documentation

The resources in this API are well documented. You can use a variety of methods to interact with this service, but we recomment the following:

- __[GraphQL Playground](http://0.0.0.0:8088/graph/)__ The GraphQL Playground provides a native API client and interactive schema inspectors -- so for anyone new to the service and the available resources -- this feature could be of some value.

- __[Insomnia API Client](https://insomnia.rest/)__ is an API client that offers great support for building out (and making) GraphQL service calls. The client is very similar to [Postman](https://www.getpostman.com/), but with better native support for GraphQL calls.

- __[Insomnia API Workplace Import](./docs/insomnia_cms-utilization-api.json)__ I've defined a comprehensive workplace that you can import into insomnia to get you started. The workplace includes simple GraphQL calls and more complex calls -- like combinations (page count & paginated records). Be sure to update the environment variables if you opt to run the service on a custom port or a non localhost machine.


---

##  <a id="development"></a>Development


```sh
# starts (and seeds) local postgres & elastic service
make run

# seed the elastic instance with precompiled records
make seed

# install nodemon (globally -- because it's awesome)
npm i -g nodemon

# install and run nodejs app via nodemon 
npm i
npm run watch

```


---

##  <a id="versioning"></a>Versioning

This project uses [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/sudowing/cms-utilization-api/tags). 

---

##  <a id="license"></a>License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

