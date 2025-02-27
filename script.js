const balance = document.getElementById('balance')
const moneyPlus = document.getElementById('money-plus')
const moneyMinus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')


// camel case ==> helloWorldIsBig
// pascal case ==> HelloWorldIsBig
// snake case ==> hello_world_is_big

const getTransactionFromLocalStorage = JSON.parse(localStorage.getItem('transactions'))

console.log(getTransactionFromLocalStorage)

let transactions = 
   localStorage.getItem('transactions') === null ? [] : getTransactionFromLocalStorage 

function addTransactiom(e) {
   e.preventDefault()

   if (text.value.trim() === '' || amount.value.trim() === '' ) {
        alert('Please enter text or amount')
     } 

     const transaction = {
      id: genarateId(),
      text: text.value,
      amount: +amount.value,
   }

   transactions.push(transaction)
   addTransactionDOM(transaction)

   updateValues()
   updateLocalStorage()

   text.value = ''
   amount.value = ''


}

   
function genarateId() {
   return Math.floor(Math.random() * 1000000000000)
}

function addTransactionDOM(transaction) {
   const sign = transaction.amount < 0 ? '-' : '+'
   const item = document.createElement('li')

   item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')

   item.innerHTML = `
   ${transaction.text} <span>${sign}${Math.abs(transaction.amount)} </span>
   <button class="delete-btn" onClick="removeTransaction($(transaction.id))"> X </button>
      `
      
     

   list.appendChild(item)
}
function updateValues() {
   const amounts = transactions.map(transaction => transaction.amount)
   const total = amounts?.reduce((acc, item) => acc + item, 0).toFixed(3)

   const income = amounts.filter(item => item > 0).reduce((acc, item) => acc + item, 0).toFixed(2)

   const expense = amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0) * (-1).toFixed(2)


   balance.innerHTML = `$${total}`
   moneyMinus.innerHTML = `$${expense}`
   moneyPlus.innerHTML = `$${income}`

   
}

function removeTransaction(id) {
   transactions = transactions.filter(transaction => transaction.id !== id)
   updateLocalStorage()
   init()
}

function updateLocalStorage() {
   localStorage.setItem('transactions', JSON.stringify(transactions))
}







function init() {
   list.innerHTML = ''
   transactions.forEach(addTransactionDOM)
   updateValues()
}

init()

form.addEventListener('submit', addTransactiom)