# Introduction
(50-100 words)
Discuss the design of each app. What does the app do? What technologies have you used? (e.g. core java, libraries, lambda, IDE, docker, etc..)

The purppose of this project was to recreate the Linux GREP command, which essentially helps users search for words (Strings) in a file / folder or any other directory.
This was done completely in Java 8, and we made use of several lambda functions, different libraries like log4j, Scanner, Logger etc and many utility classes.
The application was also Dockerized on Docker, and pushed online to the docker hub where we can view the images.

Users of this application can be anyone who want to search files / folders for a specific string, making it easier for them to search for it automatically,
as opposed to doing it manually, which can be an extremely labourious task.

# Quick Start
How to use your apps? 

In order to make use of the project, we used the following command in our Command Line Interface:

```
docker run --rm -v `pwd`/data:/data -v `pwd`/log:/log ${docker_user}/grep .*Romeo.*Juliet.* /data /log/grep.out
```

#Implemenation
## Pseudocode
write `process` method pseudocode.

Process Method:

```
matchedLines = []
for file in listFilesRecursively(rootDir)
  for line in readLines(file)
      if containsPattern(line)
        matchedLines.add(line)
writeToFile(matchedLines)
```

## Performance Issue
(30-60 words)
Discuss the memory issue and how would you fix it
For our project, when using the following command, we would run into an error because there would be an out of memory error since the memory wasn't
sufficient enough to process the file:

```
java -Xms5m -Xmx5m -cp target/grep-1.0-SNAPSHOT.jar ca.jrvs.apps.grep.JavaGrepImp .*Romeo.*Juliet.* ./data ./out/grep.txt
```

In order to fix this issue, we altered the following value from `-Xms5m -Xmx5` to `-Xms8m -Xmx8` which is sufficient enough to run the large file.

# Test
How did you test your application manually? (e.g. prepare sample data, run some test cases manually, compare result)

In order to test our code, we used the compiler in IntelliJ in order to run our code and debug any issues that may have arised. For example, if there were
issues with importing packages into our application, IntelliJ would highlight the issue and provide a short description about the problem. We can then
further inspect the problem using IntelliJ's debug mode. Additionally, our code had many built-in error catching methods. The most notable one, of course,
being a try catch block which run the command(s) in the try clause, catches any errors and throws the error back at the user with a descriptive body.

# Deployment
How you dockerize your app for easier distribution?

In order to deploy our application, we made use of Docker and the following commands:

```
docker_user=your_docker_id
docker login -u ${docker_user} --password-stdin 

#Create dockerfile (make sure you understand all commands)
cat > Dockerfile << EOF
FROM openjdk:8-alpine
COPY target/grep*.jar /usr/local/app/grep/lib/grep.jar
ENTRYPOINT ["java","-jar","/usr/local/app/grep/lib/grep.jar"]
EOF

#Package your java app
mvn clean package
#build a new docker image locally
docker build -t ${docker_user}/grep .
#verify your image
docker image ls | grep "grep"
#run docker container (you must undertand all options)
docker run --rm \
-v `pwd`/data:/data -v `pwd`/log:/log \
${docker_user}/grep .*Romeo.*Juliet.* /data /log/grep.out

#push your image to Docker Hubg
docker push ${docker_user}/grep
```

# Improvement
List three things you can improve in this project.
1. Be able to automatically increase memory capacity based on the size of the input file given
2. Make use of faster libraries like StringBuilder, BufferedReader etc. Since the project requested we use Scanner, we could have improved the overall
efficiency of this by using a more "faster" approach.
