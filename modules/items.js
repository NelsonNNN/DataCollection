import {storagesetup} from './storage'

const ItemSetup = (function(){
    const Item = function(name, calories){
        this.name = name;
        this.calories = calories;
    }
    const data ={
        items:storagesetup.getfromStorage(),
        currentItem: null,
        totalCalories: 0
    }
    const itemQuery = {
        itemName: document.getElementById('item-name').value,
        itemCalories: document.getElementById('item-calories').value
    }
    
    return{
        getItems: function(){
            return data.items;
        },
        returnInfo: function(){
            return itemQuery
        },
        setCurrentItem: function(item){
            data.currentItem = item;
        },
        getCurrentItem: function(){
            return data.currentItem;
        },
        getItemtoEdit: function(id){
            let found = null
            data.items.forEach(function(item){
                if(item.id === id){
                    found = item
                }
            })
            return found;
        },
        updateItem : function(name, calories){
            calories = parseInt(calories)
            let found = null
            data.items.forEach(function(item){
                if(item.id === data.currentItem.id){
                item.name = name;
                item.calories = calories;
                found = item
                }
            })
            return found;
        },
        addItems: function(name, calories){
            calories = parseInt(calories)
            const newItem = new Item(name, calories)
            return newItem
        },
        deleteItem: function(id){
            const ids = data.items.map(item => {
                return item.id
            })
            const index = ids.indexOf(id)
            data.items.splice(index, 1)
        },
        addCalories: function(){
            let total = 0;
            data.items.forEach(item =>{
                total += item.calories
            })
            data.totalCalories = total
            return data.totalCalories
        },
        clearAll: function(data){
            data = []
        }
    }
}
)()

export const itemsetup = ItemSetup