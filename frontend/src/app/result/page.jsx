'use client'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/cart/cartThunk';
import { getUserIdFromToken } from '../authUtils';
import Link from 'next/link';
import axios from 'axios';

const ResultPage = ({ searchParams }) => {
  const dispatch = useDispatch();
  const userId = getUserIdFromToken(); // Get the user ID from the token

  const session_id = searchParams.session_id;
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session_id) {
      dispatch(clearCart(userId));
      // Fetch the session details from your backend
      const fetchSession = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/checkout-session/${session_id}`);
          setSession(response.data);
        } catch (error) {
          console.error('Error fetching session:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchSession();
    }
  }, [session_id]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!session) {
    return <div className="flex items-center justify-center h-screen">Session not found</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-lg p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Payment Result</h1>
        {session.payment_status === 'paid' ? (
          <div>
            <p className="text-green-600 dark:text-green-400 mb-2">Thank you for Shopping!</p>
            <p className="text-gray-700 dark:text-gray-300 mb-2">Payment ID:</p>
            <p className="text-gray-700 dark:text-gray-300 overflow-hidden overflow-ellipsis">{session.id}</p>
            <p className="text-gray-700 dark:text-gray-300 mb-2">Amount: ${(session.amount_total / 100).toFixed(2)} {session.currency.toUpperCase()}</p>
          </div>
        ) : (
          <div>
            <p className="text-red-600 dark:text-red-400">Payment failed or was canceled.</p>
          </div>
        )}

        <div className="mt-4">
            <Link  href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition duration-300 ease-in-out">
              Back to Main Page
            </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
