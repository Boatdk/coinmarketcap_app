const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const { connectMongoDB } = require('./config/mongo')
const { costService, history } = require('./services/market')
const State = require('./models/State')
const BotRate = require('./models/BotRate');
const router = require('./routes/router');
require('dotenv').config()
const app = express();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req,res)=>{
	res.send('eiei');
});

app.use('/api', router)

const port = process.env.PORT || '3000';
const server = http.createServer(app);
server.listen(port);

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async()=>{
	console.log('start===>')
	
	const main = async () => {
		const date = new Date().toISOString().replace(/T/, ' ').split(' ');
		const _date = date[0];
		const _time = date[1].split(":");
		let yesterday = new Date(date)
		yesterday.setDate(yesterday.getDate() - 1)
		yesterday = yesterday.toISOString().replace(/T/, ' ').split(' ');
		// await connectMongoDB()
		// const botRate = await BotRate.findOne({ 'time': yesterday[0] })
		// await costService(botRate)
		// await history()
		console.log('miss===>',{_date,_time})
		if(_time[0]=='04' && _time[1]=='37'){
			await connectMongoDB()
			console.log('hit===>',_time)
			const botRate = await BotRate.findOne({ 'time': yesterday[0] })
			await costService(botRate)
			// await State.create({
			//     state_cap: {
			// 		key:'date_coinmarket',
			// 		data:_date
			// 	}
			// });
			await sleep(30000)
		}else{
			console.log('miss 2===>',{_date,_time})
			await sleep(30000)
			main()
		}
	}


	main()
})()

