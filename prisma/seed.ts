import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create sample users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@example.com',
        phone: '+1-555-0123',
        location: 'San Francisco, CA',
        bio: 'Retired teacher passionate about education and community service.',
        interests: JSON.stringify(['Education', 'Community Development', 'Social Services']),
        experience: 'Professional background',
        availability: 'Weekdays only',
        skills: JSON.stringify(['Teaching', 'Mentoring', 'Organization']),
        joinDate: new Date('2023-01-15')
      }
    }),
    prisma.user.create({
      data: {
        firstName: 'Maria',
        lastName: 'Garcia',
        email: 'maria.garcia@example.com',
        phone: '+1-555-0456',
        location: 'Los Angeles, CA',
        bio: 'Healthcare professional looking to give back to the community.',
        interests: JSON.stringify(['Healthcare', 'Social Services', 'Community Development']),
        experience: 'Experienced volunteer',
        availability: 'Weekends only',
        skills: JSON.stringify(['Medical', 'Patient Care', 'Communication']),
        joinDate: new Date('2023-03-20')
      }
    }),
    prisma.user.create({
      data: {
        firstName: 'Robert',
        lastName: 'Johnson',
        email: 'robert.johnson@example.com',
        phone: '+1-555-0789',
        location: 'Chicago, IL',
        bio: 'Retired engineer interested in environmental conservation.',
        interests: JSON.stringify(['Environment', 'Education', 'Community Development']),
        experience: 'Some experience',
        availability: 'Flexible schedule',
        skills: JSON.stringify(['Engineering', 'Problem Solving', 'Project Management']),
        joinDate: new Date('2023-02-10')
      }
    })
  ]);

  console.log(`✅ Created ${users.length} users`);

  // Create sample organizations
  const organizations = await Promise.all([
    prisma.organization.create({
      data: {
        name: 'Community Food Bank',
        description: 'Providing food assistance to families in need across the city.',
        mission: 'To eliminate hunger in our community through food distribution and education.',
        website: 'https://communityfoodbank.org',
        location: 'San Francisco, CA',
        contactEmail: 'volunteer@communityfoodbank.org',
        contactPhone: '+1-555-1000',
        isVerified: true
      }
    }),
    prisma.organization.create({
      data: {
        name: 'Senior Care Center',
        description: 'Supporting elderly residents with companionship and daily activities.',
        mission: 'Enhancing the quality of life for seniors through compassionate care and social engagement.',
        website: 'https://seniorcarecenter.org',
        location: 'Los Angeles, CA',
        contactEmail: 'volunteer@seniorcarecenter.org',
        contactPhone: '+1-555-2000',
        isVerified: true
      }
    }),
    prisma.organization.create({
      data: {
        name: 'Environmental Conservation Society',
        description: 'Protecting and preserving local ecosystems and natural resources.',
        mission: 'To inspire environmental stewardship and conservation action in our community.',
        website: 'https://ecs.org',
        location: 'Chicago, IL',
        contactEmail: 'volunteer@ecs.org',
        contactPhone: '+1-555-3000',
        isVerified: true
      }
    })
  ]);

  console.log(`✅ Created ${organizations.length} organizations`);

  // Create sample opportunities
  const opportunities = await Promise.all([
    prisma.opportunity.create({
      data: {
        title: 'Food Distribution Volunteer',
        description: 'Help distribute food packages to families in need.',
        longDescription: 'Join our team of dedicated volunteers to help sort, package, and distribute food to families facing food insecurity. This role involves physical activity and direct interaction with community members.',
        category: 'Food & Nutrition',
        location: 'San Francisco, CA',
        duration: '4 hours per shift',
        startDate: new Date('2024-01-15'),
        requirements: JSON.stringify(['Reliable transportation', 'Ability to lift 20+ lbs', 'Friendly demeanor']),
        benefits: JSON.stringify(['Make a direct impact', 'Meet community members', 'Flexible scheduling']),
        skills: JSON.stringify(['Organization', 'Communication', 'Physical stamina']),
        maxVolunteers: 15,
        organizationId: organizations[0].id
      }
    }),
    prisma.opportunity.create({
      data: {
        title: 'Senior Companion',
        description: 'Provide companionship and support to elderly residents.',
        longDescription: 'Spend quality time with seniors, engaging in conversations, activities, and providing emotional support. This role is perfect for those who enjoy listening and building meaningful relationships.',
        category: 'Social Services',
        location: 'Los Angeles, CA',
        duration: '2-3 hours per visit',
        startDate: new Date('2024-01-20'),
        requirements: JSON.stringify(['Patience and empathy', 'Reliable schedule', 'Background check required']),
        benefits: JSON.stringify(['Meaningful connections', 'Learn from life experiences', 'Flexible timing']),
        skills: JSON.stringify(['Active listening', 'Patience', 'Communication']),
        maxVolunteers: 10,
        organizationId: organizations[1].id
      }
    }),
    prisma.opportunity.create({
      data: {
        title: 'Park Cleanup Volunteer',
        description: 'Help maintain and beautify local parks and green spaces.',
        longDescription: 'Join our monthly park cleanup events to remove litter, maintain trails, and plant native species. This is a great way to enjoy the outdoors while helping the environment.',
        category: 'Environment',
        location: 'Chicago, IL',
        duration: '3 hours per event',
        startDate: new Date('2024-01-25'),
        requirements: JSON.stringify(['Comfortable with outdoor work', 'Closed-toe shoes', 'Weather-appropriate clothing']),
        benefits: JSON.stringify(['Fresh air and exercise', 'Environmental impact', 'Community building']),
        skills: JSON.stringify(['Physical stamina', 'Attention to detail', 'Teamwork']),
        maxVolunteers: 25,
        organizationId: organizations[2].id
      }
    })
  ]);

  console.log(`✅ Created ${opportunities.length} opportunities`);

  // Create sample volunteer history
  const volunteerHistory = await Promise.all([
    prisma.volunteerHistory.create({
      data: {
        userId: users[0].id,
        opportunityId: opportunities[0].id,
        organizationId: organizations[0].id,
        title: 'Food Distribution Volunteer',
        organization: 'Community Food Bank',
        startDate: new Date('2023-06-01'),
        endDate: new Date('2023-12-31'),
        hours: 48,
        status: 'completed'
      }
    }),
    prisma.volunteerHistory.create({
      data: {
        userId: users[1].id,
        opportunityId: opportunities[1].id,
        organizationId: organizations[1].id,
        title: 'Senior Companion',
        organization: 'Senior Care Center',
        startDate: new Date('2023-08-01'),
        hours: 36,
        status: 'active'
      }
    }),
    prisma.volunteerHistory.create({
      data: {
        userId: users[2].id,
        opportunityId: opportunities[2].id,
        organizationId: organizations[2].id,
        title: 'Park Cleanup Volunteer',
        organization: 'Environmental Conservation Society',
        startDate: new Date('2023-09-01'),
        endDate: new Date('2023-11-30'),
        hours: 24,
        status: 'completed'
      }
    })
  ]);

  console.log(`✅ Created ${volunteerHistory.length} volunteer history records`);

  // Create sample achievements
  const achievements = await Promise.all([
    prisma.achievement.create({
      data: {
        userId: users[0].id,
        title: 'First Month Milestone',
        description: 'Completed 20+ hours of volunteering in your first month',
        icon: '🌟',
        earnedAt: new Date('2023-07-01')
      }
    }),
    prisma.achievement.create({
      data: {
        userId: users[1].id,
        title: 'Consistency Champion',
        description: 'Maintained regular volunteering schedule for 6+ months',
        icon: '🏆',
        earnedAt: new Date('2024-01-01')
      }
    }),
    prisma.achievement.create({
      data: {
        userId: users[2].id,
        title: 'Environmental Steward',
        description: 'Participated in 5+ environmental conservation activities',
        icon: '🌱',
        earnedAt: new Date('2023-12-01')
      }
    })
  ]);

  console.log(`✅ Created ${achievements.length} achievements`);

  // Create sample reviews
  const reviews = await Promise.all([
    prisma.review.create({
      data: {
        userId: users[0].id,
        opportunityId: opportunities[0].id,
        rating: 5,
        comment: 'Excellent organization and meaningful work. Highly recommend!',
        isPublic: true
      }
    }),
    prisma.review.create({
      data: {
        userId: users[1].id,
        organizationId: organizations[1].id,
        rating: 5,
        comment: 'Wonderful experience working with seniors. The staff is very supportive.',
        isPublic: true
      }
    }),
    prisma.review.create({
      data: {
        userId: users[2].id,
        opportunityId: opportunities[2].id,
        rating: 4,
        comment: 'Great way to give back to the community while enjoying nature.',
        isPublic: true
      }
    })
  ]);

  console.log(`✅ Created ${reviews.length} reviews`);

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
