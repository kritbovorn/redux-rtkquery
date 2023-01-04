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
