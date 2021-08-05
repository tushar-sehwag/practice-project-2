import React, { useState } from 'react';

import Button from '../UI/Button';
import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

function AddUser(props) {
const [enteredUsername, setEnteredUsername] = useState('');
const [enteredAge, setEnteredAge] = useState('');
const [error, setError] = useState();


    const changeUsernameHandler = (event) =>{
        setEnteredUsername(event.target.value);
        }
    const changeAgeHandler = (event) =>{
        setEnteredAge(event.target.value);
        }
    const addUserHandler = (event) => {
        event.preventDefault();
        if(enteredUsername.trim().length === 0 || enteredAge.trim().length === 0 ){
                setError({
                    title: 'Invalid Input',
                    message: 'Please Enter a Valid Name and Age(non-empty Values)'
                });
                return;
        }
        if(+enteredAge<1){
            setError({
                title: 'Invalid Age',
                message: 'Please Enter a Valid Age(>0)'
            });
            return;
        }
     
        props.onAddUser(enteredUsername, enteredAge);
        setEnteredAge('');
        setEnteredUsername('');
        
        
    }

    const errorHandler = () =>{
        setError(null);
    }

    return (
        <div>
        {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
        <Card className={classes.input}>
            <form onSubmit={addUserHandler}>
                <label htmlFor="username">Username</label>
                <input id="username" type="text" onChange={changeUsernameHandler} value={enteredUsername}></input>
                <label htmlFor="age">Age (Number)</label>
                <input id="age" type="number" onChange={changeAgeHandler} value={enteredAge}></input>
                <Button type="submit">Add User</Button>
            </form>
        </Card>
        </div>
    )
}

export default AddUser
