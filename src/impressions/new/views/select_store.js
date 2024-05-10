import { Box, Button, Center } from "native-base"
import React, { useEffect, useState } from "react"
import { Text, View } from "react-native"
import ButtonStore from "../components/button_store"
import { useSelector, useDispatch } from 'react-redux';
import Spinner from "../components/spinner";
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons';


const SelectStore = ({navigation, route}) =>{
    const [storesList, setStoresList] = useState([])
    const session = useSelector(store => store.session)
    const dispatch = useDispatch();
    const newImpression = useSelector(store=> store.newImpression)
    const [loading, setLoading] = useState(true)

    console.log('componente store');

    const clickHandler = storeNumber =>{

        dispatch({
            type:'SET_STORE_ID',
            value: {storeNumber: storeNumber, FromNewimpression: true}
        })

        if(newImpression.FromProduct){
            navigation.navigate('layout', {...route.params})
        } else {
            navigation.push('select_paper') 
        }
    }

    const getStoresList = props =>{
        let config = {
            headers: {
                'uid': session.uid,
                'client': session.client, 
                'access-token': session.access_token
            }
        }
        axios.get('https://evolutionpdv.com.br/api/v3/stores/',config).then(data=>{
            setStoresList(data.data.data.map(x=>({name: x.attributes.name, id: x.attributes.public_id})))
            setLoading(false)
        })
        
    }

    useEffect(_=>{
        getStoresList()
    },[]) //aqui ta legal
    

    return (
        <Center>

            {
                !loading ?
                    storesList.map((store) => 
                        (<ButtonStore onclick={clickHandler} key={store.id} store={store}></ButtonStore>)
                    )
                    
                :
                    <Spinner text={"Carregando lista de lojas"}></Spinner>
                
            }         
        </Center>
    )
} 

export default SelectStore