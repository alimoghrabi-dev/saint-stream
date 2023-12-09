import Image from "next/image";

const FetchComment = ({ comment }: any) => {
  return (
    <div className={`flex`}>
      <Image
        src={comment.userPicture}
        alt="user"
        width={50}
        height={50}
        className="rounded-full"
      />
      <p className="text-gray-100 font-semibold text-lg">{comment.prompt}</p>
    </div>
  );
};

export default FetchComment;
