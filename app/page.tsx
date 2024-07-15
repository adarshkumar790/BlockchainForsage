"use client"
import React, { useState } from 'react';
import { register, buyLevel, getUser } from '@/web3/web3';

const App: React.FC = () => {
    const [userAddress, setUserAddress] = useState<string>('');
    const [referrerAddress, setReferrerAddress] = useState<string>('');
    const [matrix, setMatrix] = useState<number>(1);
    const [level, setLevel] = useState<number>(1);
    const [userData, setUserData] = useState<any>(null);

    const handleRegister = async () => {
        try {
            await register(referrerAddress);
            alert('Registration successful');
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed');
        }
    };

    const handleBuyLevel = async () => {
        try {
            await buyLevel(matrix, level);
            alert('Level purchase successful');
        } catch (error) {
            console.error('Level purchase failed:', error);
            alert('Level purchase failed');
        }
    };

    const handleGetUser = async () => {
        try {
            const user = await getUser(userAddress);
            setUserData(user);
        } catch (error) {
            console.error('Fetch user failed:', error);
            alert('Fetch user failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <h1 className="text-3xl font-extrabold text-center text-gray-900">SmartMatrixForsage DApp</h1>
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-xl font-bold mb-4">Register</h2>
                    <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                        placeholder="Referrer Address"
                        value={referrerAddress}
                        onChange={(e) => setReferrerAddress(e.target.value)}
                    />
                    <button
                        onClick={handleRegister}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Register
                    </button>
                </div>
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-xl font-bold mb-4">Buy Level</h2>
                    <input
                        type="number"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                        placeholder="Matrix (1 or 2)"
                        value={matrix}
                        onChange={(e) => setMatrix(parseInt(e.target.value))}
                    />
                    <input
                        type="number"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                        placeholder="Level"
                        value={level}
                        onChange={(e) => setLevel(parseInt(e.target.value))}
                    />
                    <button
                        onClick={handleBuyLevel}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Buy Level
                    </button>
                </div>
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-xl font-bold mb-4">Get User Data</h2>
                    <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                        placeholder="User Address"
                        value={userAddress}
                        onChange={(e) => setUserAddress(e.target.value)}
                    />
                    <button
                        onClick={handleGetUser}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Get User
                    </button>
                    {userData && (
                        <div className="mt-4">
                            <p><strong>User ID:</strong> {userData.id}</p>
                            <p><strong>Referrer:</strong> {userData.referrer}</p>
                            <p><strong>Partners Count:</strong> {userData.partnersCount}</p>
                            {/* Display other user data as needed */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
