import { PrismaClient } from "@prisma/client";

// prisma-client is the query interface for Prisma

const prisma = new PrismaClient();

async function main() {
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
}

main()
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
