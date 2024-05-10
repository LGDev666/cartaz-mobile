import axios from "axios"
import { Box, Button, Center, FlatList, View } from "native-base"
import { ScrollView,  } from 'react-native-gesture-handler';
import React, { useEffect, useState } from "react"
import { Text } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import Spinner from '../components/spinner'
import ImageButton from "../components/image_button"
import LayoutButton from "../components/layout_button"
import { Ionicons } from "@expo/vector-icons"

const SelectLayout = props =>{
    const [layoutsList, setLayoutsList] = useState([])
    const session = useSelector(store=> store.session)
    const newImpression = useSelector(store=> store.newImpression)
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    console.log('componente layout');

    const getLayouts = async _ =>{
        let config = {
            headers: {
                'uid': session.uid,
                'client': session.client, 
                'access-token': session.access_token
            }
        }
        return await axios.get(`https://evolutionpdv.com.br/api/v3/stores/${newImpression.store_number}/sectors/${newImpression.sector_id}/available_layouts`, config)
    }

    useEffect(_=>{
        getLayouts().then(data=>{
            setLayoutsList(data.data.data)
            console.log(data);
            setLoading(false)
        })
    },[]) 
   
    console.log(props);
    const clickHandler= (id, type) =>{
        if(newImpression.FromProduct){
            props.navigation.navigate('Editable', {...props.route.params, layout_id: id})
            dispatch({type:'FROM_PRODUCT', value: {fromproduct: false}})
        } else{
            
            dispatch({type:'SET_LAYOUT_ID', value: {
                id: id,
                type_template: type
            }})
        
            props.navigation.navigate('select_product')
        }
    }
    console.log(layoutsList);
    return (
        
            <View style={{flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>

                {
                   !loading ? 
                    <ScrollView>
                        
                        <View style={{flex: 1}}>
                            
                            <FlatList
                                data={layoutsList}
                                keyExtractor={item => `${item.id}`}
                                renderItem={( {item} ) => 
                                    <LayoutButton 
                                        key={item.id}
                                        type={item.attributes.type_template}
                                        src={item.attributes.snapshot_url.url} 
                                        text={item.attributes.name} 
                                        id={item.id} onclick={_=>clickHandler(item.id, item.attributes.type_template)}>
                                    </LayoutButton>
                                }
                            /> 
                                        
                        </View>
                
                    </ScrollView> : (<Spinner text={"Carregando lista de layouts"}></Spinner>)
                }
            </View>
        
    )
}

export default SelectLayout