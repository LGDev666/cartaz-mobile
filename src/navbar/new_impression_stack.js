import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import SelectStore from '../impressions/new/views/select_store';
import SelectPaper from '../impressions/new/views/select_paper';
import SelectLayout from '../impressions/new/views/select_layout';
import Show from '../impressions/new/views/product/show/show'
import Confirmation from '../impressions/new/views/confirmation/confirmation';
import SelectProduct from '../impressions/new/views/select_product/select_product';
import Editable from '../impressions/new/views/product/edit_product/editScreen';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'native-base';


const Stack = createNativeStackNavigator();

function NewImpressionStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="select_store" component={SelectStore} 
        options={{
          header: () => (
            <View style={[styles.default_logo, {backgroundColor: '#37384E', height: 50,}]}>
              <div style={{fontSize: 18, fontWeight: 'bold'}}>Seleção de Loja</div>
            </View>
          )
        }}
      />
      <Stack.Screen name="select_paper" component={SelectPaper} 
       options={{
        header: () => (
            <View style={[styles.default_logo, {backgroundColor: '#37384E', height: 50,}]}>
              <Button onPress={() => props.navigation.navigate('select_store')} style={{position: 'absolute', right: 330, backgroundColor: null}}>
                <Ionicons name="arrow-back-circle-sharp" size={35} color="#fff"/>
              </Button>
              <div style={{fontSize: 18, fontWeight: 'bold'}}>Seleção de Papel</div>
            </View>
        )
      }}
      />
      <Stack.Screen name="select_layout" component={SelectLayout} 
       options={{
        header: () => (
          <View style={[styles.default_logo, {backgroundColor: '#37384E', height: 50,}]}>
            <Button onPress={() => props.navigation.navigate('select_paper')} style={{position: 'absolute', right: 330, backgroundColor: null}}>
              <Ionicons name="arrow-back-circle-sharp" size={35} color="#fff"/>
            </Button>
            <div style={{fontSize: 18, fontWeight: 'bold'}}>Seleção de Layout</div>
          </View>
        )
      }}
      />
      <Stack.Screen name="select_product" component={SelectProduct} 
       options={{
        header: () => (
          <View style={[styles.default_logo, {backgroundColor: '#37384E', height: 50,}]}>
            <Button onPress={() => props.navigation.navigate('select_layout')} style={{position: 'absolute', right: 330, backgroundColor: null}}>
              <Ionicons name="arrow-back-circle-sharp" size={35} color="#fff"/>
            </Button>
            <div style={{fontSize: 18, fontWeight: 'bold'}}>Seleção de Produto</div>
          </View>
        )
      }}
      />
      <Stack.Screen name="Show" component={Show} 
       options={{
        header: () => (
          <View style={[styles.default_logo, {backgroundColor: '#37384E', height: 50,}]}>
            <Button onPress={() => props.navigation.navigate('select_product')} style={{position: 'absolute', right: 330, backgroundColor: null}}>
              <Ionicons name="arrow-back-circle-sharp" size={35} color="#fff"/>
            </Button>
            <div style={{fontSize: 18, fontWeight: 'bold'}}></div>
          </View>
        )
      }}
      />
      <Stack.Screen name="editable_product" component={Editable} 
       options={{
        header: () => (
          <View style={[styles.default_logo, {backgroundColor: '#37384E', height: 50,}]}>
            <Button onPress={() => props.navigation.navigate('Show')} style={{position: 'absolute', right: 330, backgroundColor: null}}>
              <Ionicons name="arrow-back-circle-sharp" size={35} color="#fff"/>
            </Button>
            <div style={{fontSize: 18, fontWeight: 'bold'}}>Edição de Produto</div>
          </View>
        )
      }}
      />
      <Stack.Screen name="confirmation_view" component={Confirmation} 
       options={{
        header: () => (
          <View style={[styles.default_logo, {backgroundColor: '#37384E', height: 50,}]}>
            <Button onPress={() => props.navigation.navigate('editable_product')} style={{position: 'absolute', right: 330, backgroundColor: null}}>
              <Ionicons name="arrow-back-circle-sharp" size={35} color="#fff"/>
            </Button>
            <div style={{fontSize: 18, fontWeight: 'bold'}}>Confirmação Final</div>
          </View>
        )
      }}
      />
      {/* <Stack.Screen name="login_view" component={Login} /> */}
    </Stack.Navigator>
  );
}

export default NewImpressionStack;

const styles = StyleSheet.create({
  default_logo:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:'white'
  },
})