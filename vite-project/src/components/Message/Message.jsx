



export default function Message({
    username,
    text
}) {


    return (
        <div className="message">
        <p className="message-username">{username}</p>
        <p className="message-text">{text}</p>
      </div>
    )
}