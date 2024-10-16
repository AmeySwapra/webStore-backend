import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma.js';
import jwt from 'jsonwebtoken';


export const resgiter = async (req, res) => {

    const {username, email, password} = req.body;

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    {username},
                    {email}
                ]
            }
        })

        if(existingUser){
            return res.status(400).json({message: "Username and Email already Exists"})
        }

        const hashPassword  = await bcrypt.hash(password,10);

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashPassword
            }
        })
        console.log(newUser)
        res.status(201).json(newUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Failed to Created User..!!"})
    }
}


export  const login = async(req, res) => {

    const {email, password} = req.body;

    try {
        const user = await prisma.user.findUnique({
            where : {email}
        })

        if(!user){
            return res.status(401).json({message : "User not found Please signup..!!"})
        }

        const isPassword = await bcrypt.compare(password, user.password)

        if(!isPassword){
            return res.status(401).json({message : "Invalid Crediential"})
        }

        const age = 1000 * 60 * 60 * 24 * 7

        const {password : userPassword, ...userInfo} = user;

        const token = jwt.sign({
            id: user.id
        }, process.env.JWT_SECRET_KEY, {expiresIn : age})

        res.cookie('token', token, {
            httpOnly : true,
             secure: true, 
            maxAge: age
        }).status(200).json(userInfo)

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Failed to Logined..!"})
    }
}


export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({message : "Logout Successfully...!"})
}