const StorageSetup = (function(){
    return{
        storeinStorage: function(item){
            let items;
            if(localStorage.getItem('items') === null){
                items = []
                items.push(item)
                localStorage.setItem('items', JSON.stringify(items))
            }else{
                items = JSON.parse(localStorage.getItem('items'))
                items.push(item)
                localStorage.setItem('items', JSON.stringify(items))
            }
        },
        getfromStorage: function(){
            let items;
            if(localStorage.getItem('items') === null){
                items = []
            }else{
                items = JSON.parse(localStorage.getItem('items'))
            }
            return items
        },
        updateinStorage: function(updatedItem){
            let items = JSON.parse(localStorage.getItem('items'))
            items.forEach(function(item, index){
                if(updatedItem.id === item.id){
                items.splice(index, 1, updatedItem)
                }
            })
            localStorage.setItem('items', JSON.stringify(items))
        },
        deletefromStorage: function(id){
            let items = JSON.parse(localStorage.getItem('items'));
            items.forEach((item, index) =>{
                if(id === item.id){
                items.splice(index, 1)
                }
            })
            localStorage.setItem('items', JSON.stringify(items))
        },
        clearAllfromStorage: function(){
            localStorage.removeItem('items')
        }
    }
})()

export const storagesetup = StorageSetup