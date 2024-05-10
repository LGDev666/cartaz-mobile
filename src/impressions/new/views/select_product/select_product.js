import { Box, Button, Center, FlatList, IconButton, Input, InputGroup, InputRightAddon, Spinner, Stack } from "native-base"
import React, { useEffect, useState } from "react"
import { ScrollView } from 'react-native-gesture-handler';
import { Text, StyleSheet } from "react-native"
import {MaterialDesign} from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/FontAwesome'
import ProductView from "./product_view"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import Editable from '../../../product/edit/editProduct';
const SelectProduct = (props) =>{
    const [product, setProduct] = useState('')
    const [productItem, setProductItem] = useState({})
    const [productList, setProductList] = useState([])
    const [filter, setFilter] = useState(null)
    const [loading, setLoading] = useState(false)
    const newImpression = useSelector(store=>store.newImpression)
    const session = useSelector(store => store.session)
    

    const getProducts = _ =>{
        let config = {
            headers: {
                'uid': session.uid,
                'client': session.client, 
                'access-token': session.access_token
            }
        }
        return axios.get(`https://evolutionpdv.com.br/api/v3/stores/1/products/`, config)

    }

    const searchRequire = () => {
        let config = {
            headers: {
                'uid': session.uid,
                'client': session.client, 
                'access-token': session.access_token
            }
        }
        return axios.get(`https://evolutionpdv.com.br/api/v3/stores/1/products/products_by_description/${product}`, config)

    }

    const ClickHandler = async () => {
        console.log('work');
        try {
            if(product != "" && product.trim() != ""){
                setLoading(true)
                searchRequire() 
                    .then(res => { 
                        
                        productItem && product ? setFilter(res.data) : null   
                        setLoading(false)
                        console.log(res);
                     
                    })
            }
            else return productItem
        } 
        catch(e){
            console.log(e)
        }
    }
    
    const products = async () => {
        try {
            setLoading(true)
            await getProducts() 
            .then(res => {
                setProductItem((res.data.data).slice(0, 20))
                console.log((res.data.data).slice(0, 20))
                productItem ? setLoading(false) : null
            })
            return
        } 
        catch(e){
            console.log(e)
        }
    }

    useEffect( _=>{
        products()
    }, [])

    useEffect( _=>{
        products()
    }, [newImpression.Editable.newprice])


    //dois methods com nome igual
    const clickHandler = (obj) =>{
        props.navigation.navigate('Show')
        // console.log(obj);
    }

    return (
        <ScrollView>
            <Center>
                <Box>
                    <Text style={styles.text}>Selecione o produto</Text>
                </Box>
                <Box alignItems="center" justifyItems='center' style={{marginBottom: 20,}}>
                    <Input value={product} type={"text"} w="100%" onSubmitEditing={() => ClickHandler()} onChangeText={(text)=> setProduct(text)} backgroundColor={'white'} InputRightElement={
                        <IconButton onPress={() => ClickHandler()} size="xs" variant='solid' rounded="none" w="1/6" h="full" _icon={{as: Icon, name: 'search'}}></IconButton>}
                    />
                    <Button style={{marginBottom: 10}} width={'100%'} leftIcon={<Icon as={Icon} name="barcode" color={'white'}></Icon>} size={'sm'}>Escanear</Button>
                </Box>
                <Box style={{width: '100%', height: 2, backgroundColor: '#0891B2',}}></Box>
                <Box>
                
                    {
                        loading ? <Spinner size='lg' style={{marginTop: 20}}/> :
                        <FlatList
                            data={filter !== null ? filter : productItem}
                            keyExtractor={item => `${item.id}`}
                            renderItem={({ item }) => 
                                    <ProductView
                                        id={item.id} 
                                        product={filter != null ? item.description : item.attributes.description}
                                        price={filter != null ? item.price : item.attributes.price}
                                        ean={filter != null ? item.ean : item.attributes.ean}
                                        clickHandler={clickHandler}
                                        layout={newImpression.layout_id}
                                    />
                                }
                        /> 
                    }
                
                </Box>
            </Center>
        </ScrollView>
    )
}

let styles = StyleSheet.create({
    text:{
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 20,
        marginBottom: 10
    }
})

export default SelectProduct

