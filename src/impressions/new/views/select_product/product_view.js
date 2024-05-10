import { Box, Center, Text } from "native-base"
import { View, StyleSheet, Pressable } from "react-native"
import { FontAwesome5 } from "@expo/vector-icons"
import { useDispatch } from "react-redux";
import { useState } from "react";


const ProductView = props => {

    const dispatch = useDispatch()

    const nextAndSet = () =>{

        let Productobj = {
            product_name: props.product,
            product_id: props.id,
            current_price: props.price,
            layout_id: props.layout,
            ean: props.ean
        }

        dispatch({type: 'SET_LAST_STATS', value: Productobj})

        props.clickHandler(Productobj)
        
    }

    
      

    return (
        <Pressable onPress={() => nextAndSet()}>
            <Box style={{width: '100%', justifyContent: 'space-between'}}>
                
                <View style={styles.textContainer}>
                    <View>
                        <Text style={styles.text}>{props.id}</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>{props.product.substr(0,15)}</Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <FontAwesome5 name="dollar-sign" size={24} color="green" style={styles.priceIcon}/>
                        <Text style={styles.priceText}>{props.price}</Text>
                    </View>
                </View>

                    
                
            </Box>
        </Pressable>
        
    )
}


let styles = StyleSheet.create({

    textContainer: {
        textAlign: 'center',
        flexDirection: 'row',
        width: 400,
        borderBottomWidth: 1,
        paddingBottom: 10,
        paddingTop: 10,
        borderColor: '#0891B2',
        justifyContent: 'space-around',
        alignContent: 'center'

        
    },

    text:{
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 5,
    },

    priceIcon: {
        marginLeft: 2,
    },

    priceContainer: {
        justifyContent: 'center',
        alignContent: 'flex-end', 
        alignItems: 'center',
        flexDirection: 'row', 
        borderWidth: 2, 
        borderRadius: 25, 
        width: 100,
        borderColor: 'green',
        paddingTop: 3,
        paddingBottom: 3

        
    },

    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8, 
        alignItems: 'center',

    }


})

export default ProductView