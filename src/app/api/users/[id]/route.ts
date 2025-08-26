import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET user profile by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      include: {
        volunteeringHistory: {
          orderBy: { startDate: 'desc' },
          take: 10
        },
        achievements: {
          orderBy: { earnedAt: 'desc' },
          take: 5
        },
        reviews: {
          where: { isPublic: true },
          include: {
            opportunity: { select: { title: true } },
            organization: { select: { name: true } }
          },
          orderBy: { createdAt: 'desc' },
          take: 5
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Parse JSON strings back to arrays
    const parsedUser = {
      ...user,
      interests: JSON.parse(user.interests || '[]'),
      skills: JSON.parse(user.skills || '[]')
    };

    // Calculate stats
    const totalHours = user.volunteeringHistory.reduce((sum: number, history: any) => sum + history.hours, 0);
    const totalOpportunities = user.volunteeringHistory.length;
    const totalOrganizations = new Set(user.volunteeringHistory.map((h: any) => h.organization)).size;

    const profile = {
      ...parsedUser,
      stats: {
        totalHours,
        totalOpportunities,
        totalOrganizations,
        rating: 4.9 // This would be calculated from reviews in a real app
      }
    };

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT update user profile
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, location, bio, interests, experience, availability, skills } = body;

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: {
        firstName,
        lastName,
        phone,
        location,
        bio,
        interests: JSON.stringify(interests || []),
        experience,
        availability,
        skills: JSON.stringify(skills || []),
        updatedAt: new Date()
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
