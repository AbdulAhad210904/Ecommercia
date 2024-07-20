import { NextResponse } from 'next/server';
import prisma from '../../prisma';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
  }
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
  }
  console.log(user);

}
