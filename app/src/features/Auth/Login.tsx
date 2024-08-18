import { AuthStackType } from "@/stacks/AuthStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  View,
  Pressable,
  Alert,
  StyleSheet,
  Vibration,
  Platform,
  Dimensions,
} from "react-native";
import ViewComponent from "../../components/ViewComponent";
import TextComponent from "../../components/TextComponent";
import InputComponent from "../../components/InputComponent";
import ButtonComponent from "../../components/ButtonComponent";
import SpaceComponent from "../../components/SpaceComponent";
import OneLogo from "../svg/OneLogo";
import { setUser } from "@/redux/reducers/homeSlice";
import { useAppDispatch } from "@/redux/store";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import ScreenLoader from "../../components/ScreenLoader";
import Accordion from "../../components/Accordion";
import SwipeToBuyComponent from "../../components/SwipeToBuyComponent";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

const { height } = Dimensions.get("window");

type LoginProps = NativeStackScreenProps<AuthStackType, "Login">;

const Login: React.FC<LoginProps> = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userError, setUserError] = useState<string>("");
  const [passError, setPassError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onChangeTextUserName = (text: string) => {
    setUserName(text);
  };

  React.useEffect(() => {
    requestPermissions();
  }, []);

  async function requestPermissions() {
    if (Platform.OS === "ios") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== "granted") {
        alert("You need to enable notifications in settings.");
      }
    } else {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("You need to enable notifications in settings.");
      }
    }
  }

  const onChangeTextPassword = (text: string) => {
    setPassword(text);
    const regex = /^[0-9]*$/;
    if (!regex.test(text) || text.length > 5) {
      setPassError("only numbers are allowed in password");
    } else setPassError("");
  };

  const onSubmit = () => {
    if (userName === "one@test.com" && password === "19283") {
      setIsLoading(true);
      setTimeout(() => {
        dispatch(setUser(true));
        Vibration.vibrate(150);
      }, 2000);
    } else {
      Alert.alert("Validation error", "Invalid username or password");
    }
  };

  async function scheduleNotificationHandler() {
    if (Platform.OS === "ios") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== "granted") {
        alert("You need to enable notifications in settings.");
      }
    } else {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("You need to enable notifications in settings.");
      } else {
        Notifications.scheduleNotificationAsync({
          content: {
            title: "My First Notification",
            body: "This is the body of the notification",
            data: {
              userName: "one@test.com",
            },
          },
          trigger: null,
        });
      }
    }
  }
  const accordionData = [
    {
      title: "What is React Native?",
      content:
        "React Native is a JavaScript framework for writing real, natively rendering mobile applications for iOS and Android.",
    },
    {
      title: "What is an Accordion?",
      content:
        "An accordion is a UI pattern where content can be expanded or collapsed by clicking on a section header.",
    },
    {
      title: "How to use React Native?",
      content:
        "You can use React Native by setting up a project using React Native CLI or Expo and start developing mobile apps using JavaScript or TypeScript.",
    },
  ];

  function handleToggle(e: boolean) {
    console.log("handleToggle: ", e);
  }

  return (
    <ViewComponent bgColor="#fff">
      <View style={{ marginTop: height * 0.67 }} />
      <SwipeToBuyComponent onToggle={handleToggle} />
      {/* <View style={styles.container}>
        <OneLogo size={70} />
        <SpaceComponent height={10} />
        <TextComponent text="One Percent Club" color="#ECD996" size={20} />
        <SpaceComponent height={40} />
        <InputComponent
          errorMessage={userError}
          onChange={onChangeTextUserName}
          value={userName}
          maxLength={15}
          autoFocus={true}
          keyboardType="email-address"
          placeholder="Enter email"
        />
        <InputComponent
          errorMessage={passError}
          value={password}
          maxLength={6}
          isSecure={true}
          onChange={onChangeTextPassword}
          placeholder="Enter Password"
        />
        <View style={styles.forgotPassView}>
          <TextComponent text="Forgot Password" />
        </View>
        <SpaceComponent height={35} />
        <ButtonComponent
          title="Add to Order"
          loading={isLoading}
          disabled={userError.length > 0 || passError.length > 0 || isLoading}
          onPress={() => {
            onSubmit();
          }}
        />
        <SpaceComponent height={10} />
        <View>
          <Pressable
            style={{ flexDirection: "row", gap: 8 }}
            onPress={() =>
              Alert.alert(
                "Coming Soon!",
                "You'll get this feature soon in the future updates"
              )
            }
          >
            <TextComponent text="Don't have an account?" />
            <TextComponent text="Sign Up" color="#ECD996" />
          </Pressable>
        </View>
      </View> */}
    </ViewComponent>
  );
};
export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: 16,
  },
  forgotPassView: { width: "100%", alignItems: "flex-end", marginTop: -10 },
});
