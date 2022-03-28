// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Calculations>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
totalBalance();

function totalBalance() {
    let income = showIncome();
    let expense = showExpense();
    console.log(income);
    let total = income - expense;
    document.querySelector('.balance__amount p').innerHTML = `$${sep(total)}`

    document.querySelector('header').className = total > 0 ? 'green' : 'red';
}


showIncome();
// const result = words.filter(word => word.length > 6);
function showIncome() {
    let items = getItemsFromLS();
    // let showIncomes = 0;
    // for (let item of items) {
    //     if (item.type === '+') {
    //         showIncomes += parseInt(item.value);
    //     }

    // }
    let showIncomes = items.filter((item) => item.type === '+')
        .reduce((income, item) => income + parseInt(item.value), 0);

    document.querySelector('.income__amount p').innerHTML = `$${sep(showIncomes)}`
    return showIncomes;


}

showExpense();

function showExpense() {
    let items = getItemsFromLS();
    // let showExpenses = 0;
    // for (let item of items) {
    //     if (item.type === '-') {
    //         showExpenses += parseInt(item.value);
    //     }

    // }
    let showExpenses = items.filter((item) => item.type === '-')
        .reduce((expense, item) => expense + parseInt(item.value), 0);

    document.querySelector('.expense__amount p').innerHTML = `$${showExpenses}`
    return showExpenses;


}
//UI

document.querySelector('#ewallet-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // console.log('SUBMITTED!!!')
    const type = document.querySelector('.add__type').value
    const desc = document.querySelector('.add__description').value
    const value = document.querySelector('.add__value').value
    if (desc && value) {
        addItems(type, desc, value);
        resetForm();
    }


})

showItems();

function showItems() {
    let items = getItemsFromLS();
    const collection = document.querySelector('.collection');
    for (let item of items) {
        const newHtml = `
    <div class="item">
    <div class="item-description-time">
      <div class="item-description">
        <p>${item.desc}</p>
      </div>
      <div class="item-time">
        <p>${item.time}</p>
      </div>
    </div>
    <div class="item-amount${item.type === '+'?' income-amount':' expense-amount'}">
      <p>${item.type}${sep(item.value)}</p>
    </div>    `
        collection.insertAdjacentHTML('afterbegin', newHtml);
    }
}


function addItems(type, desc, value) {
    const time = formattedTime()
    const newHtml = `
    <div class="item">
    <div class="item-description-time">
      <div class="item-description">
        <p>${desc}</p>
      </div>
      <div class="item-time">
        <p>${time}</p>
      </div>
    </div>
    <div class="item-amount${type === '+'?' income-amount':' expense-amount'}">
      <p>${type}${sep(value)}</p>
    </div>    `
        // console.log(newHtml)

    const collection = document.querySelector('.collection');
    collection.insertAdjacentHTML('afterbegin', newHtml);

    addItemsToLS(desc, time, type, value);
    showExpense();
    showIncome();
    totalBalance();
}

function resetForm() {
    document.querySelector('.add__type').value = '+';
    document.querySelector('.add__description').value = '';
    document.querySelector('.add__value').value = '';

}
// fetch Data From LocalStorage
function getItemsFromLS() {
    let items = localStorage.getItem('items');
    if (items) {
        items = JSON.parse(items)
    } else {
        items = [];
    }
    return items;
}
// Insert Data into LocalStorage
function addItemsToLS(desc, time, type, value) {
    const items = getItemsFromLS();
    items.push({ desc, time, type, value })
    localStorage.setItem('items', JSON.stringify(items));

}

//Utility functions

function formattedTime() {
    const now = new Date().toLocaleTimeString('en-us', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })

    const date = now.split(',')[0].split(' ')
    const time = now.split(',')[1]


    return `${date[1]} ${date[0]},${time}`;
}



//Mon Mar 28 2022 20:50:59 
//25 Feb, 06:45 PM

function sep(amount) {
    amount = parseInt(amount)
    return amount.toLocaleString();
}