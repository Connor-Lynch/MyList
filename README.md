# MyList, A Simple Shopping List Manager
MyList is a simple web application that gives users the ability to keep track of multiple shopping list. User have the ability to create new shopping lists or simple manage and view existing lists.

## Browser
![Shopping Lists](./assets/shoppingLists.png)

![Shopping Lists](./assets/shoppingList.png)

## Mobile
![Shopping Lists](./assets/shoppingLists_mobile.png)

![Shopping Lists](./assets/shoppingList_mobile.png)
# FrontEnd

The front end for this project is written in `Angular` and uses `Angular Material` for its bootstrap. `NgTest` is used for testing all of the front end components.
```
[]src
|
|--[]app
|   |-- []components
|   |    |-- Common components and can be used anywhere in the application
|   |    `-- []models
|   |         `-- Interfaces specific to component
|   |-- []models
|   |    `-- Interface for data mapping
|   |-- []pages
|   |    |-- Web pages that are in the main routing module
|   |    `-- []components
|   |         `-- Components that are used only on this page
|   |-- []services
|   |    `-- Services that handle external communication
|   |-- []test
|        |-- Common code shared for testing
|        `-- []builders
|             `-- Builders that dynamically create interfaces for testing
`-- appSetting.json
    `-- Environment specific configurations
```

## Starting the FrontEnd

```cmd
cd .\MyList.Web
npm i
ng serve

http://localhost:4200/shopping-lists
```

# BackEnd

The back end for this project is a `.net core 3.1` web api that uses `Entity Framework Core` to manage its persistence. The project is architected using the mediator pattern.

## Project Structure

### *MyList.Api*

This is the main web api that hosts the controllers that interface the whole back end.  The controllers construct `MediatR` requests that are sent off and handled further down in the system.

### *MyList.Requests*

This project contains all of the `MediatR` requests and commands. The requests are `MediatR` actions that do not alter state and the commands are actions that do.

### *MyList.Handlers*

This project contains all of the `MediatR` request handlers. A request handler is scoped to a single request type that it is configured to handle. In this application they simply call to the data repository to retrieve or update entities.

### *MyList.Handlers.Tests*

This is a `msTest` project that unit tests all of the handlers. It uses `AutoMoq` and `Moq` to mock test dependencies.

### *MyList.Data.Repository*

This project contains the `Entity Framework` repositories that are responsible for managing entity state.

### *MyList.Data.Repository.Tests*

This is a `msTest` project that unit tests all the repositories. In order to facilitate the unit testing, it creates an in-memory `dbContext` to more accurately test database communication.

### *MyList.Data.Database*

This project contains the `Entity Framework` dbContext and houses all database migrations.

### *MyList.Entities*

This project contains all of the data models and interfaces used throughout the rest of the solution.

## Start the BackEnd 
```
1. Build the solution
2. Set MyList.Api as the startup project
3. Open the package manager console
4. Set MyList.Database as the Default Project
5. Update-Database
5. Start MyList.Api

// Swagger is configured to interact with the API directly
https://localhost:44321/swagger/index.html
```