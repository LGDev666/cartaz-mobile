const initialState = {
  sector_id: 121, //tem que ter, a tela ainda nao foi feita
  paper_id: '',
  store_number: '',
  state: 1, // state temporario 1 = esta na fila
  price: 0,
  layout_id: 0, 
  product_id: 0,
  company_id: 0,
  type: '',
  Editable: {  
    packet_quantity: 0, 
    newprice: 0,
    atacado_price: 0,
    packet_type: '',
    packet_unity: '',
    atacado_quantity: 0,
    quantity: 0,
    expiration_poster_date: 0,
    expiration_product_date: 0,
  },
  FromProduct: false,
  FromNewimpression: false,
  product: '',
  currentPrice: '',
  ean: '',
  type_template: '',
};

const newImpressionReducer = (state = initialState, action) => {
  console.log(state, action)
  switch (action.type) {
    case 'SET_STORE_ID':
      
      return {
        ...state,
        store_number: action.value.storeNumber,
        FromNewimpression: action.value.FromNewimpression,
      }
    case 'SET_PAPER_ID':
      return {
        ...state,
        paper_id: action.value.paper_id,
        type: action.value.type
      }
    case 'SET_LAYOUT_ID':
      return {
        ...state,
        layout_id: action.value.id,
        type_template: action.value.type_template
      }
    case 'FROM_PRODUCT':
        return {
          ...state,
          FromProduct: action.value.fromproduct,
          product: action.value.product,
          currentPrice: action.value.currentPrice,
          price: action.value.newprice
        }
    case 'SET_LAST_STATS':
      return {
        ...state,
        product_name: action.value.product_name,
        product_id: action.value.product_id,
        current_price: action.value.current_price,
        layout_id: action.value.layout_id,
        ean: action.value.ean
      }
      case 'SET_EAN':
        return {
          ...state,
          ean: action.value.ean
        }
    
    case 'SET_EDITABLE_STATS':
      return {
        ...state,
        Editable: {
          ...action.value
        }
      }
    default:
      return state;
  }
};

export default newImpressionReducer;
  