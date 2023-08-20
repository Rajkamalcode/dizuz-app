import Image from "next/image";

interface Props{
    accountId: string;
    authUserId: string;
    name: string;
    username: string;
    imgUrl: string;
    bio:string;
    
}

const ProfileHeader = (
    {
    accountId,
    authUserId,
    name,
    username,
    imgUrl,
    bio
    } : Props ) =>{
    return(
        <div className="flex flex-col items-left justify-center w-full">
        <div className="flex items-center space-x-3">
          <div className="relative h-20 w-20">
            <Image
              src={imgUrl}
              alt="Profile"
              className="rounded-full object-cover shadow-2xl"
              width={80}
              height={80}
            />
          </div>
          <div>
            <h2 className="text-heading3-bold text-light-1">{name}</h2>
            <p className="text-base-medium text-gray-1">@{username}</p>
          </div>
        </div>
        <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>
        <div className="mt-2 h-0.5 w-full bg-dark-3" />
      </div>
    )


}

export default ProfileHeader;