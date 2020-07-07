/* Import faunaDB sdk */
const faunadb = require('faunadb')
const getId = require('./utils/getId')
const q = faunadb.query

export async function handler(event, context) {
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  }) 
  const id = getId(event.path)
  const user = await client.query(q.Get(q.Ref(`classes/customers/${id}`)))
  return {
    statusCode: 200,
    body: JSON.stringify(user.data)
  };
}