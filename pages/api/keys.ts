import type { NextApiRequest, NextApiResponse } from 'next';
import { ZodError } from 'zod';
import { FormattedResponse, KeyData } from '../../interfaces';
import { getUserKey } from '../../services/getUserKey';
import { putUserKey } from '../../services/putUserKey';
import { keySchemaValidator } from '../../validators';

const getHandler = async (userId: string, res: NextApiResponse<FormattedResponse<KeyData>>) => {
    const data = await getUserKey(userId);
    if (!data) {
        return res.status(404).json({ message: 'KeyNotFound', data });
    }
    return res.status(200).json({ data });
};

const putHandler = async (
    userId: string,
    req: NextApiRequest,
    res: NextApiResponse<FormattedResponse<KeyData>>
) => {
    const { keys } = req.body;
    if (!keys) {
        return res.status(400).json({
            message: 'Keys should be provided',
            data: null,
        });
    }
    try {
        if (Array.isArray(keys)) {
            keys.forEach((key) => keySchemaValidator.parse(key));
        } else {
            keySchemaValidator.parse(keys);
        }
        const data = await putUserKey(userId, keys);
        return res.status(201).json({ data });
    } catch (e) {
        if (e instanceof ZodError) {
            return res.status(422).json({ message: e.format(), data: null });
        }
        return res.status(500).json({ message: e.message, data: null });
    }
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<FormattedResponse<KeyData>>
) {
    const { userId } = req.query;

    if (!userId || Array.isArray(userId)) {
        return res.status(400).json({
            message: 'UserId should be provided as a single value',
            data: null,
        });
    }

    if (req.method === 'GET') {
        return getHandler(userId, res);
    } else if (req.method === 'PUT') {
        return putHandler(userId, req, res);
    }

    return res.status(404).json({ message: 'RouteNotFound', data: null });
}
