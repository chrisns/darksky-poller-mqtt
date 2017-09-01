const request = require('request-promise')
const mqtt = require('mqtt')
const _ = require('lodash')

const {LAT, LON, DARKSKY_API_KEY, MQTT_HOST, MQTT_USER, MQTT_PASS} = process.env
const get_weather = () => request(`https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${LAT},${LON}?exclude=flags&units=uk2`)
  .then(JSON.parse)

get_weather()
  .tap(() => console.log("Got weather"))
  .tap(weather =>
    _.each(['minutely', 'hourly', 'daily'], k => publish_helper(k, weather))
  )
  .tap(weather => publish('weather/currently', JSON.stringify(weather.currently)))
  .finally(() => client.end(false, () => process.exit(0)))

const publish_helper = (k, weather) =>
  publish(`weather/${k}`, JSON.stringify({
    summary: weather[k].summary,
    icon: weather[k].icon
  }))
    .then(() => publish(`weather/${k}/data`, JSON.stringify(weather[k].data)))

const publish = (topic, message, options) =>
  new Promise((resolve, reject) => {
    client.publish(topic, message, {retain: true}, err => {
      if (err) reject(err)
      resolve()
    })
  }).then(() => console.log(`Published ${topic}`))

const client = mqtt.connect(MQTT_HOST, {
  username: MQTT_USER,
  password: MQTT_PASS
})