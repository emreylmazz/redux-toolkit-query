import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {faker} from '@faker-js/faker' 

const pause = (duration) => {
    return new Promise ((resolve) => {
        setTimeout(resolve,duration)
    })
}


const AlbumsApi = createApi({
    reducerPath: 'albums',   //index.jsx de bu isimle ulaşacağız api ye dışarısı için yani
  baseQuery :fetchBaseQuery({       //istek atacağımız yer nereye istek atacağımızı buraya veriyoruz. çekeceğimiz şey fetchBaseQuery de yer alıyor
baseUrl: 'http://localhost:3000',     // istek atacağımız yer örnek google gibi yani şimdi de localhost mesela 3000 de açıldıysa o port db.json ın çalıştığı yer yani
fetchFn: async (...args) => {       //isteğimizi belirleyen bir özellik
    await pause (1000)  // 1 saniye gecikmeli gelicek bütün istekler
    return fetch(...args)
}         
}),
  endpoints(builder){   // data çekme ekleme kişileri kaldırma gibi işlemleri burada tutuyoruz
return {
    fetchAlbums: builder.query({          // query yi yazmamızın sebebi datayı çekmek istememiz data çekeceğimiz zaman yazıyoruz  eklemek silmek değişiklik yapmak
    providesTags:(result,error,user) => {
        const tags = result.map ((album) => {
            return { type: 'Album', id: album.id}
        });
        tags.push({type:'UsersAlbum', id: user.id});
        return tags;
    },                                  // diyelim adduser yaptık 2 elemanımız vardı 3 oldu ama çekmeye kalktığımızda hala 2 var ya burda uyumsuzluk var biz adduser da bir eleman ekle dediğimiz zaman invalidatetag user tagını iptal et diyor ve yeniden çekme ihtiyacı duyup surverdan 3 tane olan datayı çekicek
        query: (user) => {
    return {
        url:'/albums',  // istek atacağımız yerin adı localhostun orda yazan 
        method:'GET',
        params:{
            userId:user.id
        }
    };
},
    }),
    addAlbum: builder.mutation({          // eklemek silmek değişiklik yapmak istediğimizde query yerine mutation yazıyoruz
        invalidatesTags:(result,error,user) =>{
return[{type:'UsersAlbum', id: user.id}]
        },
        query: (user) => {
            return {
                url:'/albums',  // istek atacağımız yerin adı localhostun orda yazan 
                method:'POST',
                body:{   
                    userId:user.id,       // eklediğimiz kişiyi şeyi buraya yazıyoruz
                 title:faker.commerce.productName(),  // id yi json server otomatik oluşturuyor
                }
            };
        },
            }),
            removeAlbum: builder.mutation({          // eklemek silmek değişiklik yapmak istediğimizde query yerine mutation yazıyoruz
                invalidatesTags:(result,error,album) => {
                    return [{type:'Album', id:album.id}]
                },
                query: (album) => {  // kimi sileceğimizi user olarak vermemiz gerek
                    return {
                        url:`/users/${album.id}`,  // silme işlemi yaparken bu şekilde user id ye göre atıyoruz
                        method:'DELETE',
                    };
                },
                    }),
};
  },                 
});

export const {useFetchAlbumsQuery,
    useAddAlbumMutation,
    useRemoveAlbumMutation} =AlbumsApi ; // kullandığımız endpointleri de dışarı açmamız gerek

export {AlbumsApi} // apiyi dışarı açıyoruz

