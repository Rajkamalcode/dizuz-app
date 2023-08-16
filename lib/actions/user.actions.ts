"use server"

import { connectToDB } from "../mongoose"
import User from '../models/user.model'
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate-path";

interface Params{
    userId: string,
    username: string,
    name: string,
    bio: string,
    image: string,
    path: string
}

export async function updateUser({
    
    userId,
    username,
    name,
    bio,
    image,
    path
} : Params): Promise<void> {
    
    try{
        connectToDB();
        await User.findOneAndUpdate(
            {id: userId},
            { 
                username: username.toLowerCase(),
                name, bio,image,onboarded: true,
            },
            { upsert: true}
        )
        if(path ==='/profile/edit'){
            revalidatePath(path);
        }
    }
    
    catch(error){
        throw new Error(`Failed to create/update user: ${error.message}`)
    }
}

export async function fetchUser(userId:string) {
    try{
        connectToDB();

        return await User.findOne({id: userId})
    }
    catch(error){
        throw new Error(`failed to fetch user:${error.message}`);
    }

}