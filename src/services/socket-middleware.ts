import { Middleware } from '@reduxjs/toolkit';
import { wsActions } from '../utils/types';

export const socketMiddleware = (wsActions: wsActions): Middleware => {
    return store => {
        let socket: WebSocket | null = null;
        let reconnectTimer: number = 0;
        let isConnected: boolean = false;
        let wsUrl: string = '';
        let withTokenRefresh: boolean = false;
        return next => action => {
            const { dispatch } = store;
            const { wsConnect, wsDisconnect, wsConnecting, wsOpen, wsClose, wsError, wsMessage } = wsActions;
            if (wsConnect.match(action)) {
                wsUrl = action.payload.wsUrl;
                withTokenRefresh = action.payload.withTokenRefresh;
                socket = new WebSocket(`${wsUrl}`);
                isConnected = true;
                dispatch(wsConnecting())
            }
            if (socket) {
                socket.onopen = _event => dispatch(wsOpen());                
                socket.onerror = event => console.log('socket.onerror', event);
                socket.onclose = event => {
                    if (event.code !== 1000) {
                        // console.log('socket.onclose error', event);
                        dispatch(wsError(event.code.toString()))
                    }
                    if (isConnected && event.code !== 1000) {
                        reconnectTimer = window.setTimeout(() => {
                            dispatch(wsConnect({ wsUrl, withTokenRefresh }))
                        }, 3000)
                    }
                };
                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch(wsMessage(parsedData));
                };             
            }
            if (wsDisconnect.match(action) && socket) {
                clearTimeout(reconnectTimer);
                isConnected = false;
                reconnectTimer = 0;
                socket.close(1000, "Done!")
                dispatch(wsClose());
            }
            next(action);
        };
    };
};