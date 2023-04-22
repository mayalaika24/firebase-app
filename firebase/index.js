import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'
const appSettings = {
    databaseURL: 'https://playground-3d2d7-default-rtdb.asia-southeast1.firebasedatabase.app/'
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInDB = ref(database, 'items')
const inputEl = document.getElementById('input-field')
const btnEl = document.getElementById('add-btn')
const shoppingListEl = document.getElementById('shopping-list')
btnEl.addEventListener('click', () => {
    let inputVal = inputEl.value
    if (inputVal !== '') {
        push(itemsInDB, inputVal)
        clear()
    }
})

onValue(itemsInDB, snapShot => {   // run every time after making a change to the database
    if (snapShot.exists()) {
        let items = Object.entries(snapShot.val())
        clearShoppingList()
        for (let item of items) {
            append(item)
        }
    } else{
        clearShoppingList()
        shoppingListEl.innerHTML = 'No items here... yet'
    }       
})
const append = (item) => {

    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement('li')
    let img = document.createElement('img')
    img.src = './assets/delete.svg'
    img.classList.add('delete-img')
    newEl.textContent = itemValue
    newEl.append(img)
    img.addEventListener('click', () => {
        let target = ref(database, `items/${itemID}`)
        remove(target)
    })
    shoppingListEl.append(newEl)
}
const clear = () => {
    inputEl.value = ''
}
const clearShoppingList = () => {
    shoppingListEl.innerHTML = ''
}
/* ------ convert object to array
    Object.values(objectName) => convert the values
    Object.keys(objectName) => convert the keys
    Object.entries(objectName) => convert both
---------------------------------*/