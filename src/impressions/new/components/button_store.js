import { Box, Button, Pressable, Text } from "native-base"

const ButtonStore = props =>{
    return (
        <Pressable onPress={_=>props.onclick(props.store.id)} style={{marginTop: 20}}>
            <Box
                px="3"
                py="2"
                mb={2}
                bg="primary.500"
                rounded="lg"
                shadow={3}
                >
                    <Text fontWeight="medium" color="white" fontSize="sm">
                        {props.store.name}
                    </Text>
                </Box>
        </Pressable>
    )
}

export default ButtonStore