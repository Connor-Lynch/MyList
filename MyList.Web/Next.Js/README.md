# MyList React(Next JS)

This front end is written in `NextJS` and uses `tailwindcss` for bootstrap.
```
[]app
|-- []lib
|   |   `-- Contains global actions, services, and models
|   |-- []actions
|   |   `-- Server side code that invokes services and ensures cache
|   |-- []services
|   |   `-- Services for calling out to external dependencies
|   |-- []models
|   |   `-- Global models that are shared
|   []page
|   |   ` -- Contains page.tsx and possibly loading.tsx, these are the main canvases for each page
|   |-- []id
|   |   `-- `id`` denotes that an `id` will be passed in the route.  The contents of this folder will be the same as the basic `page`
|   []ui
|   |   `-- Global styles and ui components
|   |-- []page
|   |   `-- Components used for that page
|   |   |-- []models
|   |   |   `-- Models used for the components in the folder
```

## Starting the FrontEnd

```cmd
cd .\MyList.Web\Next.Js
npm i
npm run start

http://localhost:3000/shopping-lists
```