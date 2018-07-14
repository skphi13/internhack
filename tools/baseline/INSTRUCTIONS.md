# Optimizing Baseline Filesize

When the application is built, the Baseline CSS files are generated from the LESS partials in the `@homeaway/baseline` node module. We do that for each of the themes that you need for your app.

You likely do not need all features of Baseline. It is adventageous to reduce the feature set in order to save a decent number of kilobytes.

In this directory, there is a `baseline-optimized.less' file that defines what features of Baseline you need. By default, it has all features. It is used to construct the final set of themed CSS files. This special less file is created by visiting: [baseline#optimize](https://github.homeawaycorp.com/pages/ui-toolkit/baseline/release/docs/gt/optimize.html)

On that page there are a series of checkboxes that you can turn on or off. When you've selected the appropriate features, download the file and overwrite the contents of the one here with its contents.

There is a second file, `baseline-config.json`. This file is used by the webpage above. The next time you go into that webpage to add or remove more features, you can upload this JSON file which will pre-select/deselect the features you chose the first time. It is recommended that you keep this file updated with the changes as well. It is in the zip file that is downloaded with the less file.