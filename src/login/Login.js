import { FontAwesome } from "@expo/vector-icons"
import { Button, Center, Spinner } from "native-base"
import { useEffect, useState } from "react"
import { StyleSheet, TextInput, View, Image, Text, Alert } from "react-native" 
import { TouchableOpacity } from "react-native-gesture-handler"
import { TouchableHighlight } from "react-native-web"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"

const Login = props =>{

    const [login, setLogin] = useState({
        username: 'maxmaster',
        password: 'Admin123'
    })
    const [Focus, setFocus] = useState({
        border: 'grey'
    })
    const [loading, setLoading] = useState(false)
    const [logged, setLogged] = useState(false)

    const dispatch = useDispatch();
    const session = useSelector(store=> store.session)
 
    const loginRequest = async (user) => {

        setLoading(true)

        let config = {
            'login': login.username,
            'password': login.password,
        }

        return axios.post(`https://evolutionpdv.com.br/api/v1/auth/sign_in`, config)
    }

    const loginIn = () => {
        loginRequest(login)
            .then((res) => {
                setLoading(false)
                console.log(res);
                //cara, se eu entrar para de mexer nessa porra

                if(res.headers['access-token']){
                    //aqui vc vai alterar a variavel e ela vai trocar a scrreen
                    dispatch({ 
                        type: 'UPDATE_SESSION', 
                        payload: {
                            company_id: res.data.data.company_id,
                            user_id: res.data.data.id,
                            uid: res.headers.uid,
                            client: res.headers.client,
                            access_token: res.headers['access-token'],
                            logged: true, //em terioria aaqui eh true, pq funcionou
                        }
                    });
                    props.navigation.navigate('TabNavigator')
                    localStorage.setItem('session', JSON.stringify({
                        company_id: res.data.data.company_id,
                        user_id: res.data.data.id,
                        uid: res.headers.uid,
                        client: res.headers.client,
                        access_token: res.headers['access-token'],
                        logged: true, //em terioria aaqui eh true, pq funcionou
                    }))
                    setLogged(true)
                }

               //useDispath here
            })
            .catch(e => {
                if(e.response.status === 401){
                Alert.alert('Erro no Login', 'Email ou senha incorretos!')
                console.log('Erro no Login', e)
                setLoading(false)}
                else{
                    console.log('Erro na aplicacao')
                    Alert.alert('Erro na aplicação', 'Contatar suporte!')
                }
            })
        
    }

    useEffect(() => {
        let storage = localStorage.getItem('session')

        if(storage){
            let newstorage = JSON.parse(storage)

            console.log('newstorage ', newstorage);
            dispatch({ 
                type: 'UPDATE_SESSION', 
                payload: newstorage
            });
            props.navigation.navigate('TabNavigator')
            setLogged(true)
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.LoginContainer}>
                <View style={styles.imageContainer}>
                    <Image source={require('./Icon.png')} style={{width: '100%',height: '100%', borderRadius: 25}}/>
                </View>
                <View>
                    <Text style={[styles.text, {fontWeight: 'bold', fontSize: '20px', marginBottom: 3}]}>Bem vindo ao Cartaz Manager</Text>
                    <Text style={[styles.text, {marginBottom: 20,fontSize: '14px'}]}>Aqui você consegue gerenciar seu processo de criação de cartazes</Text>
                </View>
                <View>
                    <FontAwesome style={styles.Icon} name="user" size={22} color="#7f7f7f" />
                    <TextInput onFocus={() => setFocus({border: 'rgb(8, 145, 178)'})} placeholder="Usuário" value={login.username} style={[styles.input, {marginBottom: 8, borderColor: Focus.border,}]} onChangeText={value => setLogin({...login, username: value})}/>
                    <FontAwesome style={[styles.Icon, {top: 42}]} name="lock" size={24} color="#7f7f7f" />
                    <TextInput placeholder="Senha" secureTextEntry={true} value={login.password} style={[styles.input, {borderColor: Focus.border,}]} onChangeText={value => setLogin({...login, password: value})}/>
                    {
                        loading  ?
                        <Spinner size="lg" style={{marginTop: 50}}/> :
                        <Button onPress={() => loginIn()} style={styles.buttom}>Entrar</Button>
                    }
                </View>
            </View>
        </View>
    )

}

export default Login

let styles = StyleSheet.create({

    container:{ 
        flex: 1,
        justifyContent: 'center'
    },

    LoginContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 450,
        marginBottom: 50 
    },

    input:{
        borderRadius: '3px',
        width:'100%',
        height: '30px',
        borderWidth: '1px',
        paddingLeft: 40
    },

    text:{ 
        textAlign: 'center',
        color: '#555'
    },

    imageContainer: {
        width: 120,
        height: 120,
        marginBottom: 20
    },

    buttom: {
        marginTop: 15,
        fontWeight: 'bold'
    },

    Icon:{
        position: 'absolute',
        left: 10,
        top: 3,
    },
})