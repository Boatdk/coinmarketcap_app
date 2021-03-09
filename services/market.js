const Market = require('../models/Market')
const axios = require('axios')
const BotRate = require('../models/BotRate');
const { curl } = require('../helper/curl')
const moment = require('moment')

const costService = async (botRate) => {
    const cryptoList = [
        'bitcoin',
        'ethereum',
        'wanchain',
        'cardano',
        'omg',
        'bitcoin-cash',
        'tether',
        'litecoin',
        'xrp',
        'bitcoin-sv',
        'zilliqa',
        'status',
        'civic',
        'chainlink',
        'golem-network-tokens',
        'iostoken',
        '0x',
        'kyber-network',
        'enigma',
        'raiden-network-token',
        'arcblock',
        'decentraland',
        'infinitus-token',
        'cortex',
        'stellar',
        'six',
        // 'jfin',
        'everex',
        'binance-coin',
        'power-ledger',
        'dogecoin',
        'multi-collateral-dai',
        'usd-coin',
        'basic-attention-token',
        'band-protocol',
        'kusama',
        'polkadot-new',
        'near-protocol',
        'secret'
    ]

    let result = []
    
    for(let [index, currency] of cryptoList.entries()){
        let url = `${process.env.API_URL}${currency}`
        let res = await curl(`curl ${url}`)
        let data = JSON.parse(res)
        const { name, symbol, quotes } = data
        const cost = quotes[quotes.length - 1]
        console.log(cost)
        const format = {
            name: name,
            symbol: symbol,
            cost: cost
        }
        
        console.log(index+1, name, 'success')
        result.push(format)
    }

    let data = {
        datetime: botRate.time,
        bot_rate: botRate.value,
        market_cap: result
    }
    console.log(data)
    // await Market.create(data)
    console.log(`${cryptoList.length} Doned !!`)
}

const history = async () => {
    const cryptoList = [
        'bitcoin',
        'ethereum',
        'wanchain',
        'cardano',
        'omg',
        'bitcoin-cash',
        'tether',
        'litecoin',
        'xrp',
        'bitcoin-sv',
        'zilliqa',
        'status',
        'civic',
        'chainlink',
        'golem-network-tokens',
        'iostoken',
        '0x',
        'kyber-network',
        'enigma',
        'raiden-network-token',
        'arcblock',
        'decentraland',
        'infinitus-token',
        'cortex',
        'stellar',
        'six',
        // 'jfin',
        'everex',
        'binance-coin',
        'power-ledger',
        'dogecoin',
        'multi-collateral-dai',
        'usd-coin',
        'basic-attention-token',
        'band-protocol',
        'kusama',
        'polkadot-new',
        'near-protocol',
        'secret'
    ]

    
    let year = []
    let dayUrl = `https://reconcile.bitkubnow.com/coinmarket-api/api/market?currency=bitcoin&start=2021-02-10&end=2021-02-11`
    const res = await axios.get(dayUrl)
    for(let [index, day] of res.data.quotes.entries()){
        const date = new Date(day.time_open).toISOString().replace(/T/, ' ').split(' ');
        const _date = date[0]
        year.push(_date)
    }

    for(let [index, date] of year.entries()){
        console.log(`start on date ${date}`)
        let result = []
        const bot = await BotRate.findOne({ time: date })
        for(let [value, currency] of cryptoList.entries()){
            let endDate = date
            let startDate 
            // if(index == 0){
            //     startDate = '2019-12-31'
            // }else{
            //     startDate = moment(date).subtract(1, 'days').format('YYYY-MM-DD')
            // }
            startDate = moment(date).subtract(1, 'days').format('YYYY-MM-DD')
            let url = `https://reconcile.bitkubnow.com/coinmarket-api/api/market?currency=${currency}&start=${startDate}&end=${endDate}`
            let myRes = await axios.get(url)
            const { name, symbol, quotes } = myRes.data 
            const cost = quotes[0]
            const format = {
                name: name,
                symbol: symbol,
                cost: cost
            }
            console.log(value+1, name, 'success')
            result.push(format)
        }
        let data = {
            datetime: bot.time,
            bot_rate: bot.value,
            market_cap: result
        }
        console.log(data)
        console.log(`${date}`)
        console.log(`${cryptoList.length} Doned !!`)
        await Market.create(data)
    }
    
}

module.exports = {
    costService,
    history
}