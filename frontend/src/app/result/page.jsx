'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';

const ResultPage = ({ searchParams}) => {
  const session_id = searchParams.session_id;
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session_id) {
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
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Session not found</div>;
  }

  return (
    <div>
      <h1>Payment Result</h1>
      {session.payment_status === 'paid' ? (
        <div>
          <p>Thank you for your donation!</p>
          <p>Payment ID: {session.id}</p>
          <p>Amount: ${(session.amount_total / 100).toFixed(2)} {session.currency.toUpperCase()}</p>
        </div>
      ) : (
        <div>
          <p>Payment failed or was canceled.</p>
        </div>
      )}
    </div>
  );
};

export default ResultPage;
