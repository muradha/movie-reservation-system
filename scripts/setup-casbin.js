import { PrismaClient } from '@prisma/client';
import { newEnforcer } from 'casbin';
import { PrismaAdapter } from 'casbin-prisma-adapter';
import path from 'path';

const prisma = new PrismaClient();

async function setupCasbin() {
    console.log('Setting up Casbin policies...');

    try {
        // Initialize Casbin with Prisma adapter
        const adapter = await PrismaAdapter.newAdapter();
        const enforcer = await newEnforcer(path.resolve('./model.conf'), adapter);

        // Load existing policies first
        await enforcer.loadPolicy();

        // Clear existing policies
        enforcer.clearPolicy();

        // Save the empty policy state to database
        await enforcer.savePolicy();

        // Add policies for admin role
        await enforcer.addPolicy('admin', 'users', 'read');
        await enforcer.addPolicy('admin', 'users', 'write');
        await enforcer.addPolicy('admin', 'users', 'delete');

        // Add policies for user role
        await enforcer.addPolicy('user', 'movies', 'read');
        await enforcer.addPolicy('user', 'reservations', 'read');
        await enforcer.addPolicy('user', 'reservations', 'write');
        await enforcer.addPolicy('user', 'watch_list', 'read');
        await enforcer.addPolicy('user', 'watch_list', 'write');

        // Save policies to the database
        await enforcer.savePolicy();

        console.log('Casbin policies have been set up successfully');
    } catch (error) {
        console.error('Failed to set up Casbin policies:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

setupCasbin().catch(error => {
    console.error(error);
    process.exit(1);
});