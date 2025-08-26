import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// POST create new opportunity
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      title, 
      description, 
      longDescription,
      category, 
      location, 
      duration, 
      startDate, 
      endDate, 
      requirements, 
      benefits, 
      skills, 
      maxVolunteers,
      organizationId 
    } = body;

    // Validate required fields
    if (!title || !description || !category || !location || !duration || !organizationId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create opportunity
    const opportunity = await prisma.opportunity.create({
      data: {
        title,
        description,
        longDescription,
        category,
        location,
        duration,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        requirements: JSON.stringify(requirements || []),
        benefits: JSON.stringify(benefits || []),
        skills: JSON.stringify(skills || []),
        maxVolunteers: maxVolunteers ? parseInt(maxVolunteers) : null,
        organizationId
      },
      include: {
        organization: {
          select: {
            name: true,
            logo: true
          }
        }
      }
    });

    return NextResponse.json(
      { 
        message: 'Opportunity created successfully',
        opportunity 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating opportunity:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET all opportunities with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const location = searchParams.get('location') || '';
    const organizationId = searchParams.get('organizationId') || '';

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      isActive: true
    };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { longDescription: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (category) {
      where.category = category;
    }

    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }

    if (organizationId) {
      where.organizationId = organizationId;
    }

    const [opportunities, total] = await Promise.all([
      prisma.opportunity.findMany({
        where,
        include: {
          organization: {
            select: {
              name: true,
              logo: true,
              isVerified: true
            }
          },
          _count: {
            select: {
              applications: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.opportunity.count({ where })
    ]);

    // Parse JSON strings back to arrays
    const parsedOpportunities = opportunities.map(opp => ({
      ...opp,
      requirements: JSON.parse(opp.requirements || '[]'),
      benefits: JSON.parse(opp.benefits || '[]'),
      skills: JSON.parse(opp.skills || '[]')
    }));

    return NextResponse.json({
      opportunities: parsedOpportunities,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
