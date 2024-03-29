import url from 'node:url';
import { DbInsert } from './db';

export default function parseUrl(loc:string):DbInsert {
  const urlParts = url.parse(loc, true);
  const pathParts = urlParts.pathname?.replace(/^\//, '').split('/') || [];
  return [
    urlParts.href, // href
    urlParts.protocol || '', // protocol
    urlParts.host || '', // host
    urlParts.path || '', // path
    urlParts.pathname || '', // pathname
    urlParts.search || '', // query_string
    urlParts.hash || '', // hash
    pathParts.length ? pathParts.pop() || '' : '', // file
    pathParts.length ? pathParts.shift() || '' : '', // level_1
    pathParts.length ? pathParts.shift() || '' : '', // level_2
    pathParts.length ? pathParts.shift() || '' : '', // level_3
    pathParts.length ? pathParts.shift() || '' : '', // level_4
    pathParts.length ? pathParts.shift() || '' : '', // level_5
  ];
}
