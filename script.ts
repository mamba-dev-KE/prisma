import { PrismaClient } from "@prisma/client";

// prisma-client is the query interface for Prisma

const prisma = new PrismaClient();

export async function main() {
	const posts = await prisma.user
		.findFirst({
			where: {
				email: {
					contains: "mamba",
				},
			},
		})
		.posts({
			include: { author: true },
		});

	console.dir(posts, { depth: Infinity });

	// create new prisma record
	const newPost = await prisma.post.create({
		data: {
			title: "Prisma article 2",
			content: "what a great article!",
			authorId: 1,
		},
	});

	// console.dir(newPost, { depth: Infinity });
}

main()
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
