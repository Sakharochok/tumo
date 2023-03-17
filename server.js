import {appendFileSync} from 'fs';
import express from "express";
const app = express()
app.use(express.static('./'))
app.use(express.json())

app.post('/status',(req,res) => {
    console.log(req.body)
    appendFileSync('statistics.txt', JSON.stringify(req.body) + '\n')
})

app.listen(3000, ()=>{
    console.log('Запущено')
})