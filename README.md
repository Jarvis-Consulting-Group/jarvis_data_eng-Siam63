# Introduction
The purpose of this project was to create a Linux Monitoring Agent that retreives and records the hardware specifications and resource usage data from the user, stores it into a database, and records the data into a log file every minute, automatically. The data is stored in a RDBMS written in PostgreSQL. The users of this project is the Jarvis Linux Cluster Administration. They are responsible for monitoring and managing the clusering agent. 

# Technologies
- PostgreSQL 
- GIT/GitHub
- Bash
- Docker
- General Linux Commands

# Quick Start
Provision a PSQL instance using Docker Script:

```
#use centos user
su centos

#start docker if docker server is not running
#what is `||`???
sudo systemctl status docker || sudo systemctl start docker

#get latest postgres image
#Computer analogy, this cmd downloads a psql CD
docker pull postgres

#create a new volume if not exist
#analogy: buy a harddrive
# volume -> stores the data that we have on our docker container and saves it for later use
docker volume create pgdata

#psql docker docs https://hub.docker.com/_/postgres
#set password for default user `postgres`
export PGPASSWORD='password'

#create a container using psql image with name=jrvs-psql
#analogy: install psql CD to a computer with name=jrvs-psql
docker run --name jrvs-psql -e POSTGRES_PASSWORD=$PGPASSWORD -d -v pgdata:/var/lib/postgresql/data -p 5432:5432 postgres:9.6-alpine

#check if the container `jrvs-psql` is created or not
#check if the computer `jrvs-psql` is installed or not
docker container ls -a -f name=jrvs-psql

#check if `jrvs-psql` container is running
#analogy: check `jrvs-psql` is powered on
docker ps -f name=jrvs-psql

#start/stop a container
#analogy: shutdown and turn on `jrvs-psql` computer
docker container stop jrvs-psql
docker container start jrvs-psql

#remove container (this doesn't remove your image)
# container -> runtime instance of a Docker image that gets created when the 
# '$ docker run command' is implemented
# docker image -> read-only immutable template that defines how a container 
# will be realized
#destroy the computer (you still have your CD and harddrive)
docker container rm jrvs-psql

```

PSQL CLI Client Tool:

```
#make sure the container is running
#analogy: the computer is running
docker ps -f name=jrvs-psql

#install psql CLI client
sudo yum install -y postgresql

#set password for default user `postgres`
#doc: https://www.postgresql.org/docs/9.3/libpq-envars.html
export PGPASSWORD='password'

#Connect to psql instance uing psql REPL (read–eval–print loop)
psql -h localhost -U postgres -d postgres -W

#show all databases
postgres=# \l
```

Common CLI Commands for Script Usage:
```
#connect to a psql instance

#connect to a specific database
psql -h HOST_NAME -p 5432 -U USER_NAME -d DB_NAME

#connect to a psql instance without prompting password (you need to understand what's a environment variable)
export PGPASSWORD=USER_PASSWORD
psql -h HOST_NAME -p 5432 -U USER_NAME -d DB_NAME

#execute a sql file
psql -h HOST_NAME -p 5432 -U USER_NAME -d DB_NAME -f FILE_NAME.sql

#execute a sql statment
psql -h HOST_NAME -p 5432 -U USER_NAME -d DB_NAME -c FILE_NAME.sql
```

Script Usage:

```
# script usage
./scripts/psql_docker.sh start|stop|create [db_username][db_password]

# examples
## create a psql docker container with the given username and password.
## print error message if username or password is not given
## print error message if the container is already created
./scripts/psql_docker.sh create db_username db_password

## start the stoped psql docker container
## print error message if the container is not created
./scripts/psql_docker.sh start

## stop the running psql docker container
## print error message if the container is not created
./scripts/psql_docker.sh stop
```

Create Tables using the ddl.sql Script:

```
psql -h [psql_host] -U [psql_user] -d [db_name] -f sql/ddl.sql
```

Insert hardware specifications and hardware usage data into PSQL:

```
./scripts/host_info.sh [psql_host] [psql_port] [db_name] [psql_user] [psql_password]

./scripts/host_usage.sh [psql_host] [psql_port] [db_name] [psql_user] [psql_password]
```

Crontab Setup

```
#edit crontab jobs
bash > crontab -e

#execute host_usage.sh every minute (add this to crontab)
* * * * * bash [path of host_usage.sh] [psql_host] [psql_port] [db_name] [psql_user] [psql_password] > [log_file]
```

# Implementation Steps

1. Setup our IDE on the Linux server
2. Create a PostgreSQL instance using Docker
3. Create the psql_docker.sh feature, and implement the script in order to create the PSQL Docker container and ensure it is running correctly
4. Create the PostgreSQL database
5. Create the ddl.sql script in order to create a table to have our information stored in (Schema)
6. Implement the host_info.sh and host_usage.sh scripts 
7. Automate the host_usage.sh bash file using Crontab

# Scripts and Script Usage

1. psql_docker.sh - creates the psql docker container with the given username, password, port number etc 
2. host_info.sh - collects data regarding the hardware specs on the user's system. In order to run, it **only** accepts 5 arguments: psql host, port number, database name, psql username, psql password
3. host_usage.sh - collects data regarding server usage. In order to run, it **only** accepts 5 arguments: psql host, port number, database name, psql username, and psql password
4. crontab file - automate the host_usage.sh file to run every minute

# Database Modelling

host_info:

| Name | Data Type |
| --- | --- |
| id | SERIAL NOT NULL |
| hostname | VARCHAR NOT NULL |
| cpu_number | INT2 NOT NULL |
| cpu_architecture | VARCHAR NOT NULL |
| cpu_model | VARCHAR NOT NULL |
| cpu_mhz | FLOA8 NOT NULL |
| l2_cache | 301 INT4 NOT NULL|
| "timestamp" | TIMESTAMP NULL |
| total_mem | INT4 NULL |

Constraint: host_info_pk PRIMARY KEY (id)
Constraint: host_info_un UNIQUE (hostname)

host_usage:

| Name | Data Type |
| --- | --- |
| "timestamp" | TIMESTAMP NOT NULL |
| host_id | SERIAL NOT NULL |
| memory_free | INT4 NOT NULL |
| cpu_idel | INT2 NOT NULL |
| cpu_kernel | INT2 NOT NULL |
| disk_io | INT4 NOT NULL |
| disk_available | INT4 NOT NULL|

CONSTRAINT host_usage_host_info_fk FOREIGN KEY (host_id) REFERENCES host_info(id) 

# Test & Deployment

```
# Test psql_docker.sh (by checking if the jrvs-psql container has been created)
docker container ls -a -f name=jrvs-psql
# Test psql_docker.sh (by checking if the jrvs-psql container is running)
docker ps -f name=jrvs-psql
# Test host_info.sh (by checking the content of the host_info database)
SELECT * FROM host_info;
# Test host_usage.sh (by checking the content of the host_usage database)
SELECT * FROM host_usage;
```

In order to deploy the app, we need to have the code, docker installed, create a PSQL docker instance, create the corresponding tables in ddl.sql, retreive the information regarding hardware specifications and usage data, then automate the application using crontab.

# Improvements
1. Handle hardware updates
2. Monitor memory used by the Crontab
