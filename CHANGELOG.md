# CHANGELOG

## [v1.4.11] - 2023-03-24

- Combine bullet and numbered lists into one feature

## [v1.4.10] - 2023-03-24

- Add OGP fetch logic

## [v1.4.8] - 2023-03-24

- Add functionality to convert Notion blocks to JSON for React

## [v1.4.7] - 2023-03-22

- Add type generics to the database client's retrieve method.

## [v1.4.6] - 2023-03-22

- Correcting the type generics of PageClient

## [v1.4.5] - 2023-03-22

- Implemented a way to easily create Notion blocks.

## [v1.4.4]

- Add type generics to NotionClient's `pages.update` and `pages.update`

## [v1.4.3]

- Fixed a bug in the Notion select property filtering. This correction ensures that select properties are accurately filtered, enhancing the reliability and functionality of the feature. The fix addresses issues where select property filters were not applying correctly, potentially leading to inaccurate data presentation or manipulation within applications utilizing Notion's API. This update underscores our commitment to providing robust and error-free features to our users, further enhancing the overall user experience and trust in our software solutions.

## [v1.4.2]

- Temporarily removed the `turndown` module due to a discovered flaw in the `domino` module it depends on. This decision was made to ensure the integrity and security of our software environment. By removing the module, we aim to prevent any potential vulnerabilities from affecting users until a fix is available or an alternative solution is implemented. This action underscores our commitment to maintaining a secure and reliable software ecosystem for our users and developers alike.

## [v1.4.1]

- Improved documentation for Database client methods and their usage to provide better understanding and ease of use. This enhancement ensures that developers can more effectively utilize database functionalities, leading to more efficient and error-free code. The documentation now includes examples, parameter explanations, return value descriptions, and potential error cases for each database client method. This comprehensive approach aims to facilitate developers in implementing database operations with greater precision and confidence.

## [v1.4.0]

- Added type generics to database queries, enabling more type-safe database queries.

## [v1.3.0]

- Utility for converting HTML into Notion blocks. This feature allows users to seamlessly import HTML content directly into their Notion pages, enhancing the flexibility and ease of content creation and management within Notion.

## [v1.2.3]

- Removed extraneous source code that was mixed into the entry point.

## [v1.2.2]

- Introduced a new class for generating filters for querying Notion Databases. This feature allows developers to easily construct complex queries by encapsulating filter logic within a reusable class structure.

## [v1.2.0]

- Introduced separate classes for each Notion resource, organizing the NotionClient class for better management.
- Added `blocks` and `pages` member fields to the NotionClient class, which hold class instances for managing Notion's blocks and pages resources, respectively.
- Upon instantiation of the NotionClient, instances of the `blocks` and `pages` classes are also automatically instantiated and stored in the member fields of the NotionClient.

## [v1.1.1]

- Removed extraneous source code that was mixed into the entry point.

## [v1.1.0]

- Changed the structure of NotionClient.
- Previously, NotionClient contained all Notion components such as blocks and databases within itself. However, these have now been separated into different classes.
- A ClientBase, which contains cache functionality and an instance of axios, has been inherited to create a class NotionClient that holds fields for each Notion component.

## [v1.0.12] - 2023-02-18

- Change the HTML structure within the BookmarkBlock's HTML conversion method to enhance layout and compatibility.

## [v1.0.11] - 2023-02-18

- Added: The BookmarkBlock can now fetch and reflect the OGP information from URLs in the HTML.

## [v1.0.10] - 2023-02-18

- Enhanced the `BulletedListItemBlock` to also retrieve and display nested elements when present.

## [v1.0.9] - 2023-02-18

- Improved: Implemented sanitization of `<>` in the code block conversion class to enhance the generation of safe HTML content.

## [v1.0.8] - 2023-02-18

- Fixed: Corrected the issue where the ternary operator evaluation was reversed in the code block conversion class.Corrected the issue where the ternary operator evaluation was reversed in the code block conversion class.

## [v1.0.7] - 2023-02-17

- Fixed bugs that were not fully resolved in the previous updates. This version addresses and resolves remaining issues to ensure smoother operation and enhanced functionality.

## [v1.0.6] - 2023-02-16

- Fixed bugs that were not fully resolved in the previous updates. This version addresses and resolves remaining issues to ensure smoother operation and enhanced functionality.

## [v1.0.5] - 2023-02-16

- For version 1.0.5, we addressed and resolved an issue concerning the HTML structure in the conversion of code blocks. This enhancement ensures that the HTML representation of code blocks is more accurate and adheres to web standards, providing a better visual and functional integration within web pages.

## [v1.0.4] - 2023-02-16

- For version 1.0.4, building upon the corrections and additions made in version 1.0.3 regarding the method for converting code blocks, you may consider further enhancing this functionality to address any remaining issues or limitations that were not fully resolved.

## [v1.0.3] - 2023-02-16

- Fixed an issue where the notation of HTML classes in the method for converting code blocks to HTML was incorrect. This correction ensures that the HTML output is accurately reflected, improving visual consistency.

## [v1.0.2] - 2023-02-16

- Fixed a type error that occurred when retrieving `BlockList` from the cache, as the data was a plain object rather than an instance. This resolves issues related to type mismatches and ensures compatibility with expected data structures.

## [v1.0.1] - 2023-02-12

- Added unit tests using Vitest to ensure the reliability and correctness of our codebase.
- Added a method to the NotionClient instance for converting retrieved Notion blocks into HTML. This enhances the ability to work with Notion data in web-based formats.

## [v1.0.0] - 2023-02-11

- Implemented a method to recursively collect blocks from Notion's HTTP endpoints. This allows for efficient data retrieval by minimizing the number of requests needed to fetch an entire page's content.
- Added caching functionality to store the results of requests to Notion's HTTP endpoints. This significantly improves performance by reducing the need for repeated requests to the same resources.
- Introduced a cache purging feature to clear cached data. This ensures that the cache can be refreshed to reflect the latest data from Notion, maintaining the accuracy and relevance of the cached information.
