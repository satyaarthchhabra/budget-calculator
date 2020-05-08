import React, { Fragment, useState } from 'react';
import ExpenseList from './Components/ExpenseList';
import ExpenseForm from './Components/ExpenseForm';
import Alert from './Components/Alert';
import uuid from 'uuid/v4';
import './App.css';

const initialExpenses = [];
function App() {
  // state values here 
  // all expenses , add expense 
  const [expenses, setExpenses] = useState(initialExpenses);
  // single expense
  const [charge, setCharge] = useState('');
  // single Amount
  const [amount, setAmount] = useState('');
  // alert function is here 
  const [alert, setAlert] = useState({ show: false });
  // edit 
  const [edit, setEdit] = useState(false);
  
  
  // edit item
  const [id, setId] = useState(0);

  // functionalities are here 
  const handleCharge = e => {
    setCharge(e.target.value)
  }
  const handleAmount = e => {
    setAmount(e.target.value)
  }
  // handle alert 
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text })
    setTimeout(() => {
      setAlert({ show: false })

    }, 3000);
  }
  const handleSubmit = e => {
    e.preventDefault();
if (charge !== '' && amount > 0) {
      if (edit) {
let tempExpenses1=expenses.map(item=>{
  return item.id===id?{...item,charge,amount}:item;
})        
setExpenses(tempExpenses1);
setEdit(false)
      } else {
        const singleExpense = { id: uuid(), charge: charge, amount: amount }
        setExpenses([...expenses, singleExpense])
        handleAlert({ type: 'success', text: 'item added' })
      }
      setCharge("");
      setAmount("");
    } else {
      handleAlert({ type: 'danger', text: 'cannot be added as pls fill charge  and amount be grater than 0' })
    }

  }
  // clear all items 
  const clearItems =()=>{
console.log('clear items clicked');
setExpenses([]);
handleAlert({type:'danger',text:"all item deleted "})
}
// clear single item 
const handleDelete =(id)=>{
  let tempExpenses=expenses.filter(item=>item.id!==id);
  setExpenses(tempExpenses);
  handleAlert({type:'danger',text:"the item deleted "})
}
// edit single item 
const handleEdit =(id)=>{
  let expense=expenses.find(item=>item.id===id)
  let {charge,amount}=expense;
  setCharge(charge);
  setAmount(amount);
  setEdit(true);
  setId(id);
  }
  return (
    <>                            
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm edit={edit} handleAmount={handleAmount} handleCharge={handleCharge} handleSubmit={handleSubmit} charge={charge} amount={amount} />
        <ExpenseList expenses={expenses} handleDelete={handleDelete} handleEdit={handleEdit} clearItems={clearItems}/>
      </main>
      <h1>total spending :<span className="total">${expenses.reduce((acc, curr) => {
        return (acc += parseInt(curr.amount));
      }, 0)}</span></h1>
    </>
  );
}

export default App;
