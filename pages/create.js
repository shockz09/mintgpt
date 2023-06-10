import { useState } from "react";
import Image from 'next/image';
import Navbar from "./components/navbar"
import NavBar from "./components/navbar";
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';

export default function Create() {
  // React Hooks
  const [data, setData] = useState({ text: "" });
  const [query, setQuery] = useState();
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ImageURL, setImageURL] = useState("https://i.ibb.co/r6YRLCx/image.png")
  const [nftData, setNftData] = useState();
  const [nftTrue, setnftTrue] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const { publicKey } = useWallet();
  const [imageGenerated, setImageGenerated] = useState(false);
  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const generateText = async () => {

    const res = await fetch(`/api/openai`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: search,
      }),
    });

    const data = await res.json();

    setData(data);
    setQuery(data)
  };
  const generateImage = async () => {
    setIsLoading(true);

    const res = await fetch(`/api/img-generation`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        prompt: query.text, n: 1,
        size: "1024x1024",
      }),
    });
    const data = await res.json();
    console.log(query.text)
    console.log(data);

    // set the ImageURL state variable and update the imageGenerated state variable
    setImageURL(data.url);
    setImageGenerated(true);

    setIsLoading(false);
  }; const handleWalletAddressChange = (event) => {
    setWalletAddress(event.target.value);
  };

  const createNFT = async () => {
    const toAddress = walletAddress ? walletAddress : publicKey.toString();
    const res = await fetch('https://api.underdogprotocol.com/v2/projects/blah/9/nfts', {
      headers: {
        'Authorization': `Bearer ${process.env.UP_API_KEY}`, // Replace with your API key
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        'name': 'Underdog AI Art',
        'image': ImageURL,
        'attributes': {

        },
        'receiverAddress': toAddress
      }),
    });

    const data = await res.json();
    setnftTrue(true)
    setNftData(data);
    console.log(data);
  };

  // What we want to render
  return (
    <div className="min-h-screen bg-black text-gray-50">
      <NavBar />
      {/* Navbar */}
      <nav className=" w-full py-4">
        <div className="max-w-screen-lg mx-auto px-4 flex justify-between items-center">
          <div className="flex-grow">

          </div>
          <div className="flex items-center space-x-4">
            <input
              className="border-gray-500 text-black border rounded-md w-48 px-4 py-2"
              type="text"
              placeholder="Enter a name"
              value={search}
              onChange={handleInputChange}
            />
            <input
              className="border-gray-500 text-black border rounded-md w-48 px-4 py-2"
              type="text"
              placeholder="Enter wallet address"
              value={walletAddress}
              onChange={handleWalletAddressChange}
            />
            <button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md shadow"
              onClick={generateText}
            >
              Generate Text
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow"
              onClick={generateImage}
            >
              Generate Image
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow"
              onClick={createNFT}
              disabled={!imageGenerated}         >              Create NFT
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-screen-lg mx-auto px-4 md:px-8 pt-8 pb-16">
        {/* Text */}
        <div className="w-full md:w-1/2">
          <h2 className="font-bold text-lg text-gray-700 mb-2">Generated Text:</h2>
          <p className="text-gray-500 whitespace-pre-wrap">{data.text}</p>
        </div>

        {/* Image */}
        <div className="flex p-10 justify-center items-center h-64 md:h-auto md:w-1/2 mt-8 md:mt-0">
          {isLoading ? (
            <p className="text-gray-500 font-bold text-xl">Generating image...</p>
          ) : (
            <Image
              className="rounded-lg "
              src={ImageURL}
              alt="Generated image"
              width={400}
              height={400}
            />
          )}
        </div>
        {nftTrue ? <div className="font-bold text-gray-700"> Transaction ID : {nftData.transactionId}</div> : null}
      </main>
    </div>
  );
}
