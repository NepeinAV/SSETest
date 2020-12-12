### Start SSE server
1. docker pull yevshev/sse-server
2. docker run --name sse -p 8000:8000 yevshev/sse-server

### Start the app
1. npm i
2. npm start
3. npx react-native run-android

### Change IP address in useEventSource hook
It looks like 192.168.x.x (you can find it via `ifconfig`)

```
const source = useEventSource<EventSourceInitDict, ExtendedEventSource>({
    source: 'http://<your_local_ip>:8000/redfish/v1/Chassis/1/Thermal'
});
```
