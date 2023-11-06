import { View, Text, Image, TextInput, ScrollView } from 'react-native'
import React, { useLayoutEffect , useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { 
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon, 
} from 'react-native-heroicons/outline'
import Categories from '../components/Categories'
import FeaturedRow from '../components/FeaturedRow'
import client from '../sanity'

const HomeScreen = () => {
  const navigation = useNavigation()
const [featuredCategories, setFeaturedCategories] = useState([])
   
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  useEffect(() => {
    client
    .fetch(
      `
      *[_type=='featured'] {
        ...,restaurants[] -> {
          ...,dishes[] -> {
            ...,
          }
        }
      }
      `
    )
    .then((data) => {
      setFeaturedCategories(data)
    })
}, [])

  return (
    <SafeAreaView className="bg-stone-800 pt-5">
        {/*Header*/}
        <View className="flex-row pb-3 items-center mx-4 space-x-2">
          <Image
            source={{
              uri: "https://links.papareact.com/wru",
            }} 
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />

          <View className="flex-1">
            <Text className="font-bold text-stone-200 text-xs">
              Deliver Now!
              </Text>
            <Text className="font-bold text-xl text-stone-100">
              Current Location
              <ChevronDownIcon size={20} color="rgb(236 72 153)" /> 
            </Text>
          </View>

          <UserIcon size={35} color="rgb(236 72 153)" />
        </View>

        {/*Search */}
            <View className="flex-row items-center space-x-2 pb-2 mx-4">
              <View className="flex-row flex-1 space-x-2 bg-stone-700 p-3 rounded-lg">
                <MagnifyingGlassIcon color="lightgray" size={20} />
                <TextInput
                  placeholder='Restaurants and cuisines'
                  keyboardType='default' 
                /> 
              </View>
              <AdjustmentsVerticalIcon color="rgb(236 72 153)" />
            </View>

        {/*Body*/}
        <ScrollView className="bg-black"
          contentContainerStyle={{
            paddingBottom: 100,
      }}
        >
          {/*Categories */}
            <Categories />

          {/*Featured Rows*/}

          {featuredCategories?.map(category => (
            <FeaturedRow
            key={category._id}
            id={category._id} 
            title={category.name}
            description={category.short_description}
          />
          ))}
        </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen