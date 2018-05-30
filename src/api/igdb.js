import igdb from 'igdb-api-node';

const client = igdb('8d754e87b3feaeee120888e0d46bc03d');

client.games({
    fields: '*', // Return all fields
    limit: 5, // Limit to 5 results
    offset: 15 // Index offset for results
    .then(res => res.json())
    .then(data => console.log(data.json()))
    .catch(err => console.log(err))
})