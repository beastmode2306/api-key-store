import {db, tableName} from "./database";
import {GetCommand} from "@aws-sdk/lib-dynamodb";
import {KeyData} from "../interfaces";

export async function getUserKey(userId: string): Promise<KeyData> {
    const {Item} = await db.send(new GetCommand({
        TableName: tableName,
        Key: {
            "UserId": userId
        }
    }));

    return Item as KeyData;
}