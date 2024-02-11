# CHANGELOG

## [v1.0.1] - 2023-02-12

- Added unit tests using Vitest to ensure the reliability and correctness of our codebase.
- Added a method to the NotionClient instance for converting retrieved Notion blocks into HTML. This enhances the ability to work with Notion data in web-based formats.

## [v1.0.0] - 2023-02-11

- Implemented a method to recursively collect blocks from Notion's HTTP endpoints. This allows for efficient data retrieval by minimizing the number of requests needed to fetch an entire page's content.
- Added caching functionality to store the results of requests to Notion's HTTP endpoints. This significantly improves performance by reducing the need for repeated requests to the same resources.
- Introduced a cache purging feature to clear cached data. This ensures that the cache can be refreshed to reflect the latest data from Notion, maintaining the accuracy and relevance of the cached information.
