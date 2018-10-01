import express from 'express'
import { graphqlExpress } from 'apollo-server-express'
import morgan from 'morgan'
import Knex from 'knex'
import createSchema from './graphql'
import knexConfig from '../knexfile'
import { createLoaders } from './graphql/resolvers'
const expressPlayground = require('graphql-playground-middleware-express').default

const knex = Knex(knexConfig.development)
const schema = createSchema()

const app = express()
app.use(morgan('combined'))

app.get('/graphql/playground', expressPlayground({ endpoint: 'graphql' }), (req, res) => { })
app.use('/graphql', express.json(), graphqlExpress(req => ({ debug: true, schema, context: { loaders: createLoaders(knex), knex } })))

app.listen(3000, () => console.log('running graphql server on port 3000'))
