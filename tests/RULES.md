## Test location rules

Unit tests should not be in this directory. Only over-arching tests, such as integration tests or Selenium tests.

Unit tests should be close to the file they are testing.

#### Basic rule

Create a `tests` folder within the folder that contains your code:

    utils
      ├─ tests
      |    ├─ util1.test.js
      |    ├─ util2.test.js
      |    └─ util3.test.js
      ├─ util1.js
      ├─ util2.js
      └─ util3.js

Same setup for a directory with a single js file, such as a react component:

    MyReactComponent
      ├─ tests
      |    └─ MyReactComponent.test.js
      ├─ MyReactComponent.js
      └─ MyReactComponent.less

In an informal poll of UI devs, the majority felt that the extra `tests` directory was more desirable then just having the `MyComponent.test.js` file in the root of the component. For one, it helps to visually separate it from the real code, and if there are additional supporting files for your test, you have a location to hold them. Another benefit is it keeps the rules on this page generic for all scenarios.

### Important

Tests are identified by the suffix `.test.js`. Mocha, our test runner looks for that suffix when running tests.

### Why this setup?

Placing tests close to the files they are testing has become quite popular and has several advantages. First, they are easy to find and you don't need two mirrored directory structures open to work on your tests. Second, you are less likely to forget to update or add new tests in the future. Third, if the time comes that you need to reorganize your application, your tests go along for the ride as you move directories around. Lastly, when importing code into your test, you don't need crazy relative path lookups, i.e. `../../../../../some/dir/code.js`
