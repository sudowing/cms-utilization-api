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

```sh
#------------------
#   STARTS
#------------------
#   - local postgres
#   - elastic service
#   - containerized nodejs app
#------------------

make start

# install and run nodejs app (GraphQL API Server)
npm i
npm run start


```

This seeding process will take 45 mins (sample `time` report provided below) to complete on the first run. Subsequent starts rely on persistent data.

    :: real    42m58.263s
    :: user    0m0.884s
    :: sys     0m1.160s


The database & index setup processes are well detailed in their respective repos. If you have any issues, reference their respective readmes.


---

##  <a id="api-documentation"></a>API Documentation

The resources in this API are well documented. You can use a variety of methods to interact with this service, but we recomment the following:

- __[GraphQL Playground](http://0.0.0.0:8088/graph/)__ is a postgres database that holds millions of records related to healthcare costs and services. The GraphQL Playground offers and interactive schema inspectors, so for anyone new to the service and the available resources -- this feature could be of some value.

- __[Insomnia API Client](https://insomnia.rest/)__ is an API client that offers great support for building out (and making) GraphQL service calls. The client is very similar to (Postman)[https://www.getpostman.com/], but with better nativ support for GraphQL calls.

- __[Insomnia API Workplace Import](https://insomnia.rest/)__ ...is an ElasticSearch Instance, seeded with records held the [CMS-Utilization-DB]((https://github.com/sudowing/cms-utilization-db)). This data source powers this APIs autocomplete, suggest and geo search features.



---

##  <a id="development"></a>Development


```sh
# starts (and seeds) local postgres & elastic service
make start

# install nodemon (globally -- because it's awesome)
npm i -g nodemon

# install and run nodejs app via nodemon
npm i
npm run watch

# install and run nodejs app (GraphQL API Server)
npm run start

```



---

##  <a id="versioning"></a>Versioning

This project uses [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/sudowing/cms-utilization-api/tags). 

---

##  <a id="license"></a>License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.