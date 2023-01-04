# React Native , Redux Toolkit with typescript

- [Resource on Youtube](https://www.youtube.com/watch?v=9zySeP5vH9c)  

> ### src/features/counter/counter_slice.ts  

```ts  

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type CounterState = {
    value: number,
}

const initialState: CounterState = {
    value: 0
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment(state) {
            state.value++;
        },
        decrement(state) {
            state.value--;
        },
        amountAdded(state, payload: PayloadAction<number>) {
            state.value += payload.payload;
        }
    }
});

export const { increment, decrement, amountAdded } = counterSlice.actions;

export default counterSlice.reducer;

```  

> ### src/api/dog_api.ts  

```ts  

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const DOGS_API_KEY = "cbfb51a2-84b6-4025-a3e2-ed8616edf311";

type Breed = {
    id: string,
    name: string,
    image: {
        url: string
    }
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.thedogapi.com/v1',
        prepareHeaders(headers) {
            headers.set('x-api-key', DOGS_API_KEY);
            return headers;
        } 
    }),
    endpoints(builder) {
        return {
            fetchedBreeds: builder.query<Breed[], number | void>({
                query(limit = 10) {
                    return `/breeds?limit = ${limit}`;
                }
            })
        }
    }
});

export const { useFetchedBreedsQuery } = apiSlice;

```  



> ### src/app/store.ts

```ts  

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/dog_api";
import counterReducer from '../features/counter/counter_slice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware)
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

```  

> ###  App.tsx

```ts  

const App = () => {
  return (
    <Provider store={store}>
      <Fragment>
        <SafeAreaView style={{ flex: 0, backgroundColor: colors.background }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
          <StatusBar barStyle="light-content" />
          <View style={[styles.container, {}]} >
            <RootScreen />
          </View>
        </SafeAreaView>
      </Fragment>

    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

```  

> ###  src/screens/root_screen.tsx  

```ts  

const RootScreen = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const incrementClicked = () => {
    dispatch(increment());
  }
  const decrementClicked = () => {
    dispatch(decrement());
  }

  const addAmount = () => {
    dispatch(amountAdded(3));
  }

  const { data = [], isLoading, isSuccess } = useFetchedBreedsQuery();

  return (
    <View style={[styles.container, { flex: 1 }]} >

      <View style={[{ flex: 1 }]}>
        <Text style={[{ fontSize: 55, alignSelf: 'center' }]}>{count}</Text>
        <SpacerCaption />
        <ButtonSingleComponent
          title="Increment"
          onPress={() => { incrementClicked() }}
        />
        <SpacerCaption />
        <ButtonSingleComponent
          title="Decrease"
          onPress={() => decrementClicked()}
          color={'white'}
          backgroundColor={'green'}
          borderColor={'orange'}
          hasBorder={true}
        />
        <SpacerCaption />
        <ButtonSingleComponent
          title="Amount 3"
          onPress={() => { addAmount() }}
        />
        <SpacerCaption />
        <Text style={[{ fontSize: sc.body, fontWeight: 'bold' }]}>Number of Dogs from fetched is: {data.length}</Text>
        <SpacerCaption />
        <View style={[{ flex: 1, flexDirection: 'row', alignItems: 'center' }]}>

          {isLoading
            ? <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
              <Text style={[{ fontSize: 55, alignSelf: "center" }]}>Loading</Text>
            </View>
            : <></>}
          {isSuccess ?
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={data}
              renderItem={({ item }) => (
                <View style={[{ alignItems: 'stretch', justifyContent: 'center', width: '22%', marginVertical: sc.spaceCaption }]}>
                  <View style={[{ height: sc.head5 * 1.3 }]}>
                    <Text numberOfLines={2} adjustsFontSizeToFit style={[{}]}>{item.name}</Text>
                  </View>
                  <Image source={{ uri: item.image.url }} style={{ width: 90, height: 90 }} />
                </View>
              )}
              numColumns={3}
              columnWrapperStyle={{ justifyContent: 'space-evenly' }}
              contentContainerStyle={{ padding: sc.padMin }}
              ItemSeparatorComponent={() => <View style={[{ height: sc.padMin }]}></View>}
            >

            </FlatList>
            : <></>
          }

        </View>
      </View>
    </View>
  );
}

export default RootScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: sc.padMid
  }
});


```  

## Preview  

https://user-images.githubusercontent.com/10919051/210379302-faed6fcc-2293-4987-9526-a99ed385bc9f.mov  




