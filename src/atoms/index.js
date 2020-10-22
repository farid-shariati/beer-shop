import {atom} from 'recoil'

const sortTypeState = atom({
    key: "sort",
    default:''
})

const cartItemsState = atom({
    key:"cart",
    default:[]
})

const favoriteItemsState = atom({
    key:"favorites",
    default:[]
})

export {
    sortTypeState,
    cartItemsState,
    favoriteItemsState
}