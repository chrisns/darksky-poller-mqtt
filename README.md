# Dark-sky polling to mqtt

To use:

```bash
MQTT_PASS=XXX \
MQTT_USER=XXX \
MQTT_HOST=XXX \
LAT=XX \
LON=XX \
DARKSKY_API_KEY=XXX \
npm start
```
or 
```bash
docker run \
  -e MQTT_PASS=XXX \
  -e MQTT_USER=XXX \
  -e MQTT_HOST=XXX \
  -e LAT=XX \
  -e LON=XX \
  -e DARKSKY_API_KEY=XXX \
  pinked/darksky-poller-mqtt
```
or 

```bash
MQTT_PASS=XXX \
MQTT_USER=XXX \
MQTT_HOST=XXX \
LAT=XX \
LON=XX \
DARKSKY_API_KEY=XXX \
docker stack deploy -c docker-compose.yml weather
```