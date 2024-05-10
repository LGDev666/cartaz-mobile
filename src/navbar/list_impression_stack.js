import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import SelectStore from '../impressions/new/views/select_store';
import SelectPaper from '../impressions/new/views/select_paper';
import SelectLayout from '../impressions/new/views/select_layout';
import Show from '../impressions/new/views/product/show/show'
import Confirmation from '../impressions/new/views/confirmation/confirmation';
import List from '../impressions/list/list';
import Editable from '../impressions/new/views/product/edit_product/editScreen';
import { Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

function ListImpressionStack(props) {
  return (
    <Stack.Navigator>
    <Stack.Screen name="list" component={List} options={{
      title: 'Lista de Impressões', 
      headerTitleAlign: 'center',
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerStyle: {
        backgroundColor: '#37384E',
      },}}/>
    <Stack.Screen name="editable_product" component={Editable} 
       options={{
        header: () => (
          <View style={[styles.default_logo, {backgroundColor: '#37384E', height: 50,}]}>
            <Button onPress={() => props.navigation.navigate('list')} style={{position: 'absolute', right: 330, backgroundColor: null}}>
              <Ionicons name="arrow-back-circle-sharp" size={35} color="#fff"/>
            </Button>
            <div style={{fontSize: 18, fontWeight: 'bold'}}>Edição de Produto</div>
          </View>
        )
      }}
      />
  </Stack.Navigator>
  );
}

export default ListImpressionStack;

const styles = StyleSheet.create({
  default_logo:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:'white'
  },
})