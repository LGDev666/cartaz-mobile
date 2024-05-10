import { Button, Center, Icon, Input, Pressable, Stack, Text } from 'native-base'
import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Login = _ =>{
    const [show, setShow] = useState(false)
    const [login, setLogin] = useState('')
    const [password, setPassord] = useState('')

    const clickHandler = _ =>{
        // console.log(login, password)
    }

    return (
        <Center>
            <Text>Login</Text>
            <Stack space={4}>
                <Input placeholder='Login'/>
                <Input 
                    value={password}
                    type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
                        <Icon as={<MaterialCommunityIcons name={show ? "plus" : "plus"} />} size={5} mr="2" color="muted.400" />
                    </Pressable>} placeholder="Password" />
                <Button size="sm" variant="subtle" onPress={_=>clickHandler()}>
                    ENTRAR
                </Button>
            </Stack>
        </Center>
        
    )
}

export default Login