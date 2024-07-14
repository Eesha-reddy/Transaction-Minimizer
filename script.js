const transactions = [];

document.getElementById('transactionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const payer = document.getElementById('payer').value;
    const payee = document.getElementById('payee').value;
    const amount = parseFloat(document.getElementById('amount').value);
    
    transactions.push({ payer, payee, amount });
    document.getElementById('transactionList').innerHTML += `<li>${payer} pays ${payee}: $${amount}</li>`;
    
    this.reset();
});

document.getElementById('optimizeBtn').addEventListener('click', function() {
    const optimizedTransactions = optimizeTransactions(transactions);
    const optimizedList = document.getElementById('optimizedList');
    optimizedList.innerHTML = '';
    
    optimizedTransactions.forEach(trans => {
        optimizedList.innerHTML += `<li>${trans.payer} pays ${trans.payee}: $${trans.amount}</li>`;
    });
});

function optimizeTransactions(transactions) {
    // Simple optimization algorithm (for demonstration)
    const netBalances = {};

    transactions.forEach(({ payer, payee, amount }) => {
        netBalances[payer] = (netBalances[payer] || 0) - amount;
        netBalances[payee] = (netBalances[payee] || 0) + amount;
    });

    const optimized = [];
    const creditors = Object.keys(netBalances).filter(user => netBalances[user] > 0);
    const debtors = Object.keys(netBalances).filter(user => netBalances[user] < 0);

    for (const creditor of creditors) {
        for (const debtor of debtors) {
            const amount = Math.min(netBalances[creditor], -netBalances[debtor]);
            if (amount > 0) {
                optimized.push({ payer: debtor, payee: creditor, amount });
                netBalances[creditor] -= amount;
                netBalances[debtor] += amount;
            }
        }
    }

    return optimized;
}
