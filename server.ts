import express from "express"
import { PrismaClient } from "@prisma/client"

const app = express()
const PORT = process.env.PORT || 8000

// prisma-client is the query interface for Prisma
const prisma = new PrismaClient()

app.use(express.json())

app.get("/posts", async (req, res) => {
	const posts = await prisma.post.findMany()
	try {
		res.status(200).json({ posts })
	} catch (error) {
		res.status(404).send({ message: "error!" })
	}
})

app.listen(PORT, () => {
	console.log(`app listening on https://localhost:${PORT}`)
})
