# Littlefoot.js Code Review

Littlefoot is a JS/TS plugin that makes footnotes more interactive by using popovers. It was developed after forking from bigfoot but does not need JQuery to run. It currently works on the latest version of JS(ES14) and can be built using the npm version after 4.1.2. 

## Design and code considerations

One design pattern that Littlefoot uses is modularization, which means that Littlefoot has different files corresponding to specific functionalities. For instance, the document.ts file handles footnote and comment manipulation, focusing on DOM interactions, querying, element creation, and so on. The events.ts file contains event-handling mechanisms such as click and hover actions. The footnote.ts file is responsible for footnote-specific interactions like showing or dismissing a footnote. The layout.ts file, as its name suggests, focuses on managing the layout for popovers. Lastly, scroll.ts deals with scrolling through the contents inside a popover.<br/>

All of these functionalities are eventually exported to the main littlefoot.js, where they are utilized. This architecture makes the design clean and simple, and more importantly, introduces scalability. New features can be added easily, and debugging specific functions is straightforward within such a structure. However, there is one crucial element lacking in the code: documentation. We cannot overstate the importance of well-written documentation, but it is evident that the developers of Littlefoot did not prioritize this. As a result, our group often struggled to understand the code, frequently needing to stop and search online for explanations of specific lines.<br/>

If we were new members joining the project, this lack of documentation would create even more challenges. Thus, one change we made was to add general documentation to the code.<br/>

Another point to mention is the choice of TypeScript over JavaScript. It is understandable that the developers opted for TypeScript to minimize the risk of unexpected user behavior, as Littlefoot relies on user input. However, this decision may introduce some overhead, as the functionalities provided by Littlefoot are not overly complex. Additionally, this choice could lead to potential conflicts if the user’s codebase is written in JavaScript.

## Inconveniences due to excessive tooling

Littlefoot extensively uses NPM packages to aid development. However, several issues were found during building and testing (listed below).

1. Build scripts work only on Unix-like operating systems (hence they do NOT build on Windows right out of the box).
	- We changed the build scripts to enable Littlefoot to be built on Windows and Unix-like systems. The irony here is that we had to install yet another additional package - “rimraf” to get the functionality to work.
