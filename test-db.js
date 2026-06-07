const { PrismaClient } = require('@prisma/client');

async function testConnection() {
  const prisma = new PrismaClient();

  try {
    // Test basic connection
    await prisma.$connect();
    console.log('✅ Database connection successful!');

    // Test querying the User table
    const userCount = await prisma.user.count();
    console.log(`✅ User table accessible. Current user count: ${userCount}`);

    // Test querying the Record table
    const recordCount = await prisma.record.count();
    console.log(
      `✅ Record table accessible. Current record count: ${recordCount}`
    );

    console.log('🎉 All database tests passed!');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
