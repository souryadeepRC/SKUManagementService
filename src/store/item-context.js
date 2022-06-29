import React, { useReducer } from 'react'
const initialState = {
    itemData: [],
    filteredData: []
}
const ItemContext = React.createContext({
    itemData: [],
    filteredData: [],
    addItem: (itemList) => { },
    filterById: (id) => { },
    filterBySku: (sku) => { },
    filterByName: (name) => { },
    filterByPrice: (startPrice, endPrice) => { },
    filterByDate: (date) => { },
    filterByAll: () => {}

})
const itemReducer = (state, action) => {
    if (action.type === 'ADD') {
        const convertedData = []
        action.itemList.forEach(element => {
            convertedData.push({
                id: element.ID,
                sku:element.SKU,
                productName:element['Product Name'],
                price: parseFloat(element.Price),
                date: new Date(element.Date)
            })
        });
        return {
            itemData: convertedData,
            filteredData: convertedData
        }
    } else if (action.type === 'ID') {
        const filteredData = state.itemData.filter(item => item.id === action.id)
        return {
            itemData: state.itemData,
            filteredData
        }
    } else if (action.type === 'SKU') {
        const filteredData = state.itemData.filter(item => item.sku === action.sku)
        return {
            itemData: state.itemData,
            filteredData
        }
    } else if (action.type === 'NAME') {
        console.log(action.name);
        const filteredData = state.itemData.filter(item => item.productName.toLowerCase().includes(action.name.toLowerCase()))
        console.log(state.itemData);
        console.log(filteredData);
        return {
            itemData: state.itemData,
            filteredData
        }
    } else if (action.type === 'PRICE') {
        const filteredData = state.itemData.filter(item => item.price >= action.price.startPrice 
                && item.price <= action.price.endPrice)
        return {
            itemData: state.itemData,
            filteredData
        }
    } else if (action.type === 'DATE') {
        const filteredData = state.itemData.filter(item => item.date.getTime() === action.date.getTime())
        return {
            itemData: state.itemData,
            filteredData
        }
    }else if (action.type === 'ALL') {
        return {
            itemData: state.itemData,
            filteredData: state.itemData
        }
    }
    return initialState
}
export const ItemContextProvider = (props) => {
    const [itemInfo, dispatchAction] = useReducer(itemReducer, initialState)

    const itemContext = {
        itemData: itemInfo.itemData,
        filteredData: itemInfo.filteredData,
        addItem: itemList => dispatchAction({ type: 'ADD', itemList: itemList }),
        filterById: id => dispatchAction({ type: 'ID', id }),
        filterBySku: (sku) => { dispatchAction({ type: 'SKU', sku }) },
        filterByName: (name) => { dispatchAction({ type: 'NAME', name }) },
        filterByPrice: (price) => { dispatchAction({ type: 'PRICE', price }) },
        filterByDate: (date) => { dispatchAction({ type: 'DATE', date }) },
        filterByAll : () => {dispatchAction({type :'ALL'})}
    }
    return <ItemContext.Provider value={itemContext}>{props.children}</ItemContext.Provider>
}


export default ItemContext