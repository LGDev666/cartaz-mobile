import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NewImpressionStack from './new_impression_stack';
import ListImpressionStack from './list_impression_stack';
import { StyleSheet,View, } from 'react-native';
import { Button } from 'native-base';
import ProductsImpressionStack from './products_impression_stack'
import { useDispatch, useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const session = useSelector(store=> store.session)
  const newImpression = useSelector(store=> store.newImpression)
  const dispatch = useDispatch()
  return (
    <Tab.Navigator
      screenOptions={({route})=>({
        
        tabBarStyle:{
          backgroundColor:'#37384e',
          height: '50px',
          // padding:'10px',
        },

      })}
      initialRouteName='Products' // depois vou trocar so pra programar
    >
      <Tab.Screen name="List" component={ListImpressionStack}
        options={{
          tabBarLabel: ()=> null,
          tabBarIcon: ({ color }) => (
            <View style={styles.default_logo}>
              <MaterialCommunityIcons name="view-sequential" color={color} size={26} />
              <div>Cartazes</div>
            </View>
          ),
          headerShown: false
        }}
      />
      <Tab.Screen name="NewImpression" component={NewImpressionStack}
        options={{
          tabBarLabel: ()=> null,
          tabBarIcon: ({ color }) => (
            <View style={styles.logo_new}>
              <MaterialCommunityIcons name="plus" color={color} size={26} />
            </View>
          ),
          headerShown: false
        }}
      />
      <Tab.Screen name="Products" component={ProductsImpressionStack} 
        options={{
          tabBarLabel: ()=> null,
          tabBarIcon: ({ color }) => (
            <View style={styles.default_logo}>
              <MaterialCommunityIcons name="barcode-scan" color={color} size={26} />
              <div>Produtos</div>
            </View>
          ),
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;

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

