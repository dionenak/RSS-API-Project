# RSS API project
A REST API in typescript for creating and updating your online content using an RSS feed.

### <u>Requirements</u>

Nodejs, Typescript and Yarn.


### <u>Structure</u>

- In `src` folder, there are:
  - `index.ts` including the instantiation of express app.
  - the `router` folder including the `api.ts` with the configuration of the routes.
  - the `controller` folder including functionality used inside routes, regarding creating and updating feed.
- `config` folder includes a file with the default parameters that can be accessed throughout the repository.
- In `package.json`, you can find project related information, such as name and dependencies.
- Folder `lib` includes the transpiled javascript files coming from the corresponding typescript files.

### <u>How to run the server</u>

In order to install all packages, you have to use:

```sh
yarn
```

Then, in order to run the server, you have to use:

```sh
yarn server
```

The website can be found in: [http://localhost:8080/](http://localhost:8080/) .


