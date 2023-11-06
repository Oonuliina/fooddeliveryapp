import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { urlFor } from '../sanity'
import { ArrowLeftIcon, ChevronRightIcon, MapPinIcon, QuestionMarkCircleIcon, StarIcon } from 'react-native-heroicons/outline'
import DishRow from '../components/DishRow'
import BasketIcon from '../components/BasketIcon'
import { useDispatch } from 'react-redux'
import { setRestaurant } from '../features/restaurantSlice'

const RestaurantScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const {
        params: {
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat,
        },
    } = useRoute()

    useEffect(() => {
        dispatch(setRestaurant({
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat,
        }))
    }, [dispatch])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

  return (
    <>
    <BasketIcon />

    <ScrollView className="bg-black">
        <View className="relative">
        <Image
            source={{
                uri: urlFor(imgUrl).url(),
            }}
            className="w-full h-56 bg-black p-4" 
        />
        <TouchableOpacity 
            onPress={navigation.goBack} 
            className="absolute top-14 left-5 p-2 bg-stone-700 rounded-full opacity-60"
        >
            <ArrowLeftIcon size={20} color={"rgb(231 229 228)"}/>
        </TouchableOpacity>
        </View>

        <View className="bg-black">
            <View className="px-4 pt-4">
                <Text className="text-3xl font-bold text-stone-100">{title}</Text>
                
                <View className="flex-row space-x-2 my-1">    
                    <View className="flex-row items-center space-x-1">
                        <StarIcon color="rgb(231 229 228)" opacity={0.8} size={22}/>
                        <Text className="text-xs text-stone-200">
                            <Text className="text-stone-200">{rating}</Text> • {genre}
                        </Text> 
                    </View>

                    <View className="flex-row items-center space-x-1">
                        <MapPinIcon color="rgb(231 229 228)" opacity={0.8} size={22}/>
                        <Text className="text-xs text-stone-200">
                            <Text className="text-stone-200">Nearby • {address}</Text>
                        </Text> 
                    </View>
                </View>

                <Text className="text-stone-200 mt-2 pb-4">{short_description}</Text>
            </View>

            <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-stone-800">
                <QuestionMarkCircleIcon color="rgb(231 229 228)" opacity={0.8} size={20} />
                <Text className="pl-2 flex-1 text-md font-bold text-stone-100">
                    Have a food allergy?
                </Text>
                <ChevronRightIcon color={"rgb(236 72 153)"} />
            </TouchableOpacity>

            <View className="pb-36">
                <Text className="px-4 pt-4 mb-3 font-bold text-xl text-stone-100  bg-black">Menu</Text>

               {dishes.map(dish => (
                    <DishRow
                        key={dish._id}
                        id={dish._id}
                        name={dish.name}
                        description={dish.short_description}
                        price={dish.price}
                        image={dish.image}
                    />
                ))}
            </View>
        </View>   
    </ScrollView>
    </>
  )
}

export default RestaurantScreen