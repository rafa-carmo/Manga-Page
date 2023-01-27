import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const url = process.env.NOTIFICATION_URL || 'http://192.168.5.27:1338'
    if(req.method === 'GET'){
        if(!url) {
            return res.json({})
        }
        const rawData = await fetch(`${url}/push_notification/public_key`)
        const data = await rawData.json()

        return res.json(data)
        
    }

    if(req.method === 'POST') {
        const {user, endpoint, auth, p256dh} = req.body
        if(!url) {
            return res.json({})
        }

        if(!user || !endpoint || !auth || !p256dh) {
            throw new Error("Missing paramethers")
        }
        await fetch(`${url}/push_notification`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "post",
            body: JSON.stringify({recipientId: `${user}`, url: endpoint, auth, p256dh})
        })
    }
    return res.json({})
}