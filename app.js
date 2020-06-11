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
const ItemSetup = (function(){
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }
    const data ={
        items:StorageSetup.getfromStorage(),
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
        clearAll: function(){
            data = []
        }
    }
}
)()

const UISetup = (function(){
    const UISelectors= {
        itemList: '#item-list',
        addBtn: '.add-btn',
        listItems: '#item-list li',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        listItems : '.collection-item',
        updateBtn : '.update-btn',
        deleteBtn : '.delete-btn',
        clearBtn : '.clear-btn',
        backBtn : '.back-btn'
    }
    return {
        populateItems: function(itemsinData){
            let lists = '';
            itemsinData.forEach(items => {
                lists += `<li class="collection-item" id="item-${items.id}">
                <strong>${items.name}: </strong><em>${items.calories}</em>
                <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
            </li>`
            })
            document.querySelector(UISelectors.itemList).innerHTML = lists
        },
        createListItems: function(item){
            const li = document.createElement('li')
            li.className = 'collection-item'
            li.id = `item-${item.id}`
            li.innerHTML = `<strong>${item.name}: </strong><em>${item.calories}</em>
                <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
            </li>`
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
        },
        getIteminput: function(){
            return {
                name:document.querySelector(UISelectors.itemNameInput).value,
                calories:document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        getSeletor: function(){
            return UISelectors;
        },
        updateList: function(item){
            let listItems = document.querySelectorAll(UISelectors.listItems)
            listItems =Array.from(listItems)
            listItems.forEach(listItem => {
                const itemID = listItem.getAttribute('id')
                if(itemID === `item-${item.id}`){
                    document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;
                }
            })
        },
        addItemtoList:function(){
            document.querySelector(UISelectors.itemNameInput).value = ItemSetup.getCurrentItem().name
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemSetup.getCurrentItem().calories
        },
        deleteListItem: function(id){
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
          },
        theTotalCalories: function(totalcalories){
            const calorie = document.querySelector('.total-calories')
            calorie.textContent = totalcalories
        },
        clearFields: function(){
            document.querySelector(UISelectors.itemNameInput).value = ''
            document.querySelector(UISelectors.itemCaloriesInput).value = ''
        },
        clearEverything: function(){
            let listItems = document.querySelectorAll(UISelectors.listItems);
            listItems = Array.from(listItems);
            listItems.forEach(function(item){
                item.remove();
            });
        },
        clearEditState : function(){
            document.querySelector(UISelectors.addBtn).style.display = 'inline'
            document.querySelector(UISelectors.updateBtn).style.display = 'none'
            document.querySelector(UISelectors.deleteBtn).style.display = 'none'
            document.querySelector(UISelectors.backBtn).style.display = 'none'
        },
        showEditState : function(){
            document.querySelector(UISelectors.addBtn).style.display = 'none'
            document.querySelector(UISelectors.updateBtn).style.display = 'inline'
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline'
            document.querySelector(UISelectors.backBtn).style.display = 'inline'
        }
    }
})()

const App = (function(ItemSetup,UISetup){
    const addEvents = function(){
        const UISelectors =UISetup.getSeletor();
        document.querySelector(UISelectors.addBtn).addEventListener('click', addItem);
        document.querySelector(UISelectors.itemList).addEventListener('click', editItem);
        document.querySelector(UISelectors.updateBtn).addEventListener('click', updateItems);
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', deleteItems);
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearLists);
        document.querySelector(UISelectors.backBtn).addEventListener('click',UISetup.clearEditState)
    }

    const addItem = function(e){
        const input =UISetup.getIteminput()
        e.preventDefault()
        if(input.name !== '' && input.calories !== ''){
            const newItem = ItemSetup.addItems(input.name, input.calories)
           UISetup.createListItems(newItem);
            StorageSetup.storeinStorage(newItem);
            const addAllCalories = ItemSetup.addCalories()
           UISetup.theTotalCalories(addAllCalories)
           UISetup.clearFields();
        }
    }
    const editItem = function(e){
        if(e.target.classList.contains('edit-item')){
            const target = e.target.parentNode.parentNode.id;
            const targetItem = target.split('-')
            const id = parseInt(targetItem[1])
            const itemToEdit = ItemSetup.getItemtoEdit(id)
            ItemSetup.setCurrentItem(itemToEdit)
           UISetup.addItemtoList();
           UISetup.showEditState()
        }
    }
    const updateItems = function(){
        const input =UISetup.getIteminput();
        const itemtoUpdate = ItemSetup.updateItem(input.name, input.calories)
       UISetup.updateList(itemtoUpdate)
        console.log(typeof itemtoUpdate)
        const addAllCalories = ItemSetup.addCalories()
       UISetup.theTotalCalories(addAllCalories)
        StorageSetup.updateinStorage(itemtoUpdate)
       UISetup.clearFields()
       UISetup.clearEditState()
    }
    const deleteItems = function(){
        const itemDelete = ItemSetup.getCurrentItem()
        ItemSetup.deleteItem(itemDelete.id)
       UISetup.deleteListItem(itemDelete.id)
        StorageSetup.deletefromStorage(itemDelete.id)
        const addAllCalories = ItemSetup.addCalories()
       UISetup.theTotalCalories(addAllCalories)
       UISetup.clearFields()
        StorageSetup.deletefromStorage()
       UISetup.clearEditState()
    }
    const clearLists = function(){
        ItemSetup.clearAll();
       UISetup.clearEverything()
        const addAllCalories = ItemSetup.addCalories()
       UISetup.theTotalCalories(addAllCalories)
       UISetup.clearEditState()
    }
    return{
        
        init: function(){
            const items =ItemSetup.getItems()
           UISetup.populateItems(items);
           UISetup.clearEditState()
            const addAllCalories = ItemSetup.addCalories()
           UISetup.theTotalCalories(addAllCalories)
            addEvents();
        }
    }
})(ItemSetup,UISetup)

App.init();