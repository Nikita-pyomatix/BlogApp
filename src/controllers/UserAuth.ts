import { Request, Response } from "express";
import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import { RegisterInput, LoginInput } from "../schemas/authSchema";
import { UserData, UserProfile } from "../types";
import { generateToken } from "../utils/token";
import { UploadedFile } from "express-fileupload";


export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body as RegisterInput;
  const profilePicture = req.files?.file as UploadedFile

  const uploadPath = `./uploads/profile-pictures/${profilePicture.name}`;
  profilePicture.mv(uploadPath, (err) => {
    if (err) {
      console.error('Error while moving file:', err);
    }
  })
  try {
    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        profilePicture: uploadPath,
      } as any, 
    }) as UserData;

    if (user) {
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as LoginInput;

  try {
    const user = await prisma.user.findUnique({ where: { email } }) as UserData | null;

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: (req as any).user.id },
      select: { 
        id: true, 
        name: true, 
        email: true, 
        profilePicture: true,
        createdAt: true 
      } as any, 
    }) as UserProfile | null;

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
