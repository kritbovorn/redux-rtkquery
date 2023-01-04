import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import ButtonSingleComponent from "../components/buttons/button/components/button_single_component";
import { amountAdded, decrement, increment } from "../features/counter/counter_slice";
import { sc } from '../utils/import/import_options';
import { useFetchedBreedsQuery } from "../api/dog_api";
import SpacerCaption from "../components/spacer/spacer_caption";

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



