//Get item data
const ItemSetup = (function(){
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }
    const data ={
        data:{
            title:'Post 1',
            content: ' This is the first post',
            id: 1

        },
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
        addItems: function(name, calories){
            let ID;
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1
            }else{
                ID = 0
            }
            calories = parseInt(calories)
            const newItem = new Item(ID, name, calories)
            data.items.push(newItem)
            return newItem
        },
        addCalories: function(){
            let total = 0;
            data.items.forEach(item =>{
                total += item.calories
            })
            data.totalCalories = total
            return data.totalCalories
        }
    }
}
)()