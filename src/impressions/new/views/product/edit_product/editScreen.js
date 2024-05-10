import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import { Button, Center, Input } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'

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

const Editable = (props) =>{

    const Edit_Promisse = () => {
        let config = {
            headers: {
                'uid': session.uid,
                'client': session.client, 
                'access-token': session.access_token,
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            data:{
                ...EditList,
                price: EditList.newprice
            }
        }
    
        return axios.request(`
            https://evolutionpdv.com.br/api/v3/stores/1/impressions/${props.route.params.id}`, config
        )
        
        
        
    }

    console.log(props);

    const [EditList, setEditList] = useState({...EditableState})
    const dispatch = useDispatch()
    const newImpression = useSelector(store => store.newImpression)
    const session = useSelector(store=> store.session)
    
    const clickHandler = (list) =>{
        dispatch({type:'SET_EDITABLE_STATS', value: {...list}})
        Edit_Promisse(list)
            .then(res => {
                console.log(res);
            })
            .catch(e => {
                console.log(e);
            })
        props.navigation.goBack()
    }
    
    return (
        <Center>
            { 
                props.route.params.type_template === "unit" || props.route.params.type_template === "unit_1kg_to_100gr" ? 
                <View style={{width: 300, marginTop: 50}}>
                    <Input onChangeText={(value) => setEditList({...EditList, newprice: value})} style={styles.input} value={EditList.newprice} placeholder='Novo Preço'/>
                    <Button style={{marginTop: 10}} onPress={() =>  clickHandler(EditList) }>Confirmar Edição</Button>
                </View> : null
            }
            { 
                props.route.params.type_template === "de_por" ? 
                <View style={{width: 300, marginTop: 50}}>
                    <Input onChangeText={(value) => setEditList({...EditList, newprice: value})} style={styles.input} value={EditList.newprice} placeholder='Novo Preço'/>
                    <Input onChangeText={(value) => setEditList({...EditList, promotional_price: value})} style={styles.input} value={EditList.promotional_price} placeholder='Oferta "Por" '/>
                    <Button style={{marginTop: 10}} onPress={() =>  clickHandler(EditList) }>Confirmar Edição</Button>
                </View> : null
            }
            { // concultar oq é valor de "caixa"
                props.route.params.type_template === "package" ? 
                <View style={{width: 300, marginTop: 50}}>
                    <Input onChangeText={(value) => setEditList({...EditList, newprice: value})} style={styles.input} value={EditList.newprice} placeholder='Novo Preço'/>
                    <Input onChangeText={(value) => setEditList({...EditList, packet_quantity: value})} style={styles.input} value={EditList.packet_quantity} placeholder='Quantidade de itens na embalagem'/>
                    <Input onChangeText={(value) => setEditList({...EditList, packet_unity: value})} style={styles.input} value={EditList.packet_unity} placeholder='Tipo de unidade (Unidade, Kg, Gr)'/>
                    <Input onChangeText={(value) => setEditList({...EditList, packet_type: value})} style={styles.input} value={EditList.packet_type} placeholder='Tipo de embalagem (Caixa, Fardo, Pacote)'/> 
                    <Input onChangeText={(value) => setEditList({...EditList, packet_price: value})} style={styles.input} value={EditList.packet_price} placeholder='Valor da Embalagem'/> 
                    <Button style={{marginTop: 10}} onPress={() =>  clickHandler(EditList) }>Confirmar Edição</Button>
                </View> : null
            }
            {
                props.route.params.type_template === "atacado" ? 
                <View style={{width: 300, marginTop: 50}}>
                    <Input onChangeText={(value) => setEditList({...EditList, newprice: value})} style={styles.input} value={EditList.newprice} placeholder='Novo Preço'/>
                    <Input onChangeText={(value) => setEditList({...EditList, atacado_quantity: value})} style={[styles.input]} value={EditList.atacado_quantity} placeholder='Quantidade de unidades para venda em atacado'/>
                    <Input onChangeText={(value) => setEditList({...EditList, atacado_price: value})} style={[styles.input]} value={EditList.atacado_price} placeholder='Quantidade de unidades para venda em atacado'/> 
                    <Button style={{marginTop: 10}} onPress={() =>  clickHandler(EditList) }>Confirmar Edição</Button>
                </View> : null
            }
            {
                props.route.params.type_template === "atacado_package" ? 
                <View style={{width: 300, marginTop: 50}}>
                    <Input onChangeText={(value) => setEditList({...EditList, newprice: value})} style={styles.input} value={EditList.newprice} placeholder='Novo Preço'/>
                    <Input onChangeText={(value) => setEditList({...EditList, atacado_quantity: value})} style={[styles.input]} value={EditList.atacado_quantity} placeholder='Quantidade de unidades para venda em atacado'/>
                    <Input onChangeText={(value) => setEditList({...EditList, atacado_price: value})} style={[styles.input]} value={EditList.atacado_price} placeholder='Quantidade de unidades para venda em atacado'/> 
                    <Input onChangeText={(value) => setEditList({...EditList, packet_quantity: value})} style={styles.input} value={EditList.packet_quantity} placeholder='Quantidade de itens na embalagem'/>
                    <Input onChangeText={(value) => setEditList({...EditList, packet_unity: value})} style={styles.input} value={EditList.packet_unity} placeholder='Tipo de unidade (Unidade, Kg, Gr)'/>
                    <Input onChangeText={(value) => setEditList({...EditList, packet_type: value})} style={styles.input} value={EditList.packet_type} placeholder='Tipo de embalagem (Caixa, Fardo, Pacote)'/> 
                    <Input onChangeText={(value) => setEditList({...EditList, packet_price: value})} style={styles.input} value={EditList.packet_price} placeholder='Valor da Embalagem'/> 
                    <Button style={{marginTop: 10}} onPress={() =>  clickHandler(EditList) }>Confirmar Edição</Button>
                </View> : null
            }
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