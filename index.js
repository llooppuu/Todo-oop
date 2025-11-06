import express from 'express'

const app = express()

app.listen(3009, () => {
    console.log('Server is running at port 3009')
})

app.get('/json-test', (req, res) => {
    res.send({
        message: 'json test ok'
    })
})