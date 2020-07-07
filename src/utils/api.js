/* Api methods to call /functions */

const create = async (data) => {
  const response = await fetch('/.netlify/functions/customer-create', {
    body: JSON.stringify(data),
    method: 'POST'
  })
  console.log(`Create Response => ${response}`)
  return response.json()
}

const read = async (uid) => {
  const response = await fetch(`/.netlify/functions/customer-read/${uid}`)
  console.log(`Response => ${response}`)
  return response.json()
}

const search = async (data) => {
  const response = await fetch('/.netlify/functions/customer-search', {
    body: JSON.stringify(data),
    method: 'POST'
  })
  console.log(`Search Response => ${response}`)
  return response.json()
}

const update = async (uid, data) => {
  const response = await fetch(`/.netlify/functions/customer-update/${uid}`, {
    body: JSON.stringify(data),
    method: 'POST'
  })
  console.log(`Update Response => ${response}`)
  return response.json()
}

const get = async (uid, data) => {
  const response = await fetch(`/.netlify/functions/customer-read/${uid}`, {
    body: JSON.stringify(data),
    method: 'POST'
  })
  console.log(`Update Response => ${response}`)
  return response.json()
}

const deleteCustomer = (todoId) => {
  return fetch(`/.netlify/functions/customer-delete/${todoId}`, {
    method: 'POST',
  }).then(response => {
    return response.json()
  })
}

export default {
  create: create,
  read: read,
  search: search,
  update: update,
  delete: deleteCustomer
}
