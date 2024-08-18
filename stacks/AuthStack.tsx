import Login from "@/app/src/features/Auth/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type AuthStackType = {
  Login: undefined;
};

const AuthStack = () => {
  const Auth = createNativeStackNavigator<AuthStackType>();
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
      initialRouteName="Login"
    >
      <Auth.Screen name="Login" component={Login} />
    </Auth.Navigator>
  );
};
export default AuthStack;
