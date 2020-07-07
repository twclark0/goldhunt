import faunadb from 'faunadb'
import getId from './utils/getId'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

export async function handler(event, context) {  
  const data = JSON.parse(event.body)
  const id = getId(event.path)
  console.log(`Function 'customer-update' invoked. update id: ${id}`)
  const user = await client.query(q.Update(q.Ref(`classes/customers/${id}`), {data}))
  return {
    statusCode: 200,
    body: JSON.stringify(user.data)
  };
}