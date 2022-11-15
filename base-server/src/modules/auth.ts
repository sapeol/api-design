import jwt from 'jsonwebtoken'
import { resolve } from 'path'

export const createJWT = (user) => {
    const token = jwt.sign(
        {
            id: user.id,
            username: user.username
        },
        process.env.JWT_SECRET
    )
    return token
}


export const protectroute = (req, res, next) => {
    const bearer = req.headers.authorization
    if (!bearer) {
        res.status(403)
        res.send({ 403: "Unauthorized" })
        return
    }
    const [, token] = bearer.split(' ')
    if (!token) {
        res.status(403)
        res.send({ 403: "Invalid Token" })
        return
    } else {
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            req.user = payload
            console.log(payload)
            next()
            return
        }
        catch (e) {
            console.error(e)
            res.status(403)
            res.send({ 403: "Invalid Token" })
            return
        }
    }

}