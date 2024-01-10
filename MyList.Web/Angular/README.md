# MyList Angular

This front end is written in `Angular` and uses `Angular Material` for its component library and `PrimeFlex` for bootstrap. `NgTest` is used for testing all of the front end components.
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
cd .\MyList.Web\Angular
npm i
ng serve

http://localhost:4200/shopping-lists
```


## Running Tests

```cmd
cd .\MyList.Web
npm i
ng test
```
