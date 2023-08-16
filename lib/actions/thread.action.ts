"use server";
import mongoose from 'mongoose';

import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"
import { revalidatePath } from "next/cache";
interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string,
  }

  
export async function fetchPosts(pageNumber=1, pageSize=20){
  connectToDB();

  const skipAmount=(pageNumber-1)*pageSize;

  //fetch the posts that has no parents (no comments)
  const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
  .sort({ createdAt: "desc" })
  .skip(skipAmount)
  .limit(pageSize)
  .populate({
    path: "author",
    model: User,
    select: "_id name parentId image"
  })
  .populate({
    path: "children", // Populate the children field
    populate: {
      path: "author", // Populate the author field within children
      model: User,
      select: "_id name parentId image", // Select only _id and username fields of the author
    },
  });
      const totalPostsCount = await Thread.countDocuments({parentId: { $in: [null,undefined]}})
  
      const posts = await postsQuery.exec();

      const isNext = totalPostsCount > skipAmount + posts.length;

      return { posts, isNext }
}

export async function createThread({
    text,author,communityId,path

}: Params) {
    try{
        connectToDB();
        
        const createdThread = await Thread.create({
            text,author,community: null,
        });

        //update user model to add data to his threads
        await User.findByIdAndUpdate(author, {
            $push: { threads: createdThread._id},
          });
      

        
        revalidatePath(path);
    }
   catch (error) {
    throw new Error(`Failed to create thread: ${error.message}`);
  }
}

export async function fetchThreadsById(id: string){
  connectToDB();

  try {
    const thread= await Thread.findById(id)
    .populate({
      path:'author',
      model: User,
      select: '_id id name image'
    })
    .populate({
      path: 'children',
      populate:[
        {
          path:'author',
          model: User,
          select: '_id id name parentId image'
        },
        {
          path: 'children',
          model: Thread,
          populate:{
            path:'author',
            model: User,
            select:'_id id name parentId image'
          }
        }
      ]
    }).exec();
    return thread;
  } catch (error: any) {
    throw new Error(`error fetching thread comments :${error.message}`)
  }


}

export async function addCommentToThread(
  threadId: string,
  commentText: string,
  userId: string,
  path: string,
) {
  connectToDB();

  try {
    const originalThread = await Thread.findById(threadId);
    if(!originalThread){
      throw new Error("Thread not found")
    }
    
    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId,
    })

    const savedCommentThread = await commentThread.save();

    originalThread.children.push(savedCommentThread._id);

    await originalThread.save();
  } catch (error) {
    throw new Error(`error adding comment: ${error.message}`)
  }
}