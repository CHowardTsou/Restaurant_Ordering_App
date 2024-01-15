import { menuArray } from '/data.js'
const menuModal = document.getElementById('menu-modal')
const customerName = document.getElementById('customerName')
let orderList = []

document.addEventListener("click", function(e){
    if(e.target.dataset.additem){
        addItemToList(e.target.dataset.additem)
    }
    else if(e.target.dataset.removeitem){
        removeItemFromList(e.target.dataset.removeitem)
    }
    else if(e.target.id === "btn-complete"){
        document.getElementById("checkout-payment-modal").classList.remove("hidden")
    }
    else if(e.target.id === "btn-pay"){
        e.preventDefault()
        if((document.getElementById('checkout-payment-modal').checkValidity())){
            document.getElementById("checkout-payment-modal").classList.add("hidden")
            document.getElementById("order").innerHTML = `
            <div class="thank-panel">
                <p class="thankyou">Thanks, ${customerName.value}! Your order is on its way!</p>
            </div>`
            orderList.length = 0
        }
        
    }
    
})

function addItemToList(id){
    const targetObj = menuArray.filter(item => item.id.toString() === id )[0]
    orderList.push(targetObj)
    render()
}

function removeItemFromList(id){
    const targetObj = orderList.filter(item => item.id.toString() === id )[0]
    const index = orderList.indexOf(targetObj)
    orderList.splice(index, 1)
    render()
}

function getOrderList(list){
    return list.map(function(item){
        return `<div class="order-list" id="order-list">
                    <div class="order-item">
                        <p class="item">${item.name}</p>
                        <p class="removeItem" data-removeitem="${item.id}">remove</p>
                    </div>
                        <p>£${item.price}</p>
                </div>
                `
    }).join('')
            
}

function getTotalPrice(list){
    return list.reduce((total, current) => total + current.price, 0)
}

function render(){
    if (orderList.length === 0){
        document.getElementById('order').classList.add('hidden')
    }
    else if(orderList.length > 0){
        document.getElementById('order').classList.remove('hidden')
        document.getElementById('render-list').innerHTML = getOrderList(orderList)
        document.getElementById('render-total').innerHTML = `<p>Total :</p> <p>£${getTotalPrice(orderList)}</p>`
    }
}

function getMenuHtml(menuArr){
    
    return menuArr.map(function(item){
        const {name, ingredients, id, price, emoji} = item
        return `<div class="menuCard">
                    <div class="menuItem">
                        <div class="menu-emoji">
                            ${emoji}
                        </div>
                        <div class="menu-right">
                            <span class='itemName'>${name}</span>
                            <span class='itemIngredient'>${ingredients}</span>
                            <span class='itemPrice'>£${price}</span>
                        </div>
                    </div>
                    
                    <div class="menu-add" >
                        <div class='add' data-additem=${id}>+</div>
                    </div>
                </div>
                `
    }).join('')
}



menuModal.innerHTML = getMenuHtml(menuArray)

render()