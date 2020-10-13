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
