# CHANGELOG

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
