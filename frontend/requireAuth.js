"use client";
import { useRouter } from "next/navigation";
import { useEffect } from 'react';

const requireAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token'); // Check for token or your authentication state
      if (!token) {
        router.replace('/login'); // Redirect to login page if not authenticated
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default requireAuth;
