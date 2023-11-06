import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { useNavigation } from '@react-navigation/native'
import Currency  from 'react-currency-formatter';

const BasketIcon = () => {
    const items = useSelector(selectBasketItems)
    const navigation = useNavigation()
    const basketTotal = useSelector(selectBasketTotal)

    if (items.length === 0) return null

  return (
    <View className="absolute bottom-10 w-full z-50">
        <TouchableOpacity onPress={() => navigation.navigate("Basket")} className=" mx-5 bg-pink-500 p-4 rounded-lg flex-row items-center space-x-1">
        <View className="bg-black rounded-full ">
            <Text className="text-pink-500 font-extrabold text-m py-1 px-2">
                {items.length}
                </Text>
        </View>
        <Text className="flex-1 text-black font-extrabold text-lg text-center">
            View Basket
        </Text>
        <Text className="text-lg text-black font-extrabold">
            <Currency quantity={basketTotal} currency='EUR'/>
        </Text>
        </TouchableOpacity>
    </View>
  )
}

export default BasketIcon