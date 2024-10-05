import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { IDKitWidget } from '@worldcoin/idkit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ethers } from 'ethers';
import PromptABI from './abi/commentabi.json';
import { Spinner } from "@nextui-org/spinner";

export default function OrderConfirmation() {
  const router = useRouter();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [contract, setContract] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const [evaluationLoading, setEvaluationLoading] = useState(false);
  const [submissionLoading, setSubmissionLoading] = useState(false);

  useEffect(() => {
    const initContract = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider('https://opt-sepolia.g.alchemy.com/v2/2iPF_MT9jp-O4mQ0eWd1HpeamV3zWWt4');
        const privateKey = '28f88112e577b6a15dde9fb7868fcd01954f7ccc02c61797d664db7a9a4e0f5a';
        const signer = new ethers.Wallet(privateKey, provider);
        const contractAddress = '0x1C21be151F96aFC8Db713F2d1D631fd163ea06ac';
        const contract = new ethers.Contract(contractAddress, PromptABI, signer);
        setContract(contract);
      } catch (error) {
        console.error('Error initializing contract:', error);
        toast.error('Failed to initialize contract');
      }
    };

    initContract();
  }, []);

  useEffect(() => {
    if (contract) {
      contract.on('commentEvaluation', (requestId, modelId, input, output, callbackData) => {
        setEvaluation(parseInt(output));
        setEvaluationLoading(false);
      });

      return () => {
        contract.removeAllListeners('commentEvaluation');
      };
    }
  }, [contract]);

  useEffect(() => {
    const evaluateComment = async () => {
      if (!contract || !review.trim() || evaluationLoading) return;

      setEvaluationLoading(true);
      setEvaluation(null); // Reset evaluation when starting new evaluation

      try {
        // Add a small delay to ensure the spinner is visible
        await new Promise(resolve => setTimeout(resolve, 1000));

        const modelId = 11;
        const estimatedFee = await contract.estimateFee(modelId);

        const tx = await contract.evaluateComment(modelId, review, {
          value: estimatedFee,
          gasLimit: ethers.utils.hexlify(3000000),
          gasPrice: ethers.utils.parseUnits('20', 'gwei')
        });

        await tx.wait();
      } catch (error) {
        console.error('Error occurred during evaluation:', error);
        setEvaluationLoading(false);
        toast.error('Failed to evaluate review');
      }
    };

    const debounce = setTimeout(() => {
      if (review.trim()) {
        evaluateComment();
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [review, contract]);

  const handleReviewSubmit = async (verified) => {
    if (verified) {
      setSubmissionLoading(true);
      try {
        // Simulating a transaction delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log('Submitting review:', { review, rating });
        toast.success('Review submitted successfully!', {
          autoClose: 1000,
          onClose: () => router.push('/reviews')
        });
      } catch (error) {
        toast.error('Failed to submit review. Please try again.');
      } finally {
        setSubmissionLoading(false);
      }
    } else {
      toast.error('WorldID verification failed. Please try again.');
    }
  };

  const getEvaluationDisplay = () => {
    if (evaluationLoading) {
      return (
        <div className="flex items-center justify-center h-8">
          <Spinner // Updated Spinner usage
            size="md"
            color="primary"
          />
        </div>
      );
    }
    if (evaluation === null) {
      return <span className="text-gray-500 text-2xl">-</span>;
    }
    return <span className="text-2xl font-bold text-blue-600">{evaluation}%</span>;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center pt-24 pb-12">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Thank you for your order!</h1>
          <p className="mb-4 text-gray-700">We hope you enjoy your meal. Would you like to leave a review?</p>
          
          <div className="mb-4 p-4 bg-blue-100 rounded-lg">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Review Confidence Score:</p>
              <div className="min-w-[60px] flex items-center justify-center">
                {getEvaluationDisplay()}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="review" className="block text-gray-700 mb-2">Your Review:</label>
            <textarea
              id="review"
              className="w-full p-2 border rounded text-black"
              rows="4"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              disabled={evaluationLoading || submissionLoading}
              placeholder="Write your review here..."
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Rating:</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  disabled={evaluationLoading || submissionLoading}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <IDKitWidget
        action={process.env.NEXT_PUBLIC_WLD_ACTION || "food-rating"}
        signal="user-review"
        onSuccess={() => handleReviewSubmit(true)}
        onError={() => handleReviewSubmit(false)}
        app_id={process.env.NEXT_PUBLIC_WLD_APP_ID}
      >
        {({ open }) => (
          <button
            onClick={open}
            className={`w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center ${
              (evaluationLoading || submissionLoading) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={evaluationLoading || submissionLoading}
          >
            {submissionLoading || evaluationLoading ? (
              <>
                <Spinner // Updated Spinner usage
                  size="sm"
                  color="white"
                  className="mr-2"
                />
                {submissionLoading ? 'Submitting...' : 'Evaluating...'}
              </>
            ) : (
              'Submit Review with WorldID'
            )}
          </button>
        )}
      </IDKitWidget>
          <p className="mt-2 text-sm text-gray-600">
            We use WorldID to ensure reviews are authentic and not generated by bots.{' '}
            <span className="text-blue-500 underline cursor-pointer">
              Read more
            </span>
          </p>
          </div>
      </main>
      
      <ToastContainer position="top-center" />
      <Footer />
    </div>
  );
}