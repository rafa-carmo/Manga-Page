import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method === 'GET'){
        const rawData = await fetch('http://192.168.5.25:1338/notifications/from/9ab8ecf4-2dbd-4289-867f-977c9ec0777f/all')
        const data = await rawData.json()
        
        return res.json({data})
        
    }
    return res.json({})
}