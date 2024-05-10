import axios from 'axios'
import { Text, Center, Button } from 'native-base'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import DateTimePicker from '@react-native-community/datetimepicker';

const Show = (props) =>{

    const initialstate = {
        paper_id: '',
        sector_id: '', 
        store_number: '',
        price: '',
        layout_id: '',
        product_id: '',
        product_name: '',
    }

    const newImpression = useSelector(store=> store.newImpression)
    const session = useSelector(store=> store.session)
    const dispatch = useDispatch()

    const [val, setVal] = useState(newImpression.expiration_product_date ? newImpression.expiration_product_date : '12-06-2024')
    const [copias, setCopy] = useState(newImpression.quantity ? newImpression.quantity : '5')
    const [promotion, setPromotion] = useState(newImpression.expiration_poster_date ? newImpression.expiration_poster_date : '10-06-2024')
    const [date, setDate] = useState(null)

    console.log(props);
    let impression = {
        company_id: newImpression.company_id,
        sector_id: newImpression.sector_id,
        layout_id: newImpression.layout_id,
        paper_id: newImpression.paper_id,
        price: newImpression.Editable.newprice ? newImpression.Editable.newprice : newImpression.current_price,
        product_id: newImpression.product_id,
        product_name: newImpression.product_name,
        state: newImpression.state,
        quantity: copias,
        expiration_poster_date: promotion,
        expiration_product_date: val
    }

    const CreateRequestImpressions = async () =>{
        let config = {
            headers: {
                'uid': session.uid,
                'client': session.client, 
                'access-token': session.access_token,
                "Content-Type": "multipart/form-data"
            },
            method: 'POST',
            data:{
                impressions:[{...impression}],
                stores: [newImpression.store_number]
            }
        }

        return axios.request(`https://evolutionpdv.com.br/api/v3/stores/${newImpression.store_number}/create_impressions.json`, config)
    }

    console.log(newImpression);


    const CreateImpressions = () => {
        console.log(impression);
        CreateRequestImpressions()
            .then(res => {
                console.log(res)
                dispatch({type: 'SET_LAST_STATS', value: impression})
            })
            .catch(e => console.log(e))
    }

    return (

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{width: 300}}>
                <Text style={styles.title}>Confirmação</Text>
                <Text style={[styles.text, {marginTop: 30}]}>{`Produto: ${impression.product_name}`}</Text>
                <Text style={styles.text}>{`Preço Atual: $${newImpression.Editable.newprice ? newImpression.Editable.newprice : newImpression.current_price}`}</Text>
                <TextInput value={copias} onChangeText={(text) => setCopy(text)}style={[styles.input, {marginTop: 20}]} placeholder='Quantidade de Copias'/>
                <TextInput value={val} onChangeText={(text) => setVal(text)} style={[styles.input, {marginTop: 10 , marginBottom: 10,}]} placeholder='Data de Validade (DD-MM-AA)'/>
                <TextInput value={promotion} onChangeText={(text) => setPromotion(text)} style={[styles.input, {marginBottom: 20,}]} placeholder='Data do término da promoção (DD-MM-AA)'/>
                <DateTimePicker 
                    value={date}
                    onChange={(date) => setDate(date)}
                    mode="date"
                />
                <Button onPress={() => CreateImpressions()} style={[styles.button, {marginBottom: 5, backgroundColor: 'green'}]}>Confimar</Button> 
                <Button onPress={() => props.navigation.navigate('select_product')} style={[styles.button, {marginBottom: 5, backgroundColor: 'red'}]}>Cancelar</Button> 
            </View>
        </View>
        
    )
}

let styles = StyleSheet.create({

    title:{
        fontWeight: 'bold',
        fontSize: 20, 
        textAlign: 'center'
    },

    text:{
        fontWeight: 'bold',
        fontSize: 18,     
    },
    
    input:{
        width: '100%',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#208AEC',
        textAlign: 'center',
        fontSize: 16,
        padding: 10
    },

    button: {
        fontWeight: 'bold',
        fontSize: 16,
        borderRadius: 15,
    }
})

export default Show