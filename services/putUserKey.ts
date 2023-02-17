import { PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { db, tableName } from './database';
import { KeyData, UserKey } from '../interfaces';
import { getUserKey } from './getUserKey';
import { mergeKeys } from '../utils/megreArrays';

export async function putUserKey(userId: string, userKeys: UserKey[] | UserKey): Promise<KeyData> {
    const sanitizedKeys = Array.isArray(userKeys) ? userKeys : [userKeys];
    const item = {
        UserId: userId,
        Keys: sanitizedKeys,
    };
    const existingItem = await getUserKey(userId);

    if (existingItem) {
        await db.send(
            new UpdateCommand({
                TableName: tableName,
                Key: {
                    UserId: userId,
                },
                UpdateExpression: 'SET #keys = :newKeys',
                ExpressionAttributeNames: {
                    '#keys': 'Keys',
                },
                ExpressionAttributeValues: {
                    ':newKeys': mergeKeys(existingItem.Keys, sanitizedKeys),
                },
            })
        );
    } else {
        await db.send(
            new PutCommand({
                TableName: tableName,
                Item: item,
            })
        );
    }

    return item;
}
