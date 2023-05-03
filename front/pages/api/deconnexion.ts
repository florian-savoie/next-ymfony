import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from 'cookie';


const Deconnexion = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method != 'POST') { 
        return res.status(503).json({
            error: true,
            message: ['Methode non autorisé']
        })
    }

    try {
        let token = req.headers.authorization?.split(' ')[1] as any

        if (!token) {
            return res.status(409).json({
                error: true,
                message: ["le token est invalide"]
            })
        }

        return res.status(200).setHeader('Set-Cookie', [
        serialize('token', '', {
            maxAge: -1,
            path: '/',
        }),]).json({
            error: false,
            message: ['Vous être maintenant déconnecter']
        })

    } catch(err: any) {
        return res.status(418).json({
            error: true,
            message: ["Error du server"]
        })
    }
}

export default Deconnexion