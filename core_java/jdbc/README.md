# Introduction

The purpose of this project was to create a Java application that uses the JDBC API to connect to and interact with a PSQL (PostgreSQL) database. 
We implemented simple CRUD operations such as Create, Read, Update and Delete, in order to facilitate data manipulation in our PSQL database.
Docker was used in order to create a docker container image which runs PSQL. Once a connection was established between Java and PSQL, we then created
the CRUD operations and verified our solution by looking at our database. We imported various "dummy" or default values into the table and performed
CRUD operations on them. We verified by doing a SELECT statement with a WHERE clause specifying which ID to look for. Maven was used in order to
create and manage several dependencies.

# Implementation
## ERDs

The Entity Relationship Diagram for this project can be viewed here: https://imgur.com/a/LTHs6T5

## Design Patterns
DAO (Data Access Object) and Repository are design patterns used in Software Engineer / Development in order to separate the persistence layer 
(i.e., database operations) from the rest of the application. Both of these provide an abstraction between the application and the underlying data source.

The DAO pattern provides a way to encapsulate and abstract the details of data persistence by defining a standard interface for accessing data.
This allows us to perform CRUD operations including Create, Read, Update and Delete. The DAO pattern provides a simple way to switch between 
different data sources without affecting the rest of the application.

However, the Repository pattern is similar to DAO, but provides a higher-level abstraction of the data source. In a repository, the data source 
is treated as a collection of objects, and the repository provides a set of methods for querying and modifying the collection. 
The repository hides, in other words, abstracts away the details of how the data is stored and retrieved, and provides a way for the application 
to interact with the data.

Both patterns are used to provide a layer of abstraction between the application and the data source. By isolating the persistence layer from the 
rest of the application, it becomes easier to maintain, test, and develop the application over time.

## Testing
To verify the results of the Java application, manual testing was done within IntelliJ and the CLI (Command Line Interface). When checking to see
if the CRUD operations were correctly functioning, a simple SELECT statement with a WHERE clause and GROUP BY / ORDER BY was used to check if the
results were correct or not. 
