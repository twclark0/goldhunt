// Function using fetch to POST to our API endpoint
const create = (data) => {
  const string = JSON.stringify(data);
  return fetch('/.netlify/functions/customer-create', {
    body: string,
    method: 'POST'
  }).then(response => {
    return response.json()
  }).then(console.log)
  .catch(response => {
    console.log(`Create ERROR: ${response}`)
  })
}

export const createCustomer = create;

const hello = (data) => {
  fetch("/.netlify/functions/hello")
  .then(response => response.json())
  .then(console.log)
}

export const fetchHello = hello;
