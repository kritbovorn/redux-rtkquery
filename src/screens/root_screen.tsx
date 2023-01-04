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

