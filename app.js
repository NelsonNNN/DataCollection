import {storagesetup} from './storage';
import {uisetup} from './ui';
import {itemsetup} from './items'


const App = (function(itemsetup,uisetup, storagesetup){
    const addEvents = function(){
        const UISelectors =uisetup.getSeletor();
        document.querySelector(UISelectors.addBtn).addEventListener('click', addItem);
        document.querySelector(UISelectors.itemList).addEventListener('click', editItem);
        document.querySelector(UISelectors.updateBtn).addEventListener('click', updateItems);
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', deleteItems);
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearLists);
        document.querySelector(UISelectors.backBtn).addEventListener('click',uisetup.clearEditState)
    }

    const addItem = function(e){
        const input =uisetup.getIteminput()
        e.preventDefault()
        if(input.name !== '' && input.calories !== ''){
            const newItem = itemsetup.addItems(input.name, input.calories)
           uisetup.createListItems(newItem);
            storagesetup.storeinStorage(newItem);
            const addAllCalories = itemsetup.addCalories()
           uisetup.theTotalCalories(addAllCalories)
           uisetup.clearFields();
        }
    }
    const editItem = function(e){
        if(e.target.classList.contains('edit-item')){
            const target = e.target.parentNode.parentNode.id;
            const targetItem = target.split('-')
            const id = parseInt(targetItem[1])
            const itemToEdit = itemsetup.getItemtoEdit(id)
            itemsetup.setCurrentItem(itemToEdit)
           uisetup.addItemtoList();
           uisetup.showEditState()
        }
    }
    const updateItems = function(){
        const input =uisetup.getIteminput();
        const itemtoUpdate = itemsetup.updateItem(input.name, input.calories)
       uisetup.updateList(itemtoUpdate)
        console.log(typeof itemtoUpdate)
        const addAllCalories = itemsetup.addCalories()
       uisetup.theTotalCalories(addAllCalories)
        storagesetup.updateinStorage(itemtoUpdate)
       uisetup.clearFields()
       uisetup.clearEditState()
    }
    const deleteItems = function(){
        const itemDelete = itemsetup.getCurrentItem()
        itemsetup.deleteItem(itemDelete.id)
       uisetup.deleteListItem(itemDelete.id)
        storagesetup.deletefromStorage(itemDelete.id)
        const addAllCalories = itemsetup.addCalories()
       uisetup.theTotalCalories(addAllCalories)
       uisetup.clearFields()
        storagesetup.deletefromStorage()
       uisetup.clearEditState()
    }
    const clearLists = function(){
        itemsetup.clearAll();
       uisetup.clearEverything()
        const addAllCalories = itemsetup.addCalories()
       uisetup.theTotalCalories(addAllCalories)
       uisetup.clearEditState()
    }
    return{
        
        init: function(){
            const items =itemsetup.getItems()
           uisetup.populateItems(items);
           uisetup.clearEditState()
            const addAllCalories = itemsetup.addCalories()
           uisetup.theTotalCalories(addAllCalories)
            addEvents();
        }
    }
})(itemsetup,uisetup, storagesetup)

App.init();