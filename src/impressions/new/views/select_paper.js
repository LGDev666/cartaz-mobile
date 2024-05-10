import axios from "axios"
import { Box, Center } from "native-base"
import React, { useEffect, useState } from "react"
import { Text } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import Spinner from '../components/spinner'
import ImageButton from '../components/image_button'

const SelectPaper = ({route,navigation}) =>{
    const [loading, setLoading] = useState(true)
    const session = useSelector(store=> store.session)
    const newImpression = useSelector(store => store.newImpression)
    const [papersList, setPapersList] = useState([])
    const [initialRender, setInitialRender] = useState(true)
    const dispatch = useDispatch()

    console.log('componente paper', route);

    const getPapers = async _ =>{
        console.log(newImpression.store_number);
        let config = {
            headers: {
                'uid': session.uid,
                'client': session.client, 
                'access-token': session.access_token
            }
        }
        return axios.get(`https://evolutionpdv.com.br/api/v3/stores/${newImpression.store_number}/sectors/${newImpression.sector_id}/available_papers`, config)
    }

    const clickHandler = (paper_id, type) =>{
        dispatch({type:'SET_PAPER_ID', value: {paper_id: paper_id, type: type}})
        navigation.navigate('select_layout')
        
    }

    useEffect(_=>{
        if(!initialRender){
            navigation.push('select_layout')
        } else {
            setInitialRender(false)
        }     
    }, []) //eu nem quero analisar outras modificacoes futuras, se ele selecionar uma vez o paper, ja to satisfeito
    // }, [newImpression]) //ta errado isso aqui

    useEffect(_=>{
        getPapers().then(data=>{
            console.log(data.data.data);
            setPapersList(data.data.data)
            setLoading(false)
        })
    },[])

    return (
        <Center>
            <Box>
                {
                    loading ?
                        (<Spinner text={"Carregando lista de papeis"}></Spinner>)
                    :
                        papersList.map((paper) => 
                            (<ImageButton key={paper.id} src={paper.attributes.thumbnail} type={paper.attributes.description} text={paper.attributes.description} id={paper.id} onclick={clickHandler}></ImageButton>)
                        )
                }
            </Box>
        </Center>
    )
}

export default SelectPaper