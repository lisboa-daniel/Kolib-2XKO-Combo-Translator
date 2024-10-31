'use client';

import { User , ApiKey } from '@/app/lib/definitions';

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function createUser( user : User ) {
	const newUser = await prisma.user.create({
		data: user
	});

	console.log(newUser);
}