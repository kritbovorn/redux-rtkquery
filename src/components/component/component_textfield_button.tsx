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

