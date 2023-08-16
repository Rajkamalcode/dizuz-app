import Image from 'next/image';
import Link from 'next/link'
import heartlogo from '../../public/assets/heart-gray.svg'
import replylogo from '../../public/assets/reply.svg'
import repostlogo from '../../public/assets/repost.svg'
import sharelogo from '../../public/assets/share.svg'

interface Props{
    id: string;
    currentuserId: string;
    parentId: string | null;
    content: string;
    author: {
        name:string;
        image:string;
        id: string;
    };
    community: {
        id: string;
        name:string;
        image:string;
        
    } | null;
    createdAt: string;
    comments: {
        author:{
            image: string;
        }
    }[];
    isComment?: boolean;
}

const ThreadCard=({
    id,
    currentuserId,
    parentId,
    content,
    author,
    community,
    createdAt,
    comments,
    isComment,
}: Props)=>{
    
    return(
        <article className={`flex w-full flex-col rounded- ${isComment? 'px-0 xs:px-7': 'bg-dark-2 p-7'} `}>
            <div className="flex items-start justify-between">
                <div className='flex w-full flex-1 flex-row gap-4'>
                    <div className="flex flex=col items-center">
                        <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
                            <Image 
                            src={author.image}
                            alt='profile_image'
                            fill
                            className='cursor-pointer rounded-full'
                            />
                        </Link>
                        <div className='thread-card_bar'/>
                    </div>
                    <div className='flex w-full flex-col'>
                    <Link href={`/profile/${author.id}`} className='w-fi'>
                        <h4 className='cursor-poiner text-base-semibold text-light-1'>{author.name}</h4>    
                    </Link>
                        <p className='mt-2 text-small-regular text-light-2'>{content}</p>
                        <div className='mt-5 flex flex-col gap-3'>
                            <div className='flex gap-3.5'>
                                <Image src={heartlogo} alt='heart' width={24} height={24} className='crusor-pointer object-contain'/>
                                <Link href={`/thread/${id}`}>
                                    <Image src={replylogo} alt='reply' width={24} height={24} className='crusor-pointer object-contain'/>
                                </Link>   
                                <Image src={repostlogo} alt='repost' width={24} height={24} className='crusor-pointer object-contain'/> 
                                <Image src={sharelogo} alt='share' width={24} height={24} className='crusor-pointer object-contain'/> 
                            </div>


                        {isComment && comments.length>0 &&(
                            <Link href={`/thread/${id}`}>
                                <p className="mt-1 text-subtle-medium text-gray-1">{comments.length} replies</p>
                            </Link>
                        )}
                        </div>


                    </div>
                </div>
            </div>
        </article>
    )

}

export default ThreadCard;