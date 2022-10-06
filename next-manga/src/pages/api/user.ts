import { NextApiRequest, NextApiResponse } from "next";
import { signIn } from "services/auth";

type signInBodyProps = {
    email: string
    password: string
}

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method === 'POST') {
        console.log(req.body)
        const { email, password }: signInBodyProps = req.body
        const response =  await signIn({email, password})
        return res.json(response)
    }

    return res.status(400)
}