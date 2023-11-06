import { View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectRestaurant } from '../features/restaurantSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XMarkIcon } from 'react-native-heroicons/outline'
import * as Progress from 'react-native-progress'
import MapView from 'react-native-maps'
import { Marker } from 'react-native-svg'

const DeliveryScreen = () => {
    const navigation = useNavigation()
    const restaurant = useSelector(selectRestaurant)
  return (
    <View className="bg-pink-500 flex-1">
        <SafeAreaView className="z-50">
            <View className="flex-row justify-between items-center p-5">
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <XMarkIcon color="black" size={30} />
                </TouchableOpacity>
                <Text className="font-light text-black text-lg">Order Help</Text>
            </View>

            <View className="bg-stone-700 mx-5 my-2 rounded-md p-6 z-50 shadow-md">
                <View className="flex-row justify-between">
                    <View>
                        <Text className="text-lg text-stone-100">Estimated Arrival</Text>
                        <Text className="text-4xl font-bold text-stone-100">45-55 Minutes</Text>
                    </View>
                <Image
                    source={{
                        uri: "https://links.papareact.com/fls",
                    }}
                    className="h-20 w-20"  
                />
                </View>
                <Progress.Bar size={30} color="#ec4899" indeterminate={true} />

                <Text className="mt-3 text-stone-100">
                    Your order at {restaurant.title} is being prepared
                </Text>
            </View>
        </SafeAreaView>

        <MapView
        initialRegion={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-20 z-0"
        mapType="mutedStandard"
        >
        </MapView>

        <SafeAreaView className="bg-stone-700 flex-row items-center space-x-5 h-28">
        <Image
            source={{
                uri: "https://links.papareact.com/wru",
            }}
            className="h-12 w-12 pg-stone-700 p-4 rounded-full ml-5"  
        />

        <View className="flex-1">
            <Text className="text-lg text-stone-100">Oonuliina</Text>
            <Text className="text-stone-300">Your Deliver</Text>
        </View>

        <Text className="text-pink-500 text-lg mr-5 font-bold">Call</Text>
        </SafeAreaView>
    </View>
  )
}

export default DeliveryScreen