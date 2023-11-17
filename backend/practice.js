// const myPromise = new Promise((resolve, reject) => {
//   fetch('https://jsonplaceholder.typicode.com/posts/1')
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Failed to fetch data')
//       }

//       return response.json()
//     })
//     .then(data => {
//       resolve(data)
//     })
//     .catch(error => {
//       reject(error.message)
//     })
// })

// myPromise
//   .then(result => {
//     console.log(result)
//   })
//   .catch(error => {
//     console.error(error)
//   })

// Callback function example

// function asynchronousOperation(callback) {
//     console.log("Initiating asynchronous operation...");

//     setTimeout(function() {
//       console.log("Async operation completed!");

//       callback();

//     }, 2000);
//   }

//   asynchronousOperation(function() {
//     console.log("Callback executed asynchronously!");
//   });

// Method chaining in JavaScript 
// fs.promises
//   .readFile('input.txt', 'utf8')
//   .then(data => data.toUppercase())
//   .then(uppercasedData => fs.promises.writeFile('output.txt', uppercasedData))
//   .then(() => console.log('file reading operation completed'))
//   .catch(err => console.error('Error', err))

  
