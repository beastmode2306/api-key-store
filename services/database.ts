import {DynamoDBClient} from "@aws-sdk/client-dynamodb";

const useLocal = process.env.USE_LOCAL_STACK === 'true';

const db = new DynamoDBClient({
    region: 'us-west-2',
    endpoint: useLocal ? 'http://localhost:4566' : null
});

const tableName = process.env.KEY_STORE_TABLE_NAME;

export {db, tableName};