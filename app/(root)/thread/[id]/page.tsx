
import { currentUser } from '@clerk/nextjs'
import { fetchUser } from "../../../../lib/actions/user.actions";
import { redirect } from "next/navigation";
import { fetchThreadsById } from "../../../../lib/actions/thread.action";
import ThreadCard from '../../../../components/cards/ThreadCard'
import Comment from '../../../../components/forms/Comment';

const Page = async({params}: {params: {id: string}}) =>{
    if(!params.id) return null;
    
    const user= await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id);

    const thread = await fetchThreadsById(params.id);
    if(!userInfo?.onboarded) return null;
    return(
        <section className="relative">
            <div>
            <ThreadCard
                key={thread._id}
                id={thread._id}
                currentUserId={user.id} 
                parentId={thread.parentId}
                content={thread.text}
                author={thread.author|| ''}
                community={thread.community}
                createdAt={thread.createdAt}
                comments={thread.children}
            />
            <div className='mt-7'>
                <Comment
                    threadId={thread.id}
                    currentUserImg={userInfo.image}
                    currentUserId={JSON.stringify(userInfo._id)}
                />
            </div>
            <div className='mt-10'>
                {thread.children.map((childItem:any)=>(
                    <ThreadCard 
                        key={childItem._id}
                        id={childItem._id}
                        currentUserId={childItem?.id} 
                        parentId={childItem.parentId}
                        content={childItem.text}
                        author={childItem.author|| ''}
                        community={childItem.community}
                        createdAt={childItem.createdAt}
                        comments={childItem.children}
                        isComment
                    />
                )
                )
                }
            </div>
            </div>
        </section>
    )
}

export default Page;