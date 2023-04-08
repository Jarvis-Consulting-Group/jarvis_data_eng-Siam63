#!/bin/bash

# Assign CLI arguments to variables
psql_host=$1
psql_port=$2
db_name=$3
psql_user=$4
psql_password=$5

#Check # of args, if =/ 5, wrong number of arguments
if [ "$#" -ne 5 ]; then
    echo "Illegal number of parameters"
    exit 1
fi

#Save machine statistics in MB and current machine hostname to variables
vmstat_mb=$(vmstat --unit M)
hostname=$(hostname -f)

#Retrieve hardware specification variables
#xargs is a trick to trim leading and trailing white spaces
memory_free=$(echo "$vmstat_mb" | awk '{print $4}'| tail -n1 | xargs)

#cpu_idle=$(echo "$vmstat_mb" #todo
cpu_idle=$(echo "$vmstat_mb" | tail -1 | awk -v col="15" '{print $col}' | xargs)

#cpu_kernel=$(echo "$vmstat_mb" #todo
cpu_kernel=$(echo "$vmstat_mb" | tail -1 | awk -v col="14" '{print $col}' | xargs)

#disk_io=$(vmstat -d | awk '{print $10}' #todo
disk_io=$(vmstat -d | tail -1 | awk -v col="10" '{print $col}' | xargs)

#disk_available=$(df -BM / ...
disk_available=$(df -BM / | tail -1 | awk -v col="4" '{print $col}' | xargs)

#Current time in `2019-11-26 14:40:19` UTC format
#timestamp=$(vmstat -t | awk #todo
timestamp=$(date '+%Y-%m-%d %H:%M:%S' | xargs)

#Subquery to find matching id in host_info table
host_id="(SELECT id FROM host_info WHERE hostname='$hostname')";

#PSQL command: Inserts server usage data into host_usage table
#Note: be careful with double and single quotes
insert_stmt="INSERT INTO host_usage(timestamp, host_id, memory_free, cpu_idle, cpu_kernel, disk_io, disk_available)
SELECT '$timestamp', '$host_id', '$memory_free', '$cpu_idle', '$cpu_kernel', '$disk_io', '$disk_available'
FROM host_info
WHERE host_info.hostname='$psql_host'";

#set up env var for pql cmd
export PGPASSWORD=$psql_password
#Insert date into a database
psql -h $psql_host -p $psql_port -d $db_name -U $psql_user -c "$insert_stmt"
exit $?
