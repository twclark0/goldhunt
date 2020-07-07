import faunadb from 'faunadb' /* Import faunaDB sdk */

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

/* export our lambda function as named "handler" export */
export async function handler(event, context) {
  /* parse the string body into a useable JS object */
  console.log(event.body);
  const data = JSON.parse(event.body)
  console.log("Function `customer-create` invoked", data)
  const userItem = {
    data: data
  }
  /* construct the fauna query */
  const user = await client.query(q.Create(q.Ref("classes/customers"), userItem))
  return {
    statusCode: 200,
    body: JSON.stringify(user.data)
  };
}