import React, { Fragment } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import RootScreen from "./src/screens/root_screen";
import { colors, sc } from "./src/utils/import/import_options";

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
    // alignItems: 'center',
    // justifyContent: 'center'
  }
});



