import React from 'react'
import { TouchableOpacity, Text, Image } from 'react-native'

export const CategoryCard = ({imgUrl, title}) => {
  return (
    <TouchableOpacity className="relative mr-2">
      <Image source={{
        uri: imgUrl
      }}
      
      className="h-20 w-20 rounded-md"/>
      <Text className="absolute bottom-1 left-1 text-stone-900 font-bold">
        {title}
      </Text>
    </TouchableOpacity>

  )
}

export default CategoryCard
