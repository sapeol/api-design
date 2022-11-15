import prisma from '../db'
import { comparePasswords, createJWT, hashedPassword } from '../modules/auth'


export const createUser = async (req, res) => {
    console.log(req.body)
    const user = await prisma.user.create({
        data: {
            username: req.body.username,
            password: await hashedPassword(req.body.password)
        }

    })
    const token = createJWT(user)
    res.json({ token })
}

export const signIn = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    })
    const isValid = await comparePasswords(req.body.password, user.password)
    if (!isValid) {
        res.status(401)
        res.send({ message: "Incorrect password" })
        return
    }
    const token = createJWT(user)
    res.json({ token })
}