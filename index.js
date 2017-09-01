const request = require('request-promise')
const mqtt = require('mqtt')
const _ = require('lodash')

const {LAT, LON, DARKSKY_API_KEY, MQTT_HOST, MQTT_USER, MQTT_PASS} = process.env
const get_weather = () => request(`https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${LAT},${LON}?exclude=flags&units=uk2`)
  .then(JSON.parse)

get_weather()
  .then(weather =>
    _.each(['currently', 'minutely', 'hourly', 'daily'], k => publish_helper(k, weather))
  )
  .finally(() => client.end(false, () => process.exit(0)))

const publish_helper = (k, weather) => {
  client.publish(`weather/${k}`, JSON.stringify({
    summary: weather[k].summary,
    icon: weather[k].icon
  }), {retain: true})
  client.publish(`weather/${k}/data`, JSON.stringify(weather[k].data), {retain: true})
}

const client = mqtt.connect(MQTT_HOST, {
  username: MQTT_USER,
  password: MQTT_PASS
})