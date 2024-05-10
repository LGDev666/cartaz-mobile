import { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet,TouchableOpacity, Text  } from 'react-native';
import { Spinner } from 'native-base';
import { useSelector } from 'react-redux';
import axios from 'axios';

// import Pdf from 'react-native-pdf';
// const PDF =  require('react-native-pdf')

const Cartaz = props =>{

    const session = useSelector(store=> store.session)

    const id = props.route.params.id

    const getProduct = async _ =>{
        let config = {
            headers: {
                'uid': session.uid,
                'client': session.client, 
                'access-token': session.access_token
            }
        }
        return axios.get(`https://evolutionpdv.com.br/impressions/1166560.pdf`, config)
        // return axios.get(`https://evolutionpdv.com.br/impressions/${props.route.params.id}.pdf`, config)
    }

    useEffect(async _ =>{
        // const product = await getProduct() 
        //     .then(res => {
        //         setCartaz(res.config.url)
        //         console.log(res)
        //     })
            
        setCartaz('https://evolutionpdv.com.br/impressions/1166560.pdf')//apenas para teste
            // .then(() => setLoading(false)) 
        
    }, [])

    const [cartaz, setCartaz] = useState(null)


    return(
        

        <View style={{flex: 1}}>
            {
                !cartaz ?
                    <Spinner size="lg" style={{marginTop: 50}}/> : 
                    null
                    // <Pdf
                    //     source={cartaz}
                    //     onLoadComplete={(numberOfPages,filePath) => {
                    //         console.log(`Number of pages: ${numberOfPages}`);
                    //     }}
                    //     onPageChanged={(page,numberOfPages) => {
                    //         console.log(`Current page: ${page}`);
                    //     }}
                    //     onError={(error) => {
                    //         console.log(error);
                    //     }}
                    //     onPressLink={(uri) => {
                    //         console.log(`Link pressed: ${uri}`);
                    //     }}
                    //     trustAllCerts={false}
                    //     style={styles.pdf}/>

            }    
        </View>
    )
}


export default Cartaz;

const styles = StyleSheet.create({

   

})