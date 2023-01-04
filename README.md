# React Native , Redux Toolkit with Typescript  

## [Chapter 1](https://www.youtube.com/watch?v=u3KlatzB7GM&list=PL0Zuz27SZ-6M1J5I1w2-uZx36Qp6qhjKo&index=2)  

- ### src/redux_toolkit/features/counter/counter_slice.ts  

```ts  

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface CounterState {
    count: number
};

const initialState: CounterState = {
    count: 0
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.count++;
        },
        decrement: (state) => {
            state.count--;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.count += action.payload;
        },
        reset: (state) => {
            state.count = 0;
        }
    }
});

export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;

export const selectCount = (state: RootState) => state.counter.count;

export default counterSlice.reducer;

```  

---  

- ### src/redux_toolkit/app/store.ts  

```ts  

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./../features/counter/counter_slice";

export const store = configureStore({
    reducer: {
        counter: counterReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

```  
---  

- ### src/redux_toolkit/app/hooks.ts  

```ts  

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

```  

---  

- ### App.tsx  

```ts  

import React from "react";
import { Provider } from 'react-redux'
import { store } from "./src/redux_toolkit/app/store";
import RootScreen from "./src/screens/root_screen";

const App = () => {

  return (
    <Provider store={store}>
      <RootScreen />
    </Provider>
  );
}

export default App;

```  

---  

- ### src/screens/root_screen.tsx  

```ts  

import React from "react";
import { Text, View } from 'react-native';
import ComponentTextfieldButton from "../components/component/component_textfield_button";
import ComponentTweenButton from "../components/component/component_tween_button";
import SpacerBody from "../components/spacer/spacer_body";
import SpacerHead5 from "../components/spacer/spacer_head5";
import { useAppSelector } from "../redux_toolkit/app/hooks";
import { gbs, sc } from '../utils/import/import_options';

const RootScreen = () => {

  const count = useAppSelector((state) => state.counter.count);
  return (
    <View style={[gbs.center, { flex: 1, paddingHorizontal: sc.padMid }]} >
      <Text style={[{ fontSize: 65 }]}>{count}</Text>
      <SpacerHead5 />
      <ComponentTweenButton />
      <SpacerBody />
      <ComponentTextfieldButton />
      <SpacerBody />
    </View>
  );
}

export default RootScreen;

```  

---  

- ### src/components/component/component_tween_button.tsx  

```ts  

import React from "react";
import {View} from 'react-native';
import { useAppDispatch } from "../../redux_toolkit/app/hooks";
import { decrement, increment } from "../../redux_toolkit/features/counter/counter_slice";
import { sc } from "../../utils/import/import_options";
import ButtonSingleComponent from "../buttons/button/components/button_single_component";


const ComponentTweenButton = () => {
    const dispatch = useAppDispatch();
  return (  
    <View style={[{ height: sc.buttonHeight, flexDirection: 'row', }]}>
    <View style={[{ flex: 1 }]}>
      <ButtonSingleComponent
        title="➖"
        onPress={() => dispatch(decrement())}
      />
    </View>
    <View style={[{ width: sc.padMin }]}></View>
    <View style={[{ flex: 1 }]}>
      <ButtonSingleComponent
        title="➕"
        hasBorder
        onPress={() => dispatch(increment())}
      />
    </View>
  </View>
  );
}

export default ComponentTweenButton;


```  
---  

- ### src/components/component/component_textfield_button.tsx  

```ts  

import React, { useState } from "react";
import { TextInput,View} from 'react-native';
import { useAppDispatch, useAppSelector } from "../../redux_toolkit/app/hooks";
import { incrementByAmount, reset } from "../../redux_toolkit/features/counter/counter_slice";
import { colors, sc } from "../../utils/import/import_options";
import ButtonSingleComponent from "../buttons/button/components/button_single_component";
import SpacerBody from "../spacer/spacer_body";

const ComponentTextfieldButton = () => {
  const count = useAppSelector((state) => state.counter.count);
    const [amount, setAmount] = useState("");
    const dispatch = useAppDispatch();
    const addAmount = () => {
        dispatch(incrementByAmount(Number(amount) || 0));
        setAmount("");
    }
    const resetAll = () => {
      dispatch(reset());
      setAmount("");
    }
    
  return (  
     <View style={[]}>
      <View style={[{ height: sc.buttonHeight, width: '100%', flexDirection: 'row' }]}>
        <View style={[{ flex: 3 }]}>
          <View style={{ flex: 1}}>
              <TextInput 
                style={{flex: 1, borderRadius: sc.maxSpace, borderWidth: sc.minSpace, borderColor: colors.thirdBlue, paddingHorizontal: sc.padMid, backgroundColor: colors.primaryBackground, fontSize: sc.title}} 
                placeholder="" 
                defaultValue={amount} 
                onChangeText={(value) => {setAmount(value)}} />
          </View>
        </View>
         <View style={[{width: sc.padMin}]}></View>
        <View style={[{ flex: 1 }]}>
          <ButtonSingleComponent
            title="Amount"
            onPress={() => { addAmount()}}
          />
        </View>
      </View>
      <SpacerBody />
      <ButtonSingleComponent
      title="Reset"
      hasBorder
      borderColor="indigo"
      backgroundColor="indigo"
      color="white"
      onPress={() => { resetAll()}}
    />
     </View>
  );
}

export default ComponentTextfieldButton;

```  
---  

## Preview  

https://user-images.githubusercontent.com/10919051/210562608-03309f5a-052e-42c0-b68c-924766aef0c1.mov  

---  



