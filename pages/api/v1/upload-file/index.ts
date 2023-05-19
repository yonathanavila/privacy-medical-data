import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        const file = req.body;
        console.log(file);
        res.status(201).send({ 'msg': 'File uploaded!' });
    } catch (error) {
        res.status(500).send(error);
    }
};

export default handler;