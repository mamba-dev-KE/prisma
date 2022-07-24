import { PrismaClient } from "@prisma/client";

// prisma-client is the query interface for Prisma

const prisma = new PrismaClient();

export async function main() {
	// find all users
	const users = await prisma.user.findMany();

	console.dir(users, { depth: Infinity });

	// find all posts
	const posts = await prisma.post.findMany();

	console.dir(posts);

	// create new prisma record

	const newPost = await prisma.post
		.create({
			data: {
				title: "redux",
				content: "redux toolkit",
				author: {
					connectOrCreate: {
						create: {
							email: "sabre-dev@prisma.com",
							name: "sabre-dev",
						},
						where: {
							email: "sabre-dev@prisma.com",
						},
					},
				},
			},
		})
		.catch((error) => console.error(error.message));

	console.dir(newPost, { depth: Infinity });
}

main()
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
