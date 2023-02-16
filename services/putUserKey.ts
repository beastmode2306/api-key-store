import {db, tableName} from "./database";
import {PutCommand} from "@aws-sdk/lib-dynamodb"
import {KeyData, UserKey} from "../interfaces";

export async function putUserKey(userId: string, userKeys: UserKey[]): Promise<KeyData> {
    const item = {
        UserId: userId,
        Keys: userKeys
    }

    await db.send(new PutCommand({
        TableName: tableName,
        Item: item
    }))

    return item
}