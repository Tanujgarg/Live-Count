require("dotenv").config()
const app = require("express")()
const server = require("http").Server(app)
const io = require("socket.io")(server, {origins: process.env.ORIGIN})
const PORT = process.env.PORT || 3000

let users = []

server.listen(PORT, '0.0.0.0', () => {
  console.log(`socket server is running on port ${PORT}`)
})

io.on('connection', (socket) => {

  socket.on('login', (data) => {
    console.log(data)
    socket.username = data.username
    users.includes(data.username)
      ? console.log("already")
      : users.push(data.username)
    io.emit("users", users)
    io.emit("count", io.engine.clientsCount)
  })
  socket.on('disconnect', (id) => {
    console.log(socket.username)
    io.emit("count", io.engine.clientsCount)
    io.emit("users", users.filter(user => user !== socket.username))
  })
})
