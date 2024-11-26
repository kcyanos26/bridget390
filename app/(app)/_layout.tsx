import { Text } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";
//import { icons } from "@/constants";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSession } from '../../context/ctx';


const TabIcon = ({
    source,
    focused,
  }: {
    source: ImageSourcePropType;
    focused: boolean;
  }) => (
    <View
      className={`flex flex-row justify-center items-center rounded-full ${focused ? "bg-general-300" : ""}`}
    >
      <View
        className={`rounded-full w-12 h-12 items-center justify-center ${focused ? "bg-general-400" : ""}`}
      >
        <Image
          source={source}
          tintColor="white"
          resizeMode="contain"
          className="w-7 h-7"
        />
      </View>
    </View>
  );

export default function AppLayout() {
    const { session, isLoading } = useSession();

    // You can keep the splash screen open, or render a loading screen like we do here.
    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    // Only require authentication within the (app) group's layout as users
    // need to be able to access the (auth) group and sign in again.
    if (!session) {
        // On web, static rendering will stop here as the user is not authenticated
        // in the headless Node process that the pages are rendered in.
        return <Redirect href="/sign-in" />;
    }

    // This layout can be deferred because it's not the root layout.
    return (
        <Tabs
            initialRouteName="index"
            screenOptions={{
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "white",
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "#333333",
                    borderRadius: 50,
                    //paddingBottom: 0, // ios only
                    overflow: "hidden",
                    marginHorizontal: 20,
                    marginBottom: 20,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    position: "absolute",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        <Ionicons name='home' focused={focused}  size={28} />

                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: "History",
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        <Ionicons name='map' focused={focused}  size={28} />

                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    title: "Chat",
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        <Ionicons name='tv' focused={focused}  size={28} />
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) =>
                        <Ionicons name='person' focused={focused}  size={28} />
                }}
            />
        </Tabs>
    );
}


