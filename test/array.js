// Testing
let employees = [
  { "firstName": "Krissada", "lastName": "Boontrigratn", "jobs": [ { "year": 2016, "position": "web developer" }, { "year": 2012, "position": "web programmer" } ] },
  { "firstName": "Supot", "lastName": "Boontrigratn", "jobs": [ { "year": 2014, "position": "Director" }, { "year": 2013, "position": "Actor" } ] },
  { "firstName": "Peter", "lastName": "Jones", "jobs": [ { "year": 2015, "position": "googler" }, { "year": 2013, "position": "twiiter" } ] },
]

employees.forEach(function(employee){
  employee.jobs.forEach(function(job, year){
    console.log(`${employee.firstName} in ${job.year} be ${job.position}`)
  })
})

// Mainpage response
let message = {
  code: 200,
  message: 'This page is running.'
}
res.json(message)