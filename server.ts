import express from "express"
import { PrismaClient } from "@prisma/client"

const app = express()
const PORT = process.env.PORT || 8000

// prisma-client is the query interface for Prisma
const prisma = new PrismaClient()

app.use(express.json())

// get all posts
app.get("/posts", async (req, res) => {
	const posts = await prisma.post.findMany()
	console.log(posts)

	try {
		res.status(200).json(posts)
	} catch (error) {
		res.status(404).send({ message: "error!" })
	}
})

// get one post
app.get("/posts/:id", async (req, res) => {
	const { id } = req.params

	const post = await prisma.post.findFirst({
		where: {
			id: Number(id),
		},
	})

	try {
		res.status(200).json(post)
	} catch (error) {
		res.status(404).json({ message: `post with id ${id} does not exist!` })
	}
})

// get one user
app.get("/user/:id", async (req, res) => {
	const { id } = req.params

	const user = await prisma.user.findUnique({
		where: {
			id: Number(id),
		},
		include: { posts: true },
	})

	try {
		res.status(200).json(user)
	} catch (error) {
		res.status(404).json({ message: `user with id ${id} does not exist!` })
	}
})

app.listen(PORT, () => {
	console.log(`app listening on https://localhost:${PORT}`)
})
