const express = require('express')
const app = express()
const path = require('path')

const PORT = 8003 || 7999

app.listen(PORT, () => {
	console.log(`I am listening on ${PORT}. We in the Building`)
})

app.use(express.static(path.join(__dirname, 'public')))
app.get('*', (_, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

module.exports = app
