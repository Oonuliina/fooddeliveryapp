import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { StarIcon, MapPinIcon} from 'react-native-heroicons/outline'
import { urlFor } from '../sanity'
import { useNavigation } from '@react-navigation/native'

const RestaurantCard = ({
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
}) => {

  const navigation = useNavigation()

  return (
    <TouchableOpacity 
    onPress={() => {
      navigation.navigate('Restaurant', {
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
      })
    }}
    className="bg-stone-800 mr-3 shadow-sm rounded-b-md"
    >
      <Image
        source={{
            uri: urlFor(imgUrl).url(),
        }}
        className="h-36 w-64 rounded-t-md" 
      />
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2 text-stone-100">{title}</Text>
        <View className="flex-row items-center space-x-1">
            <StarIcon color="rgb(231 229 228)" opacity={0.8} size={22} />
            <Text className="text-xs text-stone-200">
                <Text className="text-stone-200">{rating}</Text> • {genre}
            </Text>    
        </View>

        <View className="flex-row items-center space-x-1">
          <MapPinIcon color="rgb(231 229 228)" opacity={0.8} size={22} />
          <Text className="text-xs text-stone-200">Nearby • {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default RestaurantCard