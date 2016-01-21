let proces1, proces2, proces3

var p2 = new Promise(function(resolve, reject) {
  resolve(1);
});

p2.then(function(value) {
  console.log(value); // 1
  return value + 1;
}).then(function(value) {
  console.log(value); // 2
  return value + 1;
}).then(function(value) {
  console.log(value); // 3
  return value + 1;
}).then(function(value) {
  console.log(value); // 4
  return value + 2;
}).then(function(value) {
  console.log(value); // 6
});

proces1 = new Promise(function(resolve, reject){
  setTimeout(function(){
    console.log('Processing one is running')
    resolve('done-process1')
  }, 2000)
})
proces1.then(function(results){
  console.log(`1: ${results}`)
  proces2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      console.log('Processing two is running')
      resolve('done-process2')
    }, 2000)
  })
  proces2.then(function(results){
    console.log(`2: ${results}`)
    proces3 = new Promise(function(resolve, reject){
      setTimeout(function(){
        console.log('Processing three is running')
        resolve('done-process3')
      }, 2000)
    })
    proces3.then(function(results){
      console.log(`2: ${results}`)
    })
  })
})

proces1 = new Promise(function(resolve, reject){
  setTimeout(function(){
    console.log('Process one is runned.')
    resolve('process1 is runned')
  }, 1000)
})

proces2 = new Promise(function(resolve, reject){
  setTimeout(function(){
    console.log('Process two is runned.')
    resolve('process2 is runned')
  }, 2000)
})

proces3 = new Promise(function(resolve, reject){
  setTimeout(function(){
    console.log('Process three is runned.')
    resolve('process3 is runned')
  }, 5000)
})

Promise.all([proces1, proces2, proces3]).then(function(value) { 
  console.log(value);
}, function(reason) {
  console.log(reason)
});