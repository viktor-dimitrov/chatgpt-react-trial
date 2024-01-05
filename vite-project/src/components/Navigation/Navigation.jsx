import { Link } from 'react-router-dom';

import styles from "./Navigation.module.css"


export default function Navigation () {


    return (
        <nav>

        <ul>

        <li>
            <Link to="/chatgpt"> Try ChatGPT 3.5 turbo </Link>
        </li>

        <li>
            <Link to="/chatroom"> Chat Room </Link>
        </li>
        
        
        </ul>
        
        </nav>
    )
}