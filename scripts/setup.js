import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to execute commands and handle errors
function runCommand(command) {
    try {
        console.log(`Running: ${command}`);
        execSync(command, { stdio: 'inherit' });
        return true;
    } catch (error) {
        console.error(`Command failed: ${command}`);
        console.error(error.message);
        return false;
    }
}

// Function to ask questions
function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function setup() {
    console.log('Starting project setup...');

    // Check if .env file exists, create if not
    const envPath = path.join(process.cwd(), '.env');
    if (!fs.existsSync(envPath)) {
        console.log('Creating .env file...');
        const databaseUrl = await question('Enter your database URL (e.g. postgresql://user:password@localhost:5432/mydb): ');
        fs.writeFileSync(envPath, `DATABASE_URL="${databaseUrl}"\n`);
        console.log('.env file created successfully');
    }

    // Install dependencies
    console.log('Installing dependencies...');
    if (!runCommand('npm install')) {
        console.error('Failed to install dependencies');
        return;
    }

    // Generate Prisma client
    console.log('Generating Prisma client...');
    if (!runCommand('npx prisma generate')) {
        console.error('Failed to generate Prisma client');
        return;
    }

    // Run migrations
    console.log('Running database migrations...');
    if (!runCommand('npx prisma migrate dev --name init')) {
        console.error('Failed to run migrations');
        return;
    }

    // Seed the database
    console.log('Seeding the database...');
    if (!runCommand('npx prisma db seed')) {
        console.error('Failed to seed the database');
        return;
    }

    // Setup Casbin policies
    console.log('Setting up authorization policies...');
    if (!runCommand('node scripts/setup-casbin.js')) {
        console.warn('Warning: Failed to setup Casbin policies. You may need to set them up manually.');
    }

    console.log('\n✅ Setup completed successfully!');
    console.log('You can now start the application with: npm start');

    rl.close();
}

setup().catch(error => {
    console.error('Setup failed:', error);
    rl.close();
    process.exit(1);
});