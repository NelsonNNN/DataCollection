import {storagesetup} from './modules/storage';
import {uisetup} from './modules/ui';
import {itemsetup} from './modules/items';
import {http} from './modules/easyHttp'


const App = (function(itemsetup,uisetup, storagesetup){
    const UISelectors =uisetup.getSeletor();
    const addEvents = function(){
        window.addEventListener('load', getData)
        document.querySelector(UISelectors.addBtn).addEventListener('click', addItem);
        document.querySelector(UISelectors.itemList).addEventListener('click', editItem);
        document.querySelector(UISelectors.updateBtn).addEventListener('click', updateItems);
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', deleteItems);
        document.querySelector(UISelectors.backBtn).addEventListener('click',uisetup.clearEditState)
    }

    function getData(){
        const items =itemsetup.getItems()
        const resolveData = 
             http.get('http://localhost:3000/posts')
            .then(posts => {
                return posts
            })
            .catch(err=>console.log(err))
        if(document.readyState === 'complete'){
            resolveData
            .then(posts => {
                if(posts.length === 0){
                    if(items.length !== 0){
                        let calorise=null
                        items.forEach(item =>{
                        calorise += item.calories
                        uisetup.theTotalCalories(calorise)
                        http.post('http://localhost:3000/posts', item)
                        .then(items => {
                            uisetup.populateItem(items)
                        }) })
                        .catch(err => console.log(err));
                    }else{
                        console.log('Everything is empty')
                    }
                }else if(items.length === 0){
                    storagesetup.storeinStorage(posts)
                    uisetup.populateItems(posts)
                    let calories=null
                    posts.forEach(post =>{
                        calories += post.calories
                    })
                    uisetup.theTotalCalories(calories)
                }
                else{
                    uisetup.populateItems(posts)
                    let calories=null
                    posts.forEach(post =>{
                        calories += post.calories
                    })
                    uisetup.theTotalCalories(calories)
                }
            })
        }
    }
    
    const addItem = function(e){
        e.preventDefault()
        const input =uisetup.getIteminput()
        const newItem = itemsetup.addItems(input.name, input.calories)
        const data = itemsetup.getItems()
        if(input.name !== '' && input.calories !== ''){
            http.post('http://localhost:3000/posts', newItem)
            .then(newItem => {
                storagesetup.addinStorage(newItem);
                data.push(newItem)
                uisetup.createListItems(newItem);
            })
            .catch(err => console.log(err))
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
        const currentItem = itemsetup.updateItem(input.name, input.calories)
        http.put(`http://localhost:3000/posts/${currentItem.id}`, currentItem)
        .then(currentItem => {
            storagesetup.updateinStorage(currentItem)
        })
        .catch(err => console.log(err))
        uisetup.updateList(currentItem)
        const addAllCalories = itemsetup.addCalories()
        uisetup.theTotalCalories(addAllCalories)
        uisetup.clearFields()
        uisetup.clearEditState()
    }
    const deleteItems = function(){
        const itemDelete = itemsetup.getCurrentItem()
        http.delete(`http://localhost:3000/posts/${itemDelete.id}`)
        .then(itemDelete => {
            storagesetup.deletefromStorage(itemDelete.id)
        })
        .catch(err => console.log(err))
        itemsetup.deleteItem(itemDelete.id)
        uisetup.deleteListItem(itemDelete.id)
        const addAllCalories = itemsetup.addCalories()
        uisetup.theTotalCalories(addAllCalories)
        uisetup.clearFields()
        storagesetup.deletefromStorage(itemDelete.id)
        uisetup.clearEditState()
    }
    return{
        
        init: function(){
            uisetup.clearEditState()
            addEvents();
        }
    }
})(itemsetup,uisetup, storagesetup)




App.init();
