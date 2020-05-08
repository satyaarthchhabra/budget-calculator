import React, { Fragment } from 'react'
import ExpenseItems from './ExpenseItems';
import {MdDelete} from 'react-icons/md'
const ExpenseList = ({ expenses,handleDelete,handleEdit,clearItems }) => {
    // console.log(expenses);

    return (
        <>
            <ul className="list">
                {expenses.map((expense) => {
                    return <ExpenseItems key={expense.id} expense={expense} handleDelete={handleDelete} handleEdit={handleEdit} ></ExpenseItems>
                })}
            </ul>
            {expenses.length > 0 && <button className="btn" onClick={clearItems}> clear expense<MdDelete className="btn-icon"></MdDelete></button>}
        </>
    )
}
export default ExpenseList;