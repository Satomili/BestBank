const accounts = [
    {
        id: 1,
        title: "Main Account",
        balance: "6700.56",
        spendings: [
            {
                category: "Rent",
                spent: "1450"
            },
            {
                category: "Groceries",
                spent: "564"
            },
            {
                category: "Restaurants",
                spent: "123"
            },
            {
                category: "Transport",
                spent: "81"
            },
            {
                category: "Internet",
                spent: "50"
            }
        ]
    },
    {
        id: 2,
        title: "Expenses",
        balance: "5134.63",
        spendings: [
            {
                category: "Netflix",
                spent: "19.99"
            },
            {
                category: "HBO Max",
                spent: "14.99"
            },
            {
                category: "Setapp",
                spent: "9.99"
            }
        ]
    },
    {
        id: 3,
        title: "Savings",
        balance: "36500.12",
        spendings: []
    }
]

const accountsInfoContainer = document.getElementById("accounts-info-container")
const spendingsInfoContainer = document.getElementById("spendings-info-container")

function formatCurrency(amount) {
    return parseFloat(amount).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
    })
}

accountsInfoContainer.innerHTML = accounts.map(account => {
    return `
        <div class="account-info" onClick=handleClick(${account.id})>
            <p>${account.title}</p>
            <p>${formatCurrency(account.balance)}</p>
        </div>
    `
}).join("")

function handleClick(id) {

    const accountElements = document.querySelectorAll('.account-info');

    accountElements.forEach((element, index) => {
        if (index === id - 1) {
            element.classList.add('clicked')
        } else {
            element.classList.remove('clicked')
        }
    })

    const clickedAccount = accounts.find(account => account.id === id)
    
    if(clickedAccount.spendings.length === 0) {
       spendingsInfoContainer.innerHTML = `
            <p class="error">No spending from this account.</p>
       `
    } else {
        spendingsInfoContainer.innerHTML = clickedAccount.spendings.map(item => {
            const barWidth = `${(parseFloat(item.spent) / 200) * 100}%`; // Adjust the divisor as needed for appropriate bar lengths
            return `
                <div class="spending-info" style="width:${barWidth}">
                    <p>${item.category}</p>
                    <p>${formatCurrency(item.spent)}</p>
                </div>
            `;
        }).join("")
    }
}

