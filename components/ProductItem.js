import { Text, View, StyleSheet } from 'react-native';
import { TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import { Box, Center, Row } from 'native-base';
import { useDispatch } from 'react-redux';
import { current } from '@reduxjs/toolkit';

const ListProducts = props =>{
    //mas isso nao eh uma lista de produtos.. se ta nomeando com o cu
    console.log(props);
    const CodBarras = props.ean
    const dispatch = useDispatch()

    const clickHandler = () => {
        dispatch({type:'FROM_PRODUCT', value: {
            fromproduct: true,
            product: props.product,
            currentPrice: props.price,
        }})

        dispatch({type:'SET_EAN', value: {
            ean: props.ean
        }})
        props.route.navigate('Editable', {id: props.id, product: props.product, currentPrice: props.price})
    }

    return(
        <TouchableWithoutFeedback onPress={() => clickHandler()} style={styles.container}>
        <Box style={{flex: 1}}>
            <View style={styles.textContainer}>
                <View style={{width: 200}}>
                    <Text style={styles.text}>{`${props.product.substr(0,25)}`}</Text>
                   <Text style={[styles.text, {fontSize: 15,color: '#555'}]}>{`${CodBarras}`}</Text> 
                </View>
                <View style={styles.priceContainer}>
                    
                    <Text style={styles.priceText}><Text style={{color: 'green', fontSize: 20}}>R$</Text>{` ${props.price}`}</Text>
                    
                </View>

            </View>
      
        </Box>
        </TouchableWithoutFeedback>
    )
}

export default ListProducts;

const styles = StyleSheet.create({

    textContainer: {
        textAlign: 'center',
        flexDirection: 'row',
        width: 400,
        borderBottomWidth: 1,
        paddingBottom: 10,
        paddingTop: 10,
        borderColor: '#ccc',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },

    text:{
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 5,
        textAlign: 'center',
    },

    priceIcon: {
        marginLeft: 2,
    },

    priceContainer: {
        justifyContent: 'center',
        marginLeft: 50,
        alignItems: 'center',
        flexDirection: 'row', 
        width: 100,
        paddingTop: 3,
        paddingBottom: 3,
        marginRight: 30
        
    },

    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8, 
        alignItems: 'center',

    }
    
  
})