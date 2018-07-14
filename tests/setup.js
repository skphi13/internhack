const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

/**
 * Configuration for Unit tests
 *
 * This is executed from the gulpfile to create the necessary
 * environment for executing unit tests.
 */

// Configure new Enzyme Adapter
Enzyme.configure({adapter: new Adapter()});
