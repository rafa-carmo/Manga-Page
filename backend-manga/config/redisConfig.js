const Redis = require('ioredis')
const { promisify } = require('util')

const redisClient = new Redis({
  host: process.env.REDIS_HOST
})

function getRedis(value){

    const syncRedisGet = promisify(redisClient.get).bind(redisClient)
    return syncRedisGet(value)
  }


function setRedis(key, value) {


  const syncRedisSet = promisify(redisClient.set).bind(redisClient)
  return syncRedisSet(key, value)

}

module.exports = {redisClient, getRedis, setRedis}
