import Link from 'next/link';

const Home = () => {

  return (
    <div>
      <Link href="/main">
        Main
      </Link>
      <br></br>
      <Link href="/login">
        Login
      </Link>
      <br></br>
      <Link href="/signup">
        Signup
      </Link>
    </div>
  );
};

export default Home;
