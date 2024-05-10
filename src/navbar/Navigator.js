import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../login/Login';
import TabNavigator from './tab_navigator';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

function Navigator() {
    const [isLogged, setIsLogged] = useState(false) //logica de logged tem que estar vinvuclada com o storage (analise do access_key and client_key  )

    const session = useSelector(store=> store.session)

    useEffect(() => { //esse cara vai monitorar pra ver se muda o session.logged
        console.log('mudou');
        setIsLogged(session.logged)
        // setIsLogged(true)
        //ahh ta, se tem que salver o login no storage pra n precisar ficar fazendo toda hora

        //localStorage

    }, [session.logged]) //esse useEffect  n eh gambiarra eh o modo a se fazer

    
    return (
        <Stack.Navigator initialRouteName={!isLogged ? 'Login' : 'TabNavigator'}>
           
            {
                !isLogged ?  <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                :
                <Stack.Screen name="TabNavigator" component={TabNavigator} options={{headerShown: false}}/>
        
            }

            
            
        </Stack.Navigator>
    );
}

export default Navigator;