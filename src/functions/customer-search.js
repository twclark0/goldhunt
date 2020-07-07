/* Import faunaDB sdk */
const faunadb = require('faunadb')
const getId = require('./utils/getId')
const q = faunadb.query

export async function handler(event, context) {
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  }) 
  console.log(event.body);
  const data = JSON.parse(event.body)
  const start = data.startTime;
  const user = await client.query(
    q.Paginate(q.Match(q.Index('customer_by_start'), start),
        { size: 2 })
  )
  return {
    statusCode: 200,
    body: JSON.stringify(user.data[0])
  };
}