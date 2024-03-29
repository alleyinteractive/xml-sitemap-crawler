# Sitemap Crawler

Crawls XML sitemaps and creates a database of URLs with path information.

## Instructions

1. Create a database and a table called `urls` (see below for database structure).
2. Copy `.env.example` to `.env` and populate it with your database credentials.
3. Run the script, passing the URL to the sitemap.xml file: `npm start -- https://path.to/sitemap.xml`.

### Database Structure

```mysql
CREATE TABLE `urls` (
  `id` int NOT NULL AUTO_INCREMENT,
  `href` text,
  `protocol` tinytext,
  `host` tinytext,
  `path` tinytext,
  `pathname` tinytext,
  `query_string` tinytext,
  `hash` tinytext,
  `file` tinytext,
  `level_1` tinytext,
  `level_2` tinytext,
  `level_3` tinytext,
  `level_4` tinytext,
  `level_5` tinytext,
  PRIMARY KEY (`id`)
);
```

## How to Use the Data

The database can help you understand the content on a site and its hierarchy. How this data is most useful will depend on the site and site/url structure, but typically, it can be helpful to query for distinct values of `level_1`, `CONCAT(level_1, '/', level_2)`, `CONCAT(level_1, '/', level_2, '/', level_3)`, etc. It may be helpful to group by those values and get a count of URLs within each hierarchy.

Here are some sample queries to get your gears turning:

```sql
SELECT `level_1`, COUNT(*) AS `page count` FROM `urls` GROUP BY `level_1` ORDER BY `level_1`
```

```sql
SELECT IF(level_2 != '', CONCAT(`level_1`, '/', `level_2`), `level_1`) AS `uri path`, COUNT(*) AS `page count` FROM `urls` GROUP BY `uri path` ORDER BY `uri path`
```