2. Cypress tests do not provide an inbuilt way to test mouseover functionality (ref: [https://docs.cypress.io/guides/core-concepts/retry-ability#Only-queries-are-retried](https://docs.cypress.io/guides/core-concepts/retry-ability#Only-queries-are-retried)).
	- Cypress requires a plugin “cypress-real-events” to be tested for mouseover events; support is not present out of the box.
3. Cypress lacks support to test the code in Safari browser.
	- Currently, Cypress provides only experimental support to the Safari browser. 
	- Even the experimental support was provided from 2022 onwards, however Littlefoot used Cypress even before this. This means that the build script (which works on Mac OS) and the test cases (which don’t guarantee functionality on Safari) did not cater to the same development environment.
4. Cypress installation on Windows requires "yarn" 
	- Cypress installation fails with NPM on some systems and requires yet another dependency “yarn” to be used to guarantee a successful installation ([https://github.com/cypress-io/cypress/issues/6315](https://github.com/cypress-io/cypress/issues/6315)).
5. Is it worth it?
	- The key observation to be made here is that there are only 7 (trivial) test cases added for end-to-end testing. However, this brought with it all issues related to Cypress (described above).

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXe42V3X3k6uHrnijDzpCYCBiy1VyxqEhcLP21gFk5va_uXLHkJizbCnJzSeaslt6va4O8uXqphOxs0VhGXt2o-zjzUsSBH9uq_FjgpCCL5uIM6hGpX-YOm5pXXsU1ngaR5SDm3Iy-gTgq46mWS57Zu5Zoc?key=NC51RxkSmJqhtdBOk1Y82g)

## Review of features

### Catering to a non-existent consumer

All the CSS generated in Littlefoot (i.e. the distribution file littlefoot.css) contains an additional fallback value for every property which can be expressed using rem units. The decision to have this fallback causes a great increase in the size of the CSS that is being distributed.
For example - <br/>
	`.littlefoot__button svg {`<br/>
	    `float: left;`<br/>
	    `height: 4.8px;`<br/>
	    `height: .3rem;`<br/>
	`}`<br/>
We see that there is a px value fallback. Turns out that this exists because specific versions of specific browsers (which are not in use today) do not support rem units. They are listed below - 
1. Firefox   Versions 2 – 3 
2. Safari     Versions 3.2 – 4 <br/>
Simply getting rid of this fallback since all modern browsers support rem will cut down the size of the CSS delivered by at least 15%
### Bugs in Littlefoot

Littlefoot, like any other overengineered library, is not without its bugs. One such bug is found when the mouse is hovering over the footnote “button”. The tooltip displayed is not consistent (one can only guess, after a sequence of operations, if “see footnote 1” comes up or “footnote 1”).

We can only deduce from the developer’s choice of words that the functionality is supposed to work as follows - 
1. If no footnote is displayed, each tooltip shows “see footnote [x]”
2. If footnote a is visible, then only the tooltip corresponding to the footnote visible must say “footnote [a]”, while the rest say “see footnote [x]”.

However, this is not the case. The real concern here is not about the observation regarding an immaterial functionality, but rather about the possibility that such side-effects are never handled. On a side note, this bug could have been potentially found through the Cypress tests if only the testing framework supported CSS for mouseover events natively.

Another inconvenience we found with Littlefoot is related to the positioning of the footnote - the footnote jumps sporadically when the footnote location is positioned at a location where the amount of space below is equal to the height required by the footnote. Any small scroll from such a location causes the footnote to jump.

#### GitHub test coverage

Only the coverage suite (implemented with Vitest) is run whenever code for Littlefoot is pushed in Github workflows. Given that there are very few end-to-end test cases (which use Cypress), they can also be included in the workflow. 

## Changes made

**Github repo link:** https://github.com/McSohan/littlefoot/ 
1. Added build script to ensure compilation on the Windows platform too ([https://github.com/goblindegook/littlefoot/commit/0da2d4615024567862a176b69b7d9278fdb41ddb](https://github.com/goblindegook/littlefoot/commit/0da2d4615024567862a176b69b7d9278fdb41ddb)).
2. Added documentation for functions in code ([https://github.com/goblindegook/littlefoot/commit/7a3de0c19a2ce5c953b1a6c08ade98836919d1e1](https://github.com/goblindegook/littlefoot/commit/7a3de0c19a2ce5c953b1a6c08ade98836919d1e1)).

### Justifying the changes-

1. We believed that adding new features to an “over engineered” product is not the right thing to do. Rather, getting it to work as it was intended was a better task to take on. In fact, one must question if the many features present in :ittlefoot to make it customizable are really being used in practice. 
	1. As documented on the Littlefoot page, there are 17 options, 5 methods, 9 button properties and 21 popover properties which can be changed when :ittlefoot is used. 
	2. Supporting all these features requires a lot of code; and as a consequence the delivered CSS and JS files sizes are also larger in size.
	3. Obtaining statistics about the usage of the above described features by developers (at least from open source codebases that use :ittlefoot) would help in determining if the use case addressed is even practically valid.
2. The additional features that come with Littlefoot have their own niche bugs, for example, setting `activateOnHover: true` also causes the tooltip text to appear on top of the footnote - which can be a poor experience for the user. This issue is further compounded by the fact that the text presented on the tooltip is not consistent.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfyP22NdEiMYmHo6G--SkahZ1XnfQ38rkm6xxbqC5GMRfMiwRPR0hKCg7WiQMBMgkrXV5y9SFHaMPD6XcEPUMSthQPpJ2EUqzn3p20CgS95wsiE9NFZffr299T8HDvBxp-y9i9Yj_SL5C6me9dyuvgqrmM?key=NC51RxkSmJqhtdBOk1Y82g)

3. Having the build succeed in the common environments was a small task but would have a bigger impact in the developer’s point of view. Hence, we added a platform independent build script. 
4. Our overall experience in trying to navigate the codebase led us to a conclusion that minimal documentation would reduce development efforts if one has to undertake the task of debugging the code. This led us to add a few comments that help with readability.
  
### Comments on Coding Practices

In general most of the best practices for excellent repository organization have been followed by the  Littlefoot developers. They have maintained a clean and readable .README file clearly mentioning each feature and getting littlefoot to run There is also separation of the source code, test cases, cypress test etc leading to easy readability. Using such a modular framework is very beneficial as it helps make finding specific functions of code, adding new features and collaborating very easy.<br/>

The documentation for the code is quite good as far as the usage instructions and version control is considered. It gives clear instructions on the dependencies and how to run the code making it easy for a new user to use littlefoot. Moreover, all the changes have been documented clearly across versions and documented accurately. However, there is a clear lack of documentation for the purpose of each code. Each source code file should have a small description telling what its functionality is so that developers who wish to make changes can understand quickly and make changes. Furthermore, description on what test cases are used and how to run the automated test cases should also have been mentioned. Lack of such features make it difficult for quality assurance and deployment in production.<br/>

Another thing they could improve on is organizing the root directory as it has many files performing the same function. For instance, the json files (renovate, biome) are both dependencies but are in two separate files.<br/>

## Comparison with bigfoot

Owing to the fact that littlefoot was forked from bigfoot there are a lot of similarities between them. These include similar organization of directory structure, unit tests, code organization etc. However littlefoot also has some of the drawbacks from bigfoot like the lack of documentation and unclear testing pipeline.<br/>

But, littlefoot also improves in certain aspects making it better than bigfoot. Bigfoot uses CoffeeScript, which is a language that is no longer supported, leading to compatibility and development issues. Furthermore, the tooling that bigfoot uses for building is grunt which is outdated compared to more modern tools like Webpack. Littlefoot is built on JS/TS which is the industry leading language leading to easier development and compatibility with existing web pages. Littlefoot also does not require jQuery making development easier. This also means that the heavy dependence on `.on` function from bigfoot has been eliminated here.
