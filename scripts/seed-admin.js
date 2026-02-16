/* eslint-disable @typescript-eslint/no-require-imports */
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// MongoDB URI from .env.local
const MONGODB_URI = 'mongodb+srv://phamthanhnga220892_db_user:admin123@cluster0.lhm1rqc.mongodb.net/thien-nguyen-db?appName=Cluster0&w=majority';

// User Schema
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, default: 'admin' },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seedAdmin() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB!');

        // Check if admin exists
        const existingAdmin = await User.findOne({ email: 'phamthanhnga220892@gmail.com' });

        if (existingAdmin) {
            console.log('✅ Admin user already exists!');
            console.log('📧 Email:', existingAdmin.email);
            console.log('👤 Name:', existingAdmin.name);
            await mongoose.connection.close();
            process.exit(0);
            return;
        }

        // Hash password
        console.log('🔐 Hashing password...');
        const hashedPassword = await bcrypt.hash('admin123', 10);

        // Create admin
        console.log('👤 Creating admin user...');
        await User.create({
            email: 'phamthanhnga220892@gmail.com',
            password: hashedPassword,
            name: 'Phạm Thanh Nga',
            role: 'admin',
        });

        console.log('\n✅ Admin user created successfully!');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📧 Email:    phamthanhnga220892@gmail.com');
        console.log('🔑 Password: admin123');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('⚠️  Please change the password after first login!');
        console.log('\n🌐 Login at: http://localhost:3000/admin/login\n');

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        await mongoose.connection.close();
        process.exit(1);
    }
}

seedAdmin();
