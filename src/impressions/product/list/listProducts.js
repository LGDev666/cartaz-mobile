import { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet,TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import ProductItem from '../../../../components/ProductItem';
import { ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Foundation } from '@expo/vector-icons';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Spinner } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Details = ({navigation}) =>{

    const session = useSelector(store=> store.session)
    const newImpression = useSelector(store => store.newImpression)

    const [details, setDetails] = useState(null)
    const [loading, setLoading] = useState()
    const [input, setInput] = useState("")
    const [filter, setFilter] = useState(null)
    const dispatch = useDispatch()

    const defaultProducts = [
        {
            id: "266756883",
            type: "product",
            attributes: {
                id: 266756883,
                description: "Bacon Sadia 32,90 Kg",
                ean: "123",
                price: "31.99",
            },
        },
        {
            id: "266756928",
            type: "product",
            attributes: {
                id: 266756928,
                description: "Abóbora Japonesa R$3,99 Kg",
                ean: "308",
                price: "4.99",
            },
        },
        {
            id: "266765274",
            type: "product",
            attributes: {
                "id": 266765274,
                "description": "Creme Dental  Oral B  123 70 G",
                "ean": "7506339363883",
                "price": "2.49",
            },
        },
        {
            id: "266770253",
            type: "product",
            attributes: {
                id: 266770253,
                description: "Cerveja  Skol Redondinha Lata 269 Ml ",
                ean: "7891149103102",
                price: "2.79",
            },
         
        },
        {
            id: "266774337",
            type: "product",
            attributes: {
                id: 266774337,
                description: "Cerveja Brahma Duplo Malte 350 Ml ",
                ean: "7891991294942",
                price: "3.99",
            },
        },
        {
            id: "266774819",
            type: "product",
            attributes: {
                id: 266774819,
                description: "Salg Torcida 70 G Ceb",
                ean: "7892840816872",
                price: "2.69",
            },
        },
        {
            id: "266756889",
            type: "product",
            attributes: {
                id: 266756889,
                description: "Peito De Frango Com Osso  Kg",
                ean: "53",
                price: "16.99",
            },
        },
        {
            id: "266756937",
            type: "product",
            attributes: {
                id: 266756937,
                description: "Banana Nanica Kg",
                ean: "342",
                price: "5.99",
            },
        },
        {
            id: "266787178",
            type: "product",
            attributes: {
                id: 266787178,
                description: "Leite Po Italac Integral 400 G",
                ean: "7898080640369",
                price: "20.99",
            },
        },
        {
            id: "266783108",
            type: "product",
            attributes: {
                id: 266783108,
                description: "Leite Condensado Semidesnatado Marajoara Tp 395 G",
                ean: "7896354100861",
                price: "5.98",
            },
        }
    ] 

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
        return axios.get(`https://evolutionpdv.com.br/api/v3/stores/1/products/products_by_description/${input}`, config)

    }

    const ClickHandler = async () => {
        console.log('work');
        try {
            if(input.trim() != ""){
                setLoading(false)
                searchRequire() 
                    .then(res => { 
                        console.log(res);
                        setFilter(res.data)   
                        setLoading(true)
                     
                    })
            } else {
                return setDetails(defaultProducts)
                
            }
        } 
        catch(e){
            console.log(e)
            Alert.alert('Erro de autenticação!', 'Login expirado ou invalido, entre novamente!')
            navigation.navigate('Login')
            dispatch({ 
                type: 'SESSION_ERROR', 
                payload: {
                    logged: false, //em terioria aaqui eh false pq deu  bosta
                }
            });
        }
    }

    

    useEffect( _=>{
        const products = async () => {
            try {
                setLoading(false)
                await getProducts() 
                .then(res => {
                    setDetails((res.data.data).slice(0, 20))
                    console.log(res.data.data)
                })
                .then(() => {
                    setLoading(true)
                }) 
                
                return
            } 
            catch(e){ //n eh catch, eh 401, nao autorizado.. dae eh login expirado, outros status sao outros motivos
                console.log(e)
                Alert.alert('Erro de autenticação!', 'Login expirado ou invalido, entre novamente!')
                navigation.navigate('Login')
                localStorage.clear()
                dispatch({ 
                    type: 'SESSION_ERROR', 
                    payload: {
                        logged: false, //em terioria aaqui eh false pq deu  bosta
                    }
                });
            }
        }

        products()

    }, [])

    useEffect( _=>{
        const products = async () => {
            try {
                setLoading(false)
                await getProducts() 
                .then(res => {
                    setDetails((res.data.data).slice(0, 20))
                    console.log(res.data.data)
                })
                .then(() => {
                    setLoading(true)
                }) 
                
                return
            } 
            catch(e){ //n eh catch, eh 401, nao autorizado.. dae eh login expirado, outros status sao outros motivos
                console.log(e)
                Alert.alert('Erro de autenticação!', 'Login expirado ou invalido, entre novamente!')
                navigation.navigate('Login')
                localStorage.clear()
                dispatch({ 
                    type: 'SESSION_ERROR', 
                    payload: {
                        logged: false, //em terioria aaqui eh false pq deu  bosta
                    }
                });
            }
        }

        products()

    }, [newImpression.price])


    return(
        
        <View style={{flex: 1, position: 'relative'}}>
           
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.input} 
                    value={input} 
                    placeholder='Digite o nome do produto...' 
                    onChangeText={(Value) => setInput(Value)}
                    onSubmitEditing={() => ClickHandler()}

                />
                <TouchableHighlight style={styles.iconContainer} onPress={ClickHandler}>
                    <Foundation name="magnifying-glass" size={30} color="#37384E"/>
                </TouchableHighlight>
            </View> 
            {
                loading ?
                <>
                    <ScrollView>
                        
                        { filter === null || filter != null ?
                                <FlatList
                                    data={filter !== null ? filter : details}
                                    keyExtractor={item => `${item.id}`}
                                    renderItem={({ item }) => 
                                        <ProductItem route={navigation} 
                                            id={item}
                                            ean={item.attributes.ean ? item.attributes.ean : item.ean}
                                            product={filter != null ? item.description : item.attributes.description}
                                            price={filter != null ? item.price : item.attributes.price}/>
                                    }
                                />  : console.log('error')
                        }
                    </ScrollView>
                </> :
                <Spinner size="lg" style={{marginTop: 50}}/>

            }
        </View>
    )
}


export default Details;

const styles = StyleSheet.create({

    button: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 75,
        top: 600,
        left: 320
    },

    inputContainer:{
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },

    input:{
        height: '100%',
        width: '85%',
        borderBottomWidth: 3,
        borderColor: '#ccc',
        fontSize: '20px',
        paddingLeft: 10
        
    },

    iconContainer:{
        width: '15%',
        height: '100%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 3,
        borderLeftWidth: 3,
        borderColor: '#ccc'
    },

})