import "reflect-metadata"
import { PrismaClient } from "@prisma/client"
import { ApolloServer } from "apollo-server"
import { resolvers } from "@generated/type-graphql"
import * as tq from "type-graphql"

const prisma = new PrismaClient()

const app = async () => {
	const schema = await tq.buildSchema({
		resolvers,
		emitSchemaFile: true,
		validate: false,
	})

	const server = new ApolloServer({
		schema,
		context: { prisma },
	})

	server.listen().then(async ({ url }) => {
		console.log(`sever listening at port ${url}`)
	})
}

app()
