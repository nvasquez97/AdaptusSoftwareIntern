//this code is justo to test tasks.js is working as i expected
const toExecute = require('./tasks');
const resources = {};
const input = {
    Files: ['w8P1yJ3kZmVNgoE', 's2HxL7iQnBpYjRdI', 'cA6rUo5vKp1Wt3G2', 'zF4yL9dJ', 'nX0bV2mNyg5', 'u3TjP$7kY9Z6eH2xV',
     'aQ5zW1xR8gP4mJ2hV', 'kE6qX2rA3mY7zN9oL','iS1gY5nR3kU7xP2dO', 'bM8dZ2jO7tR4lG1sE'],
    scanned_files: ['cA6rUo5vKp1Wt3G2'],
    errored_files: ['w8P1yJ3kZmVNgoE','s2HxL7iQnBpYjRdI','cA6rUo5vKp1Wt3'],
};

toExecute(resources).run(input)
    .then((output) => {
        console.log('Output:', output);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
