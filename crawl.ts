import dotenv from 'dotenv';
import Sitemapper from 'sitemapper';
import {
  DbInsert,
  closeDb,
  initDb,
  insert,
} from './lib/db';
import parseUrl from './lib/parseUrl';

async function main(url:string) {
  dotenv.config();

  initDb({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'root',
    database: process.env.MYSQL_DATABASE || 'urls',
    port: +(process.env.MYSQL_PORT || 3306),
  });

  const sitemap = new Sitemapper({
    url,
  });

  try {
    const { sites, errors } = await sitemap.fetch();

    if (errors.length) {
      errors.forEach((e) => console.error(`${e.url} - ${e.type}`));
    }

    if (!sites.length) {
      console.error('No sites found');
      return;
    }

    let inserts:DbInsert[] = [];
    console.log(`Saving ${sites.length} URLs`);

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < sites.length; i++) {
      const loc = sites[i];
      inserts.push(parseUrl(loc));

      if (inserts.length === 50000) {
        // eslint-disable-next-line no-await-in-loop
        await insert(inserts);
        inserts = [];
      }
    }

    await insert(inserts);

    console.log('Done');
  } catch (error) {
    console.log(error);
  }
  closeDb();
}

process.on('SIGINT', () => {
  console.log('Shutting down');
  closeDb();
});

main(process.argv[2]);
