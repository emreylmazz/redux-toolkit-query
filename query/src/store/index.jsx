 // user api yi implemente edeceğiz. kaç tane reducer varsa configure edeceğiz.

 import { configureStore, } from "@reduxjs/toolkit";
 import { setupListeners } from "@reduxjs/toolkit/dist/query";    //dispatch ederken kullanacağız bunu
import { usersApi } from "./apis/usersApi";
import { AlbumsApi } from "./apis/AlbumsApi";
import { photosApi } from "./apis/photosApi";


export const store = configureStore({
    reducer:{
        [usersApi.reducerPath]:usersApi.reducer,
        [AlbumsApi.reducerPath]:AlbumsApi.reducer,
        [photosApi.reducerPath]:photosApi.reducer
    },
    middleware:(getDefaultMiddleware) => {
        return getDefaultMiddleware()
        .concat(usersApi.middleware)
        .concat(AlbumsApi.middleware)
        .concat(photosApi.middleware);
    },
})


setupListeners(store.dispatch);

export {
useFetchPhotosQuery,
useAddPhotoMutation,
useRemovePhotoMutation,
} from './apis/photosApi'

export {
useFetchAlbumsQuery,
useAddAlbumMutation,
useRemoveAlbumMutation
} from "./apis/AlbumsApi"

export {
useFetchUsersQuery,
useAddUserMutation,
useRemoveUserMutation,
} from './apis/usersApi'

