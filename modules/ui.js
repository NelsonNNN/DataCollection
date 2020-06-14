import {itemsetup} from './items'

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
    let lists = '';

    return {
        populateItem: function(items){
                lists += `<li class="collection-item" id="item-${items.id}">
                <strong>${items.name}: </strong><em>${items.calories} Calories</em>
                <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
            </li>`
            document.querySelector(UISelectors.itemList).innerHTML = lists
        },
        populateItems: function(itemsinData){
            let lists = ''
            itemsinData.forEach(items => {
                lists += `<li class="collection-item" id="item-${items.id}">
                <strong>${items.name}: </strong><em>${items.calories} Calories</em>
                <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
            </li>`
            })
            document.querySelector(UISelectors.itemList).innerHTML = lists
        },
        createListItems: function(item){
            const li = document.createElement('li')
            li.className = 'collection-item'
            li.id = `item-${item.id}`
            li.innerHTML = `<strong>${item.name}: </strong><em>${item.calories} Calories</em>
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
            document.querySelector(UISelectors.itemNameInput).value = itemsetup.getCurrentItem().name
            document.querySelector(UISelectors.itemCaloriesInput).value = itemsetup.getCurrentItem().calories
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
            document.querySelector(UISelectors.itemNameInput).value = ''
            document.querySelector(UISelectors.itemCaloriesInput).value = ''
        },
        showEditState : function(){
            document.querySelector(UISelectors.addBtn).style.display = 'none'
            document.querySelector(UISelectors.updateBtn).style.display = 'inline'
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline'
            document.querySelector(UISelectors.backBtn).style.display = 'inline'
        }
    }
})()

export const uisetup = UISetup