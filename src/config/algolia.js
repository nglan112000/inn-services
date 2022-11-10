import algoliasearch from 'algoliasearch';
import {algolia as adminApiKey} from '../../secretkey';
const applicationId = '5Z9Y26GQBB';
const indexName = 'dev_inn';
const client = algoliasearch(applicationId, adminApiKey);
const clientIndex = client.initIndex(indexName);
const housewareIndex = client.initIndex('dev_HOUSEWARE');
export {clientIndex, housewareIndex};
