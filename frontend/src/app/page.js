"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Main from './allproducts/page'; 
import Check from './components/NextauthSignin';

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      router.push('/login');
    }
  }, [router]);

  if (!isAuthenticated) {
    return null; // Return null while redirecting to avoid flashing content
  }

  return (
    <div>
      <Main />
      {/* <Check /> */}
    </div>
  );
};

export default Home;
