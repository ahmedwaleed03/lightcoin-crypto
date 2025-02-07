class Account {
  constructor() {
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let transaction of this.transactions) {
      balance += transaction.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed()) return false;

    this.time = new Date();

    this.account.addTransaction(this);
    return true;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
    isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}

// DRIVER CODE BELOW
const myAccount = new Account();

console.log("Starting Account Balance: ", myAccount.balance);

console.log("Withdraw with 0 balance: ");
const t1 = new Withdrawal(50, myAccount);
console.log("Commit result: ", t1.commit());
console.log("Account Balance: ", myAccount.balance);

console.log('Deposit: ');
const t2 = new Deposit(200, myAccount);
console.log("Commit result: ", t2.commit());
console.log("Account Balance: ", myAccount.balance);

console.log('Withdraw with balance available: ');
const t3 = new Withdrawal(150, myAccount);
console.log('Commit result:', t3.commit());
console.log("Account Balance: ", myAccount.balance);

console.log("Transaction History: ", myAccount.transactions);
