import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/outline'
import { urlFor } from '../sanity'
import Currency  from 'react-currency-formatter';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from '../features/basketSlice';

const DishRow = ({ id, name, description, price, image }) => {
    const [isPressed, setIsPressed] = useState(false)
    const items = useSelector((state) => selectBasketItemsWithId(state, id))
    const dispatch = useDispatch()

    const addItemToBasket = () => {
        dispatch(addToBasket({ id, name, description, price, image }))
    }

    const removeItemFromBasket = () => {
        if(!items.length > 0) return

        dispatch(removeFromBasket({ id }))
    }

  return (
    <>
    <TouchableOpacity 
        onPress={() => setIsPressed(!isPressed)} 
        className={`bg-black border-b p-4 border-stone-800 ${isPressed && "border-b-0"}`}>
        <View className="flex-row">
            <View className="flex-1 pr-2">
                <Text className="text-lg mb-1 text-stone-100">{name}</Text>
                <Text className="text-stone-300">{description}</Text>
                <Text className="text-pink-500 mt-2">
                    <Currency quantity={price} currency="EUR" />
                </Text>
            </View>
            <View>
                <Image
                    source={{
                        uri: urlFor(image).url(),
                    }}
                    className="h-20 w-20 bg-black p-4 rounded-md" 
                />
            </View>
        </View>
    </TouchableOpacity>

    {isPressed && (
        <View className="bg-black px-4">
            <View className="flex-row items-center space-x-2 pb-3">
                <TouchableOpacity disabled={!items.length} onPress={removeItemFromBasket}>
                    <MinusCircleIcon
                        size={40}
                        color={ items.length > 0 ? "rgb(214 211 209)" : "gray"} 
                    />
                </TouchableOpacity>

                <Text className="text-stone-100">{items.length}</Text>

                <TouchableOpacity onPress={addItemToBasket}>
                    <PlusCircleIcon size={40} color={"rgb(214 211 209)"} />
                </TouchableOpacity>

            </View>
        </View>
    )}
    </>
  )
}

export default DishRow