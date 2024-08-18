import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../app/src/features/dashboard/Home/Home";

export type HomeStackType = {
  Home: undefined;
};

const HomeStack = () => {
  const Home = createNativeStackNavigator<HomeStackType>();
  return (
    <Home.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
      initialRouteName="Home"
    >
      <Home.Screen name="Home" component={HomeScreen} />
    </Home.Navigator>
  );
};
export default HomeStack;
