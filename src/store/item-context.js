import React, { useReducer } from 'react'
const initialState = {
    itemData: [],
    filteredData: []
}
const ItemContext = React.createContext({
    itemData: [],
    filteredData: [],
    addItem: (itemList) => { },
    updateItem: (item) => { },
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
    }else if (action.type === 'UPDATE') {
        const convertedData = state.itemData
        const itemIdex = convertedData.findIndex(item => item.id===action.item.id)
        convertedData[itemIdex]=action.item
        
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
        const filteredData = state.itemData.filter(item => item.productName.toLowerCase().includes(action.name.toLowerCase())) 
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
        updateItem: (item) => dispatchAction({ type: 'UPDATE', item }),
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