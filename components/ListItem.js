import { Text, View, StyleSheet, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Box, Spinner } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';
import Editable from '../src/impressions/product/edit/editProduct';


const EditableState = {
    packet_quantity: '', 
    newprice: '',
    packet_type: '',
    packet_unity: '',
    packet_price: '',
    atacado_quantity: '',
    atacado_price: '',
    promotional_price: ''
}

const ListItem = props =>{
    const session = useSelector(store=> store.session)
    const [excluding, setExcluding] = useState(false)
    const dispatch = useDispatch()

    const delete_promisse = async _ =>{
        setExcluding(true)
        let headers= {
            'Content-Type': 'application/json',
            'uid': session.uid,
            'client': session.client, 
            'access-token': session.access_token,

        }
        return axios(
            {url:`https://evolutionpdv.com.br/api/v3/stores/1/impressions/${props.id}`, 
            headers: headers,
            method:'PUT',
            data:{
                state: 7
            }
        })
    
    }

    const Delete = () => {
        delete_promisse()
            .then(res => {
                if(res.status === 200){
                    setExcluding(false)
                    props.callback(res)
                }
            })
            .catch(e => {
                console.log(e);
            })
    }

    const newImpression = useSelector(store=> store.newImpression)


    return(
        
            <Box style={{flex: 1}}>
                <View style={styles.textContainer}>
                    <View style={{width: 100, justifyContent: 'flex-end', marginLeft: 10}}>
                        <Text style={[styles.text, {color: '#555'}]}>{`${props.paperType}`}</Text>
                        <Text style={[styles.text, {fontSize: 19}]}>{`${props.product}`}</Text>
                        
                    </View>
                    <View style={styles.priceContainer}>
                        
                        <Text style={styles.priceText}><Text style={{color: 'green', fontSize: 20, }}>R$</Text>{` ${props.price}`}</Text>
                        
                    </View>
                    <TouchableOpacity onPress={() => Delete()} style={{marginLeft: 50}}>
                        {!excluding ?  <FontAwesome5 name="trash" size={30} color="red"/>  : <Spinner size='sm'/>}
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 20}} onPress={() => props.navigation.navigate('editable_product', {id: props.id, type_template: props.type})}>
                        <FontAwesome5 name="edit" size={30} color="#555" />
                    </TouchableOpacity>
                </View> 
            </Box>

    )//mostra o callback do click
}

export default ListItem;

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
        justifyContent: 'flex-start'
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
        justifyContent: 'flex-start',
        marginLeft: 50,
        alignItems: 'center',
        flexDirection: 'row', 
        width: 80,
        paddingTop: 3,
        paddingBottom: 3,
        marginLeft: 50
        
    },

    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8, 
        alignItems: 'center',
        justifyContent: 'flex-start'

    }
  
  })