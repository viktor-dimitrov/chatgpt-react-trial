
import { useState } from "react";

import styles from './ChatForm.module.css';


export default function ChatForm({ messageHandler }) {

    const [inputValue, setInputValue] = useState('');

    const onInputValueChange = (e) => {
        setInputValue(e.target.value)
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (inputValue.length < 2) {
            return
        }
        messageHandler(inputValue);
        setInputValue('');
    }

    const onPressEnterHandler = (e) => {
        if (e.key === "Enter") {
            onSubmitHandler(e);
        }
    }


    return (

        <form onSubmit={onSubmitHandler} >
            <textarea
                type="text"
                name="msg"
                id="msg"
                rows="1"
                value={inputValue}
                onChange={onInputValueChange}
                onKeyDown={onPressEnterHandler}
            />
            <input type="submit" value="Send" />
        </form>

    )
}