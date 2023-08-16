"use client"

import * as z from "zod";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { fetchUser } from "../../lib/actions/user.actions";

import { ThreadValidation,CommentValidation } from "../../lib/validations/thread";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "../../components/ui/form";

import { Textarea} from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { updateUser } from "../../lib/actions/user.actions";
import { createThread } from "../../lib/actions/thread.action";

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

function PostThread({userId}:{userId: string}) {
    const router= useRouter();
    const pathname=usePathname();

    const [userData, setUserData] = useState(null);

    useEffect(() => {
      // Fetch user data
      fetchUser(userId)
        .then((user) => {
          setUserData(user);
        })
        .catch((error) => {
          // Handle error
        });
    }, [userId]);
  

    const form = useForm<z.infer<typeof ThreadValidation>>({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
          thread: "",
          accountId: userId,
        },
      });
    
      const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
        await createThread({
          text: values.thread,
          author: userData._id,
          communityId: null,
          path: pathname,
        });
    
        router.push("/");
      };

    return (
        <Form {...form}>
          <form
            className='mt-10 flex flex-col justify-start gap-10'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name='thread'
              render={({ field }) => (
                <FormItem className='flex w-full flex-col gap-3'>
                  <FormLabel className='text-base-semibold text-light-2'>
                    Content
                  </FormLabel>
                  <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                    <Textarea rows={15} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
    
            <Button type='submit' className='bg-primary-500'>
              Post Thread
            </Button>
          </form>
        </Form>
      );
    }

export default PostThread;