import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET opportunity by ID
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const opportunity = await prisma.opportunity.findUnique({
            where: { id: params.id },
            include: {
                organization: {
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
                        isVerified: true
                    }
                },
                applications: {
                    select: {
                        id: true,
                        status: true,
                        appliedAt: true,
                        user: {
                            select: {
                                firstName: true,
                                lastName: true,
                                email: true
                            }
                        }
                    }
                }
            }
        });

        if (!opportunity) {
            return NextResponse.json({ error: 'Opportunity not found' }, { status: 404 });
        }

        // Parse JSON strings back to arrays
        const parsedOpportunity = {
            ...opportunity,
            requirements: JSON.parse(opportunity.requirements || '[]'),
            benefits: JSON.parse(opportunity.benefits || '[]'),
            skills: JSON.parse(opportunity.skills || '[]')
        };

        return NextResponse.json(parsedOpportunity);
    } catch (error) {
        console.error('Error fetching opportunity:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// PUT update opportunity
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
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
            isActive,
            isFeatured
        } = body;

        const updatedOpportunity = await prisma.opportunity.update({
            where: { id: params.id },
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
                isActive,
                isFeatured,
                updatedAt: new Date()
            }
        });

        return NextResponse.json(updatedOpportunity);
    } catch (error) {
        console.error('Error updating opportunity:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// DELETE opportunity
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Soft delete by setting isActive to false
        await prisma.opportunity.update({
            where: { id: params.id },
            data: {
                isActive: false,
                updatedAt: new Date()
            }
        });

        return NextResponse.json({ message: 'Opportunity deleted successfully' });
    } catch (error) {
        console.error('Error deleting opportunity:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
