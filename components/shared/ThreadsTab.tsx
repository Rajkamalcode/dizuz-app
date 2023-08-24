import { redirect } from "next/navigation";
import { fetchUserPosts } from "../../lib/actions/user.actions";
import ThreadCard from "../cards/ThreadCard";

interface Props{
    currentUserId:string,
    accountId: string,
    accounttype: string

}


async function ThreadsTab({ currentUserId, accountId, accounttype }: Props){
    let result=await fetchUserPosts(accountId);

    if(!result) redirect('/');
    
    return (
        <section className='mt-9 flex flex-col gap-10'>
          {result.threads.map((thread) => (
            <ThreadCard
              key={thread._id}
              id={thread._id}
              currentUserId={currentUserId}
              parentId={thread.parentId}
              content={thread.text}
              author={
                accounttype === "User"
                  ? { name: result.name, image: result.image, id: result.id }
                  : {
                      name: thread.author.name,
                      image: thread.author.image,
                      id: thread.author.id,
                    }
              }
              community={thread.community}
              createdAt={thread.createdAt}
              comments={thread.children}
            />
          ))}
        </section>
    );

}

export default ThreadsTab;