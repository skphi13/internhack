# mbernal-hau-helloworld-ui

* [Introduction](#introduction)
* [Maintainers](#maintainers)
* [Development](#development)
* [Build System](#build-system)
* [Further Reading](#further-reading)


## <a name="introduction"></a>Introduction
:warning: FIXME: Describe what this project does and why someone would use it.

## <a name="maintainers"></a>Maintainers
* Miguel Bernal <mbernal@homeaway.com>
  

## <a name="development"></a>Development

1. To start developing locally, clone the project:
    ```bash
    git clone git@github.homeawaycorp.com:hau/mbernal-hau-helloworld-ui.git
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Run the application
    ```bash
    npm start
    ```

3. Navigate to `localhost:8080`


### npm scripts (partial list)


Name              | Responsibility
----------------- | --------------------------------------------
`start`           | Used locally to run and develop the application. It runs the webpack and hapi servers in parallel and each will intellegently restart when a module is changed.
`start:server`    | If you are only developing server-side code, this will just run the server and restart with file changes.
`start:prodTest`  | Mimics production by statically building all assets, instead of relying on webpack's in-memory files. Runs with NODE_ENV=production
`test`            | Runs the full test suite: unit tests, coverage, eslint, stylelint
`test:unit`       | Runs the unit tests only
`test:unit:watch` | Same as above, but reruns on file changes
`build`           | This is the task that builds the final assets in the CI/CD pipeline. But you can run this locally to inspect the generated files in the `build` directory.



To see a complete list of `npm` scripts, use:

```bash
npm run
```

To check which dependencies are outdated, run:

```bash
npm outdated
```

### Browsing on External Devices

While running locally, there are security settings in place to lock down which hosts you may hit to view your server.  We have allowed `*.wvrgroup.internal` and `*.homeawaycorp.com` urls as `allowedHosts`.

#### To view on an external device (such as iPhone or iPad or colleagues computer on the VPN)

1. Add this line is in your `/etc/hosts` file:
    ```
    fe80::1%lo0     localhost
    ```
2. Next, type `hostname` in your console to get your box's hostname.  Use that hostname to build out your `wvrgroup.internal` url.  For example, if your hostname is `HA002779`, then your VPN accessible url would be: http://HA002779.wvrgroup.internal:8080/

    If you are frequently visiting this url, you may consider creating a ShortURL for ease of access via http://h.a/admin/



## <a name="build-system"></a>Build System

To understand the entire build system in all environments, please read through [BUILDSYSTEM.md](https://github.homeawaycorp.com/Catalyst/generator-catalyst-ui/blob/master/documentation/universalReact/build-system.md)


## <a name="further-reading"></a>Further Reading
* [Contributing](https://github.homeawaycorp.com/ui-development/information/blob/0.1.0/templates/CONTRIBUTING.md)
* [Continuous Integration](https://github.homeawaycorp.com/ui-development/information/blob/0.1.0/templates/CONTINUOUS_INTEGRATION.md)
* [Release Process](https://github.homeawaycorp.com/ui-development/information/blob/0.1.0/templates/RELEASE_PROCESS.md)
