import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AuthStack from "./stacks/AuthStack";
import HomeStack from "./stacks/HomeStack";
import { useAppSelector } from "./redux/store";
// import { user } from "./redux/reducers/homeSlice";

const Router = () => {
  const [state, setState] = useState(0);
  const user = useAppSelector((state) => state.Home.user);

  useEffect(() => {
    setState((prev) => prev + 1);
  }, []);

  return (
    <>
      <NavigationContainer key={state} independent>
        {user ? <HomeStack /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
};
export default Router;
