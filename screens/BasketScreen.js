import { SafeAreaView, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectRestaurant } from '../features/restaurantSlice'
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { ArrowDownIcon, XCircleIcon } from 'react-native-heroicons/outline'
import { urlFor } from '../sanity'
import Currency  from 'react-currency-formatter';

const BasketScreen = () => {
    const navigation = useNavigation()
    const restaurant = useSelector(selectRestaurant)
    const items = useSelector(selectBasketItems)
    const basketTotal = useSelector(selectBasketTotal)
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
      const groupedItems = items.reduce((results, item) => {
        (results[item.id] = results[items.id] || []).push(item)
        return results
      }, {})

      setGroupedItemsInBasket(groupedItems)
    }, [items])

    return (
      <SafeAreaView className="flex-1 bg-stone-800">
        <View className="flex-1 bg-black">
          <View className="p-5 bg-black shadow-xs">
            <View className="bg-black">
              <Text className="text-lg font-bold text-center text-stone-100">Basket</Text>
              <Text className="text-center text-stone-300">{restaurant.title}</Text>
            </View>
            
            <TouchableOpacity 
              onPress={navigation.goBack} 
              className="absolute top-7 left-5 p-2 bg-stone-700 rounded-full opacity-80"
            >
              <ArrowDownIcon size={20} color={"rgb(231 229 228)"}/>
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center space-x-4 px-4 py-3 my-5 bg-black">
            <Image 
              source={{
                uri: "https://links.papareact.com/wru",
              }}
              className="h-7 w-7 bg-gray-300 p-4 rounded-full" 
            />
            <Text className="flex-1 text-stone-100 ">Deliver in 50-75 min</Text>
            <TouchableOpacity>
              <Text className="text-pink-500">Change</Text>
            </TouchableOpacity>
          </View>

          <ScrollView className="text-stone-100 divide-y divide-stone-800">
            {Object.entries(groupedItemsInBasket).map(([key, items]) => (
              <View key={key} className="flex-row items-center space-x-3 bg-black py-2 px-5">
                <Text className="text-stone-100">{items.length} x</Text>
                <Image
                  source={{ uri: urlFor(items[0]?.image).url() }}
                  className="h-12 w-12 rounded-full" 
                />
                <Text className="flex-1 text-stone-100">{items[0]?.name}</Text>
                <Text className="text-stone-100">
                  <Currency quantity={items[0]?.price} currency="EUR" />
                </Text>

                <TouchableOpacity>
                  <Text
                    className="text-pink-500 text-xs"
                    onPress={() => dispatch(removeFromBasket({ id: key }))}
                  >
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <View className="p-5 bg-stone-800 mt-5 space-y-4">
              <View className="flex-row justify-between">
                <Text className="text-stone-300">Subtotal</Text>
                <Text className="text-stone-300">
                  <Currency quantity={basketTotal} currency="EUR" />  
                </Text>
              </View>

              <View className="flex-row justify-between">
                <Text className="text-stone-300">Delivery Fee</Text>
                <Text className="text-stone-300">
                  <Currency quantity={5.90} currency="EUR" />  
                </Text>
              </View>

              <View className="flex-row justify-between">
                <Text className="text-stone-100 font-extrabold">Order Total</Text>
                <Text className="text-stone-100 font-extrabold">
                  <Currency quantity={basketTotal + 5.90} currency="EUR" />  
                </Text>
              </View>

              <TouchableOpacity onPress={() => 
                navigation.navigate("PreparingOrderScreen")} 
                className="rounded-lg bg-pink-500 p-4"
              >
                <Text className="text-center text-black text-lg font-bold">Place Order</Text>
              </TouchableOpacity>

          </View>
        </View>
      </SafeAreaView>
    )
  }

export default BasketScreen