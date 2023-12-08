"use client";

import { useState } from "react";
import { Router } from "next/router";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

const preferenceAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_primaryAddress",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "_secondaryAddresses",
				"type": "address[]"
			},
			{
				"internalType": "string",
				"name": "_chainPreference",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_tokenPreference",
				"type": "string"
			}
		],
		"name": "registerUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "UserRegistered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "secondary",
				"type": "address"
			}
		],
		"name": "getPrimaryAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "getUserPreferences",
		"outputs": [
			{
				"internalType": "address",
				"name": "primaryAddress",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "secondaryAddresses",
				"type": "address[]"
			},
			{
				"internalType": "string",
				"name": "chainPreference",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "tokenPreference",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "users",
		"outputs": [
			{
				"internalType": "address",
				"name": "primaryAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "chainPreference",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "tokenPreference",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
export default function Create() {
  const [inputs, setInputs] = useState([""]);

  // Function to handle adding a new input field
  const addInput = () => {
    setInputs([...inputs, ""]);
  };

  // Function to handle input changes
  const handleInputChangee = (index: any, value: any) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);
  };

  // Function to handle removing an input field
  const removeInput = (index: any) => {
    const updatedInputs = [...inputs];
    updatedInputs.splice(index, 1);
    setInputs(updatedInputs);
  };
  const [nameData, setNameData] = useState({
    daoName: "",
  });
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };
  const handleCurrencyChange = (event: any) => {
    setSelectedCurrency(event.target.value);
  };

  const deployContract = async (event: any) => {
    event.preventDefault();
    console.log(nameData.daoName, inputs, selectedOption, selectedCurrency);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract("0x096AC235D1d7F1D60750384a3Ec80AE5801143a5", preferenceAbi, signer);
    const txn = await contract.registerUser(nameData.daoName, inputs, selectedOption, selectedCurrency);
    await txn.wait();
    console.log(txn);
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setNameData(prevNameData => ({
      ...prevNameData,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <h1 style={{ display: "flex", justifyContent: "center", justifyItems: "center", fontSize: "30px" }}>
          Set your preferences
        </h1>
        <form onSubmit={deployContract} style={{ display: "flex", justifyContent: "center", justifyItems: "center" }}>
          <div>
            <div
              className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1"
              style={{
                border: "1px solid #000000",
                borderRadius: "10px", // Adjust this value to control the roundness
                padding: "10px",
              }}
            >
              <div className="sm:col-span-6">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Primary Address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="daoName"
                    id="first-name"
                    value={nameData.daoName}
                    autoComplete="given-name"
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="p-4">
                {inputs.map((input, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      placeholder="Enter Secondary Address"
                      value={input}
                      onChange={e => handleInputChangee(index, e.target.value)}
                      className="w-64 p-2 border rounded-md mr-2"
                    />
                    <button onClick={() => removeInput(index)} className="px-3 py-2 bg-red-500 text-white rounded-md">
                      Remove
                    </button>
                  </div>
                ))}
                <button onClick={addInput} className="px-3 py-2 bg-blue-500 text-white rounded-md">
                  Add Input
                </button>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                  Choose your preferred chain to get your assets on
                </label>
                <div className="mt-2">
                  <select
                    value={selectedOption}
                    onChange={handleOptionChange}
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="sepolia">Ethereum Sepolia</option>
                    <option value="mumbai">Polygon Mumbai</option>
                    <option value="Base Goerli">Base Goerli</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                  Choose your preferred currency token
                </label>
                <div className="mt-2">
                  <select
                    value={selectedCurrency}
                    onChange={handleCurrencyChange}
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="usdt">USDT</option>
                    <option value="usdc">USDC</option>
                    <option value="eth">ETH/WETH</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save your prefernces on chain
              </button>
            </div>
          </div>
        </form>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
}
