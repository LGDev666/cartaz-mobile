import { createNativeStackNavigator } from '@react-navigation/native-stack';
import listProducts from '../impressions/product/list/listProducts'
import Cartaz from '../impressions/product/show/Cartaz';
import Editable from '../impressions/product/edit/editProduct'
import SelectStore from '../impressions/new/views/select_store';
import SelectPaper from '../impressions/new/views/select_paper';
import SelectLayout from '../impressions/new/views/select_layout';
import { Button } from 'native-base';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';

const Stack = createNativeStackNavigator();

// nussss, isso aqui ta bad.. se um dia vc quiser fazer isso, vc soh deveria redirecionar..
// basicamente vc duplicou o codigo das outras views.. era soh dar navigate
//mas eu acho que esse comportamento ta errado, nao precisa criar cartaz pela lista, soh editar/mostrar as info do produto mesmo

function ProductsImpressionStack(props) {
  const newImpression = useSelector(store=> store.newImpression)
  const dispatch = useDispatch()
   
  const editable = () =>{
    dispatch({type:'FROM_PRODUCT', value: {
      fromproduct: false,
    }})
    props.navigation.navigate('products')
  }
  const cartaz = () =>{
    props.navigation.navigate('Editable', {product: newImpression.product, currentPrice: newImpression.currentPrice})
  }
  
  return (
    <Stack.Navigator>
    <Stack.Screen name="products" component={listProducts} options={{
          header: () => (
            
            <View style={[styles.default_logo, {backgroundColor: '#37384E', height: 50,}]}>
              <div style={{fontSize: 18, fontWeight: 'bold'}}>Produtos</div>
              {!newImpression.FromProduct ? <Button onPress={() => {
              
                dispatch({ 
                  type: 'UPDATE_SESSION', 
                  payload: {
                    company_id: '',
                    user_id: '',
                    uid:'',
                    client:"",
                    access_token: '',
                    logged:false
                  }
                });
                localStorage.clear()
              
              }} style={styles.button}>
                <MaterialCommunityIcons name="exit-to-app" size={30} color="white" />
              </Button>: null }
            </View>
          )
        }}/>
    
    <Stack.Screen name="Editable" component={Editable} options={{
          header: () => (
            <View style={[styles.default_logo, {backgroundColor: '#37384E', height: 50,}]}>
              <Button onPress={() => editable()} style={{position: 'absolute', right: 330, backgroundColor: null}}>
                <Ionicons name="arrow-back-circle-sharp" size={35} color="#fff"/>
              </Button>
              <div style={{fontSize: 18, fontWeight: 'bold'}}>Edição</div>
            </View>
          )
        }}/>
    <Stack.Screen name="cartaz" component={Cartaz} options={{
          header: () => (
            <View style={[styles.default_logo, {backgroundColor: '#37384E', height: 50,}]}>
              <Button onPress={() => cartaz()} style={{position: 'absolute', right: 330, backgroundColor: null}}>
                <Ionicons name="arrow-back-circle-sharp" size={35} color="#fff"/>
                {console.log(props)}
              </Button>
              <div style={{fontSize: 18, fontWeight: 'bold'}}>Cartaz</div>
            </View>
          )
        }}/>
  </Stack.Navigator>
  );

}

export default ProductsImpressionStack;

const styles = StyleSheet.create({
  default_logo:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:'white'
  },
  logo_new: {
    marginBottom:'50px',
    width:'50px',
    height:'50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: '100%',
  },
  button: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 75,
    left: 338,
    backgroundColor: '#37384E'
},
});
