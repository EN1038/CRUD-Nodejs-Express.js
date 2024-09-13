const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise')

app.use(bodyParser.json())

// ใช้ users array เป็นตัวหลักในการเก็บข้อมูล
let users = []
let counter = 1

/* เพิ่มเฉพาะ code ตรงนี้เข้าไป */

app.get('/call',(req , res) => {
    res.json(users)
})

app.post('/users', (req , res) => {
    const data = req.body

    const newUser = {
        id: counter,
        firstname: data.firstname,
        lastname: data.lastname,
        age: data.age
    }

    counter += 1

    users.push(newUser)

    res.status(201).json({message: ' User created successfully', user:newUser})
})

// Route handler for getting a user by their ID
// app.get('/users/:id', (req, res) => {
//     const id = parseInt(req.params.id, 10)
  
//     // Find the user with the given ID
//     const user = users.find((user) => user.id === id)
   
//     // Check if the user with the specified ID exists
//     if (user) {
//       res.json(user)
//     } else {
//       res.status(404).json({ error: 'User not found' })
//     }
//   })

  

// app.put('/users/:id', (req, res) => {
//   const id = parseInt(req.params.id, 10)
//   const data = req.body

//   // Find the user with the given ID
//   const user = users.find((user) => user.id === id)

//   // Check if the user with the specified ID exists
//   if (user) {
//     // Update the user properties with the new data
//     user.firstname = data.firstname || user.firstname
//     user.lastname = data.lastname || user.lastname
//     user.age = data.age || user.age

//     res.json({ message: 'User updated successfully', user: user })
//   } else {
//     res.status(404).json({ error: 'User not found' })
//   }
// })

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)
  
    // ค้นหา index ของ user ที่มี id ตรงกับที่ระบุ
    const index = users.findIndex(user => user.id === id)
  
    // ตรวจสอบว่า index เป็นค่า valid หรือไม่
    if (index !== -1) {
      // ลบ user ที่อยู่ใน index ที่ระบุ
      const deletedUser = users.splice(index, 1)[0]
      res.json({ message: 'User deleted successfully', user: deletedUser })
    } else {
      res.status(404).json({ error: 'User not found' })
    }
  })
  



app.listen(8000, () => {
  console.log('Server started on port 8000')
})