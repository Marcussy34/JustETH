import React, { useState, useEffect } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../counter/declarations/counter_backend/counter_backend.did.js';

const LOCAL_IC_URL = "http://127.0.0.1:4943";
const CANISTER_ID = "by6od-j4aaa-aaaaa-qaadq-cai";

export default function CreateStore() {
  const [newStore, setNewStore] = useState({ name: '', imageUrl: '' });
  const [foodRatingActor, setFoodRatingActor] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    initActor();
  }, []);

  const initActor = async () => {
    try {
      const agent = new HttpAgent({ host: LOCAL_IC_URL });
      await agent.fetchRootKey();
      
      const actor = Actor.createActor(idlFactory, {
        agent,
        canisterId: CANISTER_ID,
      });
      setFoodRatingActor(actor);
    } catch (err) {
      setError(`Failed to initialize actor: ${err.message}`);
    }
  };

  const handleCreateStore = async () => {
    try {
      if (!foodRatingActor) throw new Error('Actor not initialized');
      await foodRatingActor.createStore(newStore.name, newStore.imageUrl);
      setNewStore({ name: '', imageUrl: '' });
      setSuccessMessage('Store created successfully!');
      setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
    } catch (err) {
      setError(`Failed to create store: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Create New Store</h1>
        
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {successMessage && <div className="text-green-500 text-center mb-4">{successMessage}</div>}
        
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Store Name"
            value={newStore.name}
            onChange={(e) => setNewStore({...newStore, name: e.target.value})}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newStore.imageUrl}
            onChange={(e) => setNewStore({...newStore, imageUrl: e.target.value})}
            className="w-full border p-2 rounded"
          />
          <button 
            onClick={handleCreateStore} 
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          >
            Create Store
          </button>
        </div>
      </div>
    </div>
  );
}