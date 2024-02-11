* test locally

```

k6 run --out influxdb=http://localhost:8086/k6 -e MAX_VUS=1500 -e API_DOMAIN=http://localhost:4000 ./load/k6/scripts/test.js

```