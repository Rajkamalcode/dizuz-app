"use client"

import * as z from "zod";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { fetchUser } from "../../lib/actions/user.actions";

import { CommentValidation } from "../../lib/validations/thread";

import replylogo from '../../public/assets/reply.svg'


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "../../components/ui/form";

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { updateUser } from "../../lib/actions/user.actions";
import Image from 'next/image';
import { addCommentToThread } from "../../lib/actions/thread.action";

interface Props{
    threadId: string,
    currentUserImg: string,
    currentUserId: string}


const Comment = ({threadId, currentUserImg, currentUserId   }: Props) =>{
    const router= useRouter();
    const pathname=usePathname();

    const [userData, setUserData] = useState(null);

    const form = useForm<z.infer<typeof CommentValidation>>({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
          thread: "",

        },
      });
    
      const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
        await addCommentToThread(
                threadId,values.thread,JSON.parse(currentUserId), pathname
        );
        form.reset();
      };

    
    return(
        <Form {...form}>
        <form
          className='comment-form'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='thread'
            render={({ field }) => (
              <FormItem className='flex w-full items-center gap-3'>
                <FormLabel >
                  
                  <Image 
                  src={currentUserImg} 
                  alt="profile-image" 
                  width={48} height={48} 
                  className="rounded-full object-cover"/>
    
                </FormLabel>
                <FormControl className='border-none bg-transparent'>
                  <Input type='text' placeholder="comment...." className="no-focus text-light-1 outline-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <Button type='submit' className='comment-form_btn'>
             <Image src={replylogo} alt='reply' width={24} height={24} className='crusor-pointer object-contain fill-white'/>
            reply
          </Button>
        </form>
      </Form>
    )

}

export default Comment;