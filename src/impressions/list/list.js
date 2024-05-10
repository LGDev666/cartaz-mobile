import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, StyleSheet, FlatList, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import ListItem from '../../../components/ListItem';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { Spinner } from 'native-base';

const initialState = {
  paperType: 'A4',
  product: 'Tomate',
  sector: 'Comercio',
  price: 'R$ 50'
}

const List = ({navigation}) =>{

  const session = useSelector(store=> store.session)

  const getUnfinishedImpressions = async _ =>{
      let config = {
          headers: {
              'uid': session.uid,
              'client': session.client, 
              'access-token': session.access_token
          }
      }
      return axios.get(`https://evolutionpdv.com.br/api/v3/stores/1/impressions/waiting_printing`, config)

  }

  const callback = (props) => {
    props ? getUnfinishedImpressions()
      .then(res => {
        console.log(res.data.data)
        setDetails([...res.data.data])
      })
      .catch(e => {
        console.log('Erro na auth' , e)
        Alert.alert('Erro de autenticação!', 'Login expirado ou invalido, entre novamente!')
        navigation.navigate('Login')
      }) : null

    console.log(details);
  }

  const newImpression = useSelector(store=> store.newImpression)

  useEffect(_ =>{
    setLoading(true)
    getUnfinishedImpressions()
      .then(res => {
        setLoading(false)
        console.log(res.data.data)
        setDetails([...res.data.data])
      })
      .catch(e => {
        console.log('Erro na auth' , e)
        Alert.alert('Erro de autenticação!', 'Login expirado ou invalido, entre novamente!')
        navigation.navigate('Login')
      })
  }, [])

  useEffect(_ =>{
    setLoading(true)
    getUnfinishedImpressions()
      .then(res => {
        setLoading(false)
        console.log(res.data.data)
        setDetails([...res.data.data])
      })
      .catch(e => {
        console.log('Erro na auth' , e)
        Alert.alert('Erro de autenticação!', 'Login expirado ou invalido, entre novamente!')
        navigation.navigate('Login')
      })
  }, [newImpression.Editable.newprice])


  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(false)



    return(
         
            details != null && !loading ? (
              details.length > 0 ? (
                <FlatList
                  data={details}
                  keyExtractor={item => `${item.id}`}
                  renderItem={({ item }) => (
                    <ListItem type={item.attributes.layout.data.attributes.typeTemplate.name} navigation={navigation} callback={callback} key={item.id} paperType={item.attributes.paper.data.attributes.description} product={item.attributes.product.data.attributes.description} sector={item.attributes.sector.data.attributes.name} price={item.attributes.price} id={item.id}/>
                  )}
                />
              ) : (
                <View style={styles.textContainer}>
                  <Text style={styles.waiting}>Sem impressões pendentes!</Text>
                </View>
              )
            ) : (
              <Spinner size='lg' style={{marginTop: 30}}/>
            )

            
         
          

          
    )  
}

const styles = StyleSheet.create({
  waiting:{
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  },
  textContainer: {
    marginTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#37384E'
  }
})


export default List;