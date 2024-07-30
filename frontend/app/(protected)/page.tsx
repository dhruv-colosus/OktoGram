import Stories from "../Components/Stories";

export default function Home() {
  return (
    <>
      <div className="flex w-full h-full">
        <div className="flex-grow w-4/5 p-5">
          <h2 className="font-web3 font-bold text-2xl mb-4">Latest Stories</h2>
          <Stories />
          <h2 className="font-web3 font-bold text-2xl mb-4 mt-8">New Posts</h2>
        </div>
        <div className="flex-grow w-1/5  h-full p-5">Right Section</div>
      </div>
    </>
  );
}
