import { Center, Image } from "native-base"
import React from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"

const ImageButton = (opts={}) =>{
    return (
        <Pressable onPress={_=>opts.onclick(opts.id, opts.type)}>
            <Image
                alt="Alternate Text"
                source={{
                    uri: opts.src
                }} 
                style={styles.logo}
                />
            <Center>
                <Text>{opts.text}</Text>
            </Center>
        </Pressable>
    )
}

export default ImageButton


const styles = StyleSheet.create({
    logo: {
      width: 200,
      height: 100,
      marginTop: 5,
      marginBottom: 10,
      borderRadius: 5
    },
});