import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress'
import { useNavigation } from '@react-navigation/native'

const PreparingOrderScreen = () => {
    const navigation = useNavigation()

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Delivery")
        }, 4000)
    }, [])

  return (
    <SafeAreaView className="bg-pink-500 flex-1 justify-center items-center">
      <Animatable.Image 
        source={require("../assets/OrderLoadingGif.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-60 w-60"
      />

    <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-lg my-10 text-black font-bold text-center"
        >
        Just a moment... waiting for Restaurant to accept your order!
        </Animatable.Text>  

        <Progress.Circle size={30} indeterminate={true} color="black" />
    </SafeAreaView>
  )
}

export default PreparingOrderScreen