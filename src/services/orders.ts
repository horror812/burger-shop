import { createReducer, createAction } from '@reduxjs/toolkit'
import { IOrderList, wsActions, wsPayloadConnect } from '../utils/types';

// actions

export const wsOrdersActions: wsActions = {
    connect: createAction<wsPayloadConnect>('WS_CONNECT_ORDER'),
    disconnect: createAction('WS_DISCONNECT_ORDER'),
    connecting: createAction('WS_CONNECTING_ORDER'),
    open: createAction('WS_OPEN_ORDER'),
    close: createAction('WS_CLOSE_ORDER'),
    message: createAction<IOrderList>('WS_MESSAGE_ORDER'),
    error: createAction<string | undefined>('WS_ERROR_ORDER')
}

// reducer

export interface IOrdersState {
    data: IOrderList | null;
    isConnected: boolean;
}

export const initialState: IOrdersState = {
    data: null, 
    isConnected:false
};

const disconnected = (state:IOrdersState)=>{ state.isConnected = false;   }

export const ordersReducer = createReducer(initialState, (builder) => {
    builder.addCase(wsOrdersActions.disconnect, disconnected),
    builder.addCase(wsOrdersActions.error, disconnected),
    builder.addCase(wsOrdersActions.close, disconnected),
    builder.addCase(wsOrdersActions.connect, (state) => {
        state.isConnected = true;
    }), 
    builder.addCase(wsOrdersActions.message, (state, action) => {
        state.data = action.payload;
    })
});

export default ordersReducer;