import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method === 'GET'){
        const url = process.env.NOTIFICATION_URL || 'http://192.168.5.25:1338'
        const { user } = req.query


        if(!user || !url) {
            return res.json({})
        }
        const rawData = await fetch(`${url}/notifications/from/${user}/all`)
        const data = await rawData.json()
        
        return res.json({data})
        
    }
    return res.json({})
}