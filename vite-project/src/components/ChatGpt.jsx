
import { useEffect, useState } from "react"

export default function ChatGpt({ }) {

    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        console.log(messages);
    }, [messages])


    const onInputValueChange = (e) => {
        setInputValue(e.target.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setMessages(messages => [...messages, inputValue]);
        setInputValue('');
    }

    return (

        <div>
            <section>
                {messages.map((message, index) => (
                    <p key={index}>{message}</p>
                ))}
            </section>

            <form onSubmit={onSubmitHandler} >
                <div>
                    <input
                        type="text"
                        name="msg"
                        id="msg"
                        value={inputValue}
                        onChange={onInputValueChange}
                    />
                    <input type="submit" value="Send" />
                </div>
            </form>

        </div>
    )
}