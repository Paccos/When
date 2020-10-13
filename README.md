# When
Clear and easy meeting scheduling. Nothing else. 

This is the GitHub repository for the app [When](https://whenapp.herokuapp.com).

# Running locally

To run/test this project locally, please follow the following steps

## Installing dependencies

The app was built with .NET Core 3.1 as a backend which serves a React SPA as a Frontend. Therefore you need:

* .NET Core SDK ([Installation Instructions](https://dotnet.microsoft.com/learn/dotnet/hello-world-tutorial/install))
* Node.js ([Installation Instructions](https://nodejs.org/en/))
* (optional) PostgreSQL ([Installation Instructions](https://www.postgresql.org/download/))

For macOS/Linux, you might as well refer to [Homebrew](https://brew.sh)/your respective package manager to install these dependencies.

## Cloning and Running the Project

After you have installed all the necessary dependencies and cloned the project with `git clone https://github.com/Paccos/When.git`, you can run it using one of the following methods:

### a) Visual Studio

Simply start Visual Studio, open the `When.sln` file in the Project root and click "Run".

### b) `dotnet` CLI (macOS/Linux)

1. Navigate into the `When` project folder which is in the Project root
  
    ```cd $PATH_TO_REPO/When```
    
2. Run the project with the `dotnet` runtime
  
    ```dotnet run```
    
    
Both methods should install the necessary project dependencies (even the `npm` packages from the React app) on the first build and run the server. You can then access the React app in a browser of your choice with the URL:

```https://localhost:5001```
### (optional) Connecting to a Local Postgres Database

When uses an In-Memory-Database when the environment variable `$DATABASE_URL` is not set. This allows for quick prototyping without having to worry about installing/maintaining a local database only for testing purposes.

However, if you do want to provide a local Postgres database in order to test some database functions, you can provide such a URL to your local database as follows:

1. Construct URL from your database credentials and set environment variable:

   `export DATABASE_URL="postgres://<username>:<password>@localhost:5432/<database-name>"`

   _Assuming, that your Postgres server runs on port `5432` on your machine._

   The app will build a connection string from this URL and connect to your local database.

2. Run migrations to the local database:

   `dotnet ef database update`

   This will make EntityFramework create the necessary tables and relations in your local database. (`$DATABASE_URL` has to be set here as well!)

After that, you can run the app using the steps above and When will use your database as a persistent storage across restarts so that your data doesn't get lost.
