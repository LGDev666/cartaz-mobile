import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Center, Input } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'

const EditableState = {
    description: '', 
    newprice: '',
}

const Editable = (props) =>{

    console.log(props)

    const [EditList, setEditList] = useState({...EditableState})
    const dispatch = useDispatch()
    const session = useSelector(store=> store.session)

    const Edit_Promisse = async () => {
        console.log(newImpression.ean);
        let config = {
            headers: {
                'uid': session.uid,
                'client': session.client, 
                'access-token': session.access_token,
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            data:{
                description: EditList.description != '' && EditList.description.trim() != '' ? EditList.description : props.route.params.product,
                price: EditList.newprice != '' && EditList.newprice.trim() != '' ? EditList.newprice : props.route.params.currentPrice
            }
        }
    
        return axios.request(`
            https://evolutionpdv.com.br/api/v3/stores/1/products/${newImpression.ean}`, config
        )
        
        
        
    }

    const clickHandler = (list) => {
        list.newprice != '' && list.newprice.trim() != '' || 
        list.description != '' && list.description.trim() != '' ? 
            Edit_Promisse()
                .then(res => {
                    console.log(res)
                    dispatch({type:'FROM_PRODUCT', value: {
                        fromproduct: true,
                        product: res.data.data.attributes.description,
                        currentPrice: props.route.params.currentPrice,
                        newprice: res.data.data.attributes.price
                    }})
                    props.navigation.goBack()
                })
                .catch(e => console.log(e)):
            null
        // props.navigation.navigate('cartaz', list) :
        // props.navigation.navigate('cartaz', {id: props.route.params.id, product: props.route.params.product, currentPrice: props.route.params.currentPrice})
    }
    
    useEffect(_=>{
        dispatch({type:'FROM_PRODUCT', value: {
            fromproduct: true,
            currentPrice: props.route.params.currentPrice,
        }})
    },[]) 

    const newImpression = useSelector(store => store.newImpression)
    console.log(newImpression);
    return (
        <Center>
            <Text style={{textAlign: 'center',fontSize: '20px',fontWeight: 'bold', marginTop: 50}}>Edição Opcional</Text>
            <View style={{marginTop: 25}}>
                <Text style={{fontSize: '18px', marginBottom: 3}}>{`Produto: ${newImpression.product ? newImpression.product : props.route.params.product }`}</Text>
                <Text style={{fontSize: '18px'}}>{`Preço Atual: ${newImpression.price ? newImpression.price : props.route.params.currentPrice}`}</Text>
            </View>
            <View style={{width: 300, marginTop: 30}}>
                <Input onChangeText={(value) => setEditList({...EditList, newprice: value})} style={styles.input} value={EditList.newprice} placeholder='Novo Preço'/>
                <Input onChangeText={(value) => setEditList({...EditList, description: value})} style={styles.input} value={EditList.description} placeholder='Nova Descrição'/>
                <Button onPress={() =>  clickHandler(EditList) }>Continuar</Button>
            </View>
        </Center>
    )
}

export default Editable

let styles = StyleSheet.create({

    input:{
        textAlign: 'center',
        width: '100%',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#208AEC',
        marginBottom: 5
    }

})