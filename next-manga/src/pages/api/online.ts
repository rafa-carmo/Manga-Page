import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req:NextApiRequest, res:NextApiResponse) {
    res.setHeader('Access-Control-Allow-Origin', 'http://192.168.5.25:80')
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
    if(req.method === 'GET'){
        return res.status(200).json({status: "ok"})
    }
    return res.status(404).json({status: "Error"})
  }