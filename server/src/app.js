import express from 'express'
import morgan from 'morgan'
import Knex from 'knex'
import { ApolloServer } from 'apollo-server-express'
import createSchema from './graphql'
import knexConfig from '../knexfile'
import { createLoaders } from './graphql/resolvers'

const knex = Knex(knexConfig.development)
const schema = createSchema()

const apollo = new ApolloServer({ schema, context: { loaders: createLoaders(knex), knex } })
const app = express()
app.use(morgan('combined'))

apollo.applyMiddleware({ app })

app.listen(3000, () => console.log('running graphql server on port 3000'))
