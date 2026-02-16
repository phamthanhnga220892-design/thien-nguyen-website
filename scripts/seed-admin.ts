import bcrypt from 'bcryptjs';
import dbConnect from '../lib/mongodb';
import User from '../models/User';

async function seedAdminUser() {
    try {
        await dbConnect();

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'phamthanhnga220892@gmail.com' });

        if (existingAdmin) {
            console.log('✅ Admin user already exists!');
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash('admin123', 10);

        // Create admin user
        const admin = await User.create({
            email: 'phamthanhnga220892@gmail.com',
            password: hashedPassword,
            name: 'Phạm Thanh Nga',
            role: 'admin',
        });

        console.log('✅ Admin user created successfully!');
        console.log('📧 Email:', admin.email);
        console.log('🔑 Password: admin123');
        console.log('⚠️  Please change the password after first login!');
    } catch (error) {
        console.error('❌ Error seeding admin user:', error);
    } finally {
        process.exit();
    }
}

seedAdminUser();
