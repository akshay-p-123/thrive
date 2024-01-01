import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {useContext} from 'react'
import { useColorScheme } from "react-native";
import LoginPage from "./screens/LoginPage";
import Welcome from "./screens/Welcome";
import { ClerkLoaded, useUser } from "@clerk/clerk-expo"
import LoginEmail from "./screens/LoginEmail";
import ThemeContext from "./contexts/ThemeContext";
import { useFonts } from "expo-font";
const DefaultTheme = {
    dark: false,
    colors: {
      primary: 'rgb(140,82,255)', //purple
      background: 'rgb(248,246,253)', //very pale purple
      card: 'rgb(9,6,16)', //purple-tinted black
      text: 'rgb(0,0,0)', //black
      border: 'rgb(9,6,16)', //purple-tinted black
      notification: 'rgb(255,99,71)' //tomato
    }
  }
  
  const DarkTheme = {
    dark: true,
    colors: {
      primary: 'rgb(140,82,255)', //purple
      background: 'rgb(9,6,16)', //purple-tinted black
      card: 'rgb(248,246,253)', //very pale purple
      text: 'rgb(255,255,255)', //white
      border: 'rgb(248,246,253)', //very pale purple
      notification: 'rgb(255,99,71)' //tomato
    }
  }
  
export default function Navigation () {
    const { theme } = useContext(ThemeContext)
      const [fontsLoaded, fontError] = useFonts ({
          DMSansRegular: require('./assets/fonts/DMSans-Regular.ttf'),
          DMSansMedium: require('./assets/fonts/DMSans-Medium.ttf'),
          DMSansBold: require('./assets/fonts/DMSans-Bold.ttf')
      })
    return (
        <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator />
        </NavigationContainer>
    );
}

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const { isSignedIn } = useUser();

    return (
        <ClerkLoaded>
            <Stack.Navigator>
                {isSignedIn ? (
                <>
                 <Stack.Screen
                 options={{headerShown: false}}
                 name="Welcome"
                 component={Welcome}
                />  
                </>
                ) : (
                <>
                <Stack.Screen
                options={{headerShown: false}}
                name="Login"
                component={LoginPage}
               />   
               <Stack.Screen
                 options={{headerShown: false}}
                 name="LoginEmail"
                 component={LoginEmail}
                />
                </>    
                )}
            </Stack.Navigator>
        </ClerkLoaded>
    )
}