/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { FC, useEffect, useState } from 'react';
import {
    Text,
    StatusBar,
    Button,
    SafeAreaView,
} from 'react-native';

import { EventSourceProvider, useEventSource, useEventSourceListener } from 'react-sse-hooks';
import { EventSourceInitDict, ExtendedEventSource, RNEventSource } from 'rn-eventsource-reborn';

type Message = { TimeStamp: string, HostAddress: string, CPUTemp: number };

const Telemetry: FC = () => {
    const [message, setMessage] = useState<Message>();

    const source = useEventSource<EventSourceInitDict, ExtendedEventSource>({
        source: 'http://192.168.3.5:8000/redfish/v1/Chassis/1/Thermal'
    });

    // this is equivalent to the code below
    // useEffect(() => {
    //   if (source) {
    //     source.onmessage = (e) => setMessage(JSON.parse(e.data));
    //     source.onopen = (e) => console.log('opened');
    //     source.onerror = (e) => console.log('error', e);
    //   }
    // }, [source]);

    const { stopListening, startListening } = useEventSourceListener<Message>({
        source,
        startOnInit: true,
        event: {
            name: 'message',
            listener: ({ data, event }) => setMessage(data),
        }
    });

    useEventSourceListener({
        source,
        startOnInit: true,
        event: {
            name: 'open',
            listener: () => console.log('opened'),
        }
    });

    useEventSourceListener({
        source,
        startOnInit: true,
        event: {
            name: 'error',
            listener: ({ event }) => console.log('error', event),
        }
    });

    return (
        <SafeAreaView style={{ padding: 10 }}>
            <Text>Cpu Temp:</Text>
            <Text style={{ marginBottom: 10 }}>{message?.CPUTemp}</Text>
            <Button title={'Stop'} onPress={stopListening} />
            <Button title={'Start'} onPress={startListening} />
        </SafeAreaView>
    )
}

const App = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <EventSourceProvider eventSource={RNEventSource}>
                <Telemetry />
            </EventSourceProvider>
        </>
    );
};

export default App;
