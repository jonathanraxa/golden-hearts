import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// POST create new organization
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            name,
            description,
            mission,
            website,
            logo,
            location,
            contactEmail,
            contactPhone
        } = body;

        // Validate required fields
        if (!name || !description || !location || !contactEmail) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if organization already exists
        const existingOrg = await prisma.organization.findFirst({
            where: {
                OR: [
                    { name },
                    { contactEmail }
                ]
            }
        });

        if (existingOrg) {
            return NextResponse.json(
                { error: 'Organization with this name or email already exists' },
                { status: 400 }
            );
        }

        // Create organization
        const organization = await prisma.organization.create({
            data: {
                name,
                description,
                mission,
                website,
                logo,
                location,
                contactEmail,
                contactPhone
            }
        });

        return NextResponse.json(
            {
                message: 'Organization created successfully',
                organization
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating organization:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// GET all organizations
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');
        const search = searchParams.get('search') || '';
        const location = searchParams.get('location') || '';

        const skip = (page - 1) * limit;

        const where: any = {
            isActive: true
        };

        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
                { mission: { contains: search, mode: 'insensitive' } }
            ];
        }

        if (location) {
            where.location = { contains: location, mode: 'insensitive' };
        }

        const [organizations, total] = await Promise.all([
            prisma.organization.findMany({
                where,
                select: {
                    id: true,
                    name: true,
                    description: true,
                    mission: true,
                    website: true,
                    logo: true,
                    location: true,
                    contactEmail: true,
                    contactPhone: true,
                    isVerified: true,
                    isActive: true,
                    createdAt: true,
                    _count: {
                        select: {
                            opportunities: true
                        }
                    }
                },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.organization.count({ where })
        ]);

        return NextResponse.json({
            organizations,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching organizations:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
