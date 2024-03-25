import { createReducer, createAction } from '@reduxjs/toolkit'
import { IOrderList, wsActions, wsPayloadConnect } from '../utils/types';

// actions

export const wsOrderActions: wsActions = {
    wsConnect: createAction<wsPayloadConnect>('WS_CONNECT_ORDER'),
    wsDisconnect: createAction('WS_DISCONNECT_ORDER'),
    wsConnecting: createAction('WS_CONNECTING_ORDER'),
    wsOpen: createAction('WS_OPEN_ORDER'),
    wsClose: createAction('WS_CLOSE_ORDER'),
    wsMessage: createAction<IOrderList>('WS_MESSAGE_ORDER'),
    wsError: createAction<string | undefined>('WS_ERROR_ORDER')
}

// reducer

interface IOrderState {
    data: IOrderList | null;
}

export const initialState: IOrderState = {
    data: null
};

export const ordersReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(wsOrderActions.wsMessage, (state, action) => {
            state.data = action.payload;
        })
});