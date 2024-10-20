# Bigfoot.js Code Review

Overview
Bigfoot is a jQuery plugin that enhances footnotes by turning them into interactive popovers. The package uses jQuery 1.7+ and provides a clean user experience, especially useful in responsive designs. However, it’s currently incompatible with jQuery 3.0+, which is still an open issue on the repository.

## Architecture & Design Decisions

Bigfoot uses standard jQuery to identify footnotes and replace them with interactive buttons. The design focuses on accessibility, responsiveness, and cross-platform compatibility (with mobile/smaller screens in mind). Bigfoot also does not use or depend on extensive libraries, which means it is not only accessible, but also easily modifiable. As mentioned in class, Bigfoot has a progressive enhancement design, which means users can easily access the original contents with or without Javascript or other advanced features.

## Code Organization & Quality

### Source:

The core files of the project reside in the `src` directory, where the CoffeeScript code for the plugin resides. This raw source code is processed into the `dist` directory during the build process. The raw code is written in clean and readable style and every function is provided with annotation. The `dist` folder contains the production-ready JavaScript and CSS/Sass files that you can include in your projects. There are separate CSS/Sass files for each of the three primary footnote styles (default, bottom, numeric). Moreover, the `src/scss/base` directory contains CSS files for the footnote interface, the `src/scss/foundation` contains CSS files for content of the footnote. Alongside these, configuration files like `Gruntfile.coffee` (for task automation) and `package.json` (for project dependencies) help define and manage the build and development process.

### Patterns:

The plugin follows common patterns seen in jQuery plugins:

- **Encapsulation**: It wraps the functionality in an immediately invoked function expression (IIFE), isolating the plugin from the global namespace.

- **jQuery Plugin Pattern**: The plugin extends jQuery by adding itself as a method (e.g., $.bigfoot()), making it accessible throughout the jQuery instance

- **Event Handling**: The plugin relies heavily on jQuery’s .on() method for event binding, such as listening for user clicks to trigger popover footnotes. While this pattern has been seen before in jQuery, it’s not the best method for development as it doesn’t scale well compared to component-based approaches (like React or Vue) where state and interactions are more efficiently managed.

### Language:

The plugin is primarily written in CoffeeScript, which compiles to JavaScript. While CoffeeScript simplifies some syntax, it’s less commonly used today, making future maintenance harder unless the team is familiar with it. For stylesheets, Bigfoot utilizes a combination of CSS and Sass.

### Tooling:

- **Grunt:** The project uses Grunt for build automation, which is somewhat dated compared to newer tools like Webpack or Gulp. Grunt has advantages in that it has fewer requirements and easier configurations, but if the project gets larger and more complex, other tools might serve as better alternatives. This is largely because Grunt is a great task runner but not a good module bundler (like Webpack). As projects get larger, it generally gets increasingly difficult to bundle a wide variety of modules and manage numerous dependencies. Moreover, Grunt's configuration, which is managed by Gruntfile, can become challenging to maintain and scale because it is declarative, whereas Gulp and Webpack use a more dynamic and modularized approach.

- **Bower:** The project also uses Bower, but it is now often recommended to use Yarn or Vite instead. Bower has already been deprecated by its creators. Additionally, unlike npm, which offers the convenient feature of automatically installing a package's required dependencies, Bower lacks this capability, forcing users to manually specify which dependencies each package relies on. With Yarn, however, managing chained dependencies has become much simpler.

## Repo Organization & Quality

### README & Documentation:

The documentation is clear, detailing the installation process and configurable options. However, the lack of compatibility with modern jQuery versions (3.0+) should be more prominent. The dev README should also include instructions on how to get the app running for developers and a demo HTML file for anyone looking to see an example from the codebase. Moreover, the link to the project and demo page given in the README was collapsed and remained un-fixed.

### Tests:

There is no mention of unit tests, and no CI/CD integration. This makes the quality assurance process weaker, especially for production use. Additionally, a lack of unit tests causes decreased code quality in general and can reduce productivity in future teams working on this project.

### Issues & Activity:

The repository has open issues and one pending pull request, but it hasn’t been updated recently. This indicates a lack of active maintenance, which is a red flag for long-term adoption. This contributes to our final recommendation below.

## Recommendation: Use or Not?

I would not use this package without modifications due to:

1. **jQuery Dependency**: Modern web development has moved away from jQuery. Migrating to vanilla JavaScript or a more modern framework is advisable.

2. **Outdated Tools & Language**:CoffeeScript and Grunt are not widely used in modern projects.

3. **Lack of Support for jQuery 3.0+**: This limits compatibility with more recent jQuery projects.

4. **No Unit Tests/CI**: The absence of testing makes it difficult to ensure code quality in larger applications.

**Suggested Mitigations**:

1. **Rewrite in Vanilla JS/ES6+ (Medium Effort, 2–4 weeks)**: Replacing jQuery would improve performance and longevity.

2. **Migrate Build System (Low Effort, 1 week)**: Switch from Grunt to Webpack or Gulp for better build and optimization features.

3. **Add Unit Tests & CI (Medium Effort, 2 weeks)**: Adding a testing framework like Jest or Mocha would ensure better code coverage.

4. **Add Compatibility with jQuery 3.0+ (Low Effort, 1–2 weeks)**: Fix the incompatibility issues for broader usage.

## Changes made

Added unit test to bigfoot by using **jest**.

### About jest

Jest is a popular choice for conducting unit tests due to its comprehensive feature set, ease of use, and excellent performance. It offers built-in tools such as a test runner, assertion library, and test coverage reporting, making it a one-stop solution for JavaScript and TypeScript testing. Jest is highly efficient and optimized, enabling parallel test execution and isolating tests to ensure reliability. Its zero-configuration setup allows developers to start testing right away without the need for complex configurations. Additionally, Jest provides powerful mocking capabilities, which are essential for isolating units of code during testing. With its active community and extensive documentation, Jest simplifies the process of writing and maintaining unit tests, leading to more robust and maintainable codebases.

### Unit tests

We write a total of 15 test cases and conducted 11 differenct tests on bigfoot. We were able to acheive

- 60.81% statement coverage
- 43.06% branches coverage
- 64.58% function coverage
- 61.11% line coverage

![Alt text](6701729386893_.pic.jpg)

the test report can be found in https://github.com/Yashraj19/cse210-tinyfoot-team07/blob/main/demo/bigfoot-unit-test-report.html
