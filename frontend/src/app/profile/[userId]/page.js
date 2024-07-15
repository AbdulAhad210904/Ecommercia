import { PrismaClient } from '@prisma/client'
import UserProfile from '../../components/UserProfile'// src/app/profile/[userId]/page.js
import Navbar from '@/app/components/Navbar';
const prisma = new PrismaClient();

const ProfilePage = async ({ params }) => {
  const { userId } = params;

  let user = null;

  try {
    user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    console.error('Error fetching user:', error);
  }
  console.log(user);

  return (
    <div>
        <Navbar />
      {user ? (
        <UserProfile user={user} />
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export default ProfilePage;
