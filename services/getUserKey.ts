import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { db, tableName } from './database';
import { KeyData } from '../interfaces';

export async function getUserKey(userId: string): Promise<KeyData | undefined> {
    const { Item } = await db.send(
        new GetCommand({
            TableName: tableName,
            Key: {
                UserId: userId,
            },
        })
    );

    return Item as KeyData | undefined
}
