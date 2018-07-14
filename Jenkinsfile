#!/usr/bin/env groovy

@Library('devops/pipeline-shared-library@v1-latest') _

/**
 * We've condensed the common pipeline into a single method call to fulfill the needs
 * of many teams. That configuration is below. You may require a different pipeline.
 * If you choose to break away from the single method call, please copy in and modify
 * the contents of the Jenkinsfile in the following link. By using it as as starting point,
 * you get several important procedures that all apps need:
 * https://github.homeawaycorp.com/DevOps/jenkinsfile-examples/blob/master/node/application/_Jenkinsfile
 */

defaultNodeAppPipeline(
    gitOrg: "hau",
    gitRepo: "mbernal-hau-helloworld-ui",
    cdnDir: "build/static/cdn", // Directory where you build files for the CDN
    cdnNamespace: "mbernal-hau-helloworld-ui", // What directory, on the CDN, to publish your assets to
    autoGoLiveEnvs: ["test", "stage"], // Deploy and make live on the following envs
    runSeleniumTests: false, // Run your selenium tests
    schedule: "@never" // Run build on a schedule. "@daily" for example

    // For all options, see:
    // https://github.homeawaycorp.com/DevOps/pipeline-shared-library#defaultnodeapppipeline
)
