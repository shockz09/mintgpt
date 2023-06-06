import Navbar from "./components/navbar"
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  // What we want to render
  return (
    <div className="bg-black text-white font-sans">
      <div className="min-h-screen flex flex-col">
        {/* Navbar */}

        <Navbar />

        {/* Added nav-btn class to button */}

        {/* Content */}
        <div className="flex-grow py-8 px-4 -mt-24 flex flex-col md:flex-row items-center justify-center">
          <div className="max-w-md lg:max-w-xl md:mr-6 font-red-hat-display">
            <h1 className="text-4xl font-bold text-left text-white mb-4">MintGPT</h1>
            <p className="text-lg text-gray-200 mb-4">MintGPT is an AI-powered platform that allows users to generate text and turn it into unique, high-quality images using DALL-E. With MintGPT, users can create one-of-a-kind NFTs by interacting with state-of-the-art AI models. Try it today and discover the endless possibilities!</p>
            <button onClick={() => {
              router.push('/create')
            }} className='bg-[#512DA8] p-2 pl-4 pr-4 rounded-md'>Start now </button>
          </div>
          <img src="https://images.openai.com/blob/5f1ce4c2-c06b-4d4d-828a-e90c89680db4/dall-e-now-available-without-waitlist.jpg?trim=0,0,0,0&width=400" alt="Sample image" className="w-64 h-64 object-cover md:ml-12 rounded-lg shadow-lg" />
        </div>
      </div>
    </div>)
};
