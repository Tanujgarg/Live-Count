require("dotenv").config()
const app = require("express")()
const server = require("http").Server(app)
const io = require("socket.io")(server, {origins: process.env.ORIGIN})
const PORT = process.env.PORT || 3000

server.listen(PORT, '0.0.0.0', () => {
  console.log(`socket server is running on port ${PORT}`)
})

io.on('connection', (socket) => {
  io.emit("count", io.engine.clientsCount)
  socket.on('disconnect', () => {
    io.emit("count", io.engine.clientsCount)
  })
})
