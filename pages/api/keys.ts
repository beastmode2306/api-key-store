import type {NextApiRequest, NextApiResponse} from 'next'
import {FormattedResponse, KeyData} from "../../interfaces";
import {getUserKey} from "../../services/getUserKey";
import {putUserKey} from "../../services/putUserKey";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<FormattedResponse<KeyData>>
) {
    const {userId} = req.query;

    if (!userId || Array.isArray(userId)) {
        return res.status(400).json({message: 'UserId should be provided as a single value', data: null})
    }

    if (req.method === "GET") {
        const data = await getUserKey(userId);
        if (!data) {
            return res.status(404).json({message: 'KeyNotFound', data})
        }
        return res.status(200).json({data})
    } else if (req.method === "PUT") {
        const data = await putUserKey(userId,req.body.keys)
        return res.status(201).json({data})
    }

    return res.status(404).json({message: 'RouteNotFound', data: null})
}
