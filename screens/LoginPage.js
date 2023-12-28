import { StyleSheet,
         Text,
         SafeAreaView,
         Image,
         useColorScheme,
         useWindowDimensions,
         TouchableOpacity,
         Button} from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import {useTheme} from '@react-navigation/native'
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons"
import { TabView, TabBar } from "react-native-tab-view"
import { useOAuth } from '@clerk/clerk-expo'


const LoginPage = ({ navigation }) => {
  const {height, width, scale, fontScale} = useWindowDimensions();
  //const dark_logo = "../app_assets/dark_logo.png"
  const light_logo = "../assets/light_logo.png"
  //const scheme = useColorScheme(); 
  const { colors } = useTheme();
  //console.log(scheme === "dark" ? dark_logo : light_logo)
  const [routes] = useState([
    {key: "register", title: "Register"},
    {key: "signIn", title: "Sign In"}
  ]);
  

  const { startOAuthFlow }= useOAuth({ strategy: "oauth_google" })

  const onPressGoogle = useCallback(async () => {
    try {
      console.log(1)
      const { createdSessionId, signIn, signUp, setActive} = await startOAuthFlow();
      console.log(2)
      if (createdSessionId) { 
        console.log(3)//login info wasn't in cache prior to starting OAuth flow
        setActive({ session: createdSessionId})
        console.log(4)
      }  //add else and use signIn or signUp for MFA
    } catch (err) {
      console.error(err)
    }
      
  }, [])


  const [index, setIndex] = useState(0);

  const Register = () => (
    <>
      <TouchableOpacity style={styles.button}>
        <MaterialCommunityIcons name="email-outline" size={32} color="white" style={styles.icons}/>
        <Text style={styles.buttonText}>Register with Email</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => {onPressGoogle()}} >
        <SimpleLineIcons name="social-google" size={28} color="white" style={styles.icons} />
        <Text style={styles.buttonText}>Register with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <SimpleLineIcons name="social-linkedin" size={28} color="white" style={styles.icons}/>
        <Text style={styles.buttonText}>Register with LinkedIn</Text>
      </TouchableOpacity>
      </>
  )

  const SignIn = () => (
    <>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("LoginEmail")}>
        <MaterialCommunityIcons name="email-outline" size={32} color="white" style={styles.icons}/>
        <Text style={styles.buttonText}>Sign in with Email</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => {onPressGoogle()}}>
        <SimpleLineIcons name="social-google" size={28} color="white" style={styles.icons}/>
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <SimpleLineIcons name="social-linkedin" size={28} color="white" style={styles.icons}/>
        <Text style={styles.buttonText}>Sign in with LinkedIn</Text>
      </TouchableOpacity>
      </>
  )


  const styles = StyleSheet.create({
    text: {
        color: colors.text,
        fontWeight: "bold", 
        padding: 20,
        textAlign: "center",
        alignSelf: "center"
    },
    buttonText : {
      color: "white",
      textAlign: "center",
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignContent: "center",
        justifyContent: "center"
      },
    button: {
        backgroundColor: colors.primary,
        width: "80%",
        borderRadius: 25,
        height: 50,
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: "8%",
        flexDirection:"row",
        alignItems: "center",
        padding: 10,
        gap: 15
    },
    logo: {
      left: "2%",
    },
    icons: {
      position: "relative",
      paddingRight: 10
    },
    tabView: {
      backgroundColor: colors.background,
      
    }
})


  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={
          require(light_logo)
        }
        style={styles.logo}
        width={200}
      />
      <Text style={styles.text}>Your future at your fingertips.</Text>
      <TabView
        renderTabBar={props => (
          <TabBar
          indicatorStyle={{ backgroundColor: colors.primary, height: 2 }}
            {...props}
            renderLabel={({ route }) => (
              <Text style={{ color: 'black', margin: 8 }}>
                {route.title}
              </Text>
            )}
            style={styles.tabView}
          />
        )}
        navigationState={{index, routes}}
        renderScene={({route}) => {
          switch (route.key) {
            case "register":
              return Register();
            case "signIn":
              return SignIn();  
            default:
              return null;
          }
        }}
        onIndexChange={setIndex}
        initialLayout={{width: width}}
        />
    </SafeAreaView>
  )
}

export default LoginPage

