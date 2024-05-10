import React from 'react'

import { Button, Center, Text } from "native-base"
import Resume from './resume/resume'

const Confirmation = ({navigation}) =>{
    return (
        <Center>
            <Text>Confirmando cartaz</Text>
            <Resume></Resume>
            <Button>Confirmar</Button>
        </Center>
    )
}
export default Confirmation