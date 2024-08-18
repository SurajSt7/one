import React, { useState } from "react";
import { Provider } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { store } from "@/redux/store";
import Router from "@/router";

const App = () => {
  const [state, setState] = useState<number>(0);
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Router />
      </GestureHandlerRootView>
    </Provider>
  );
};
export default App;
