import { useEffect, useState } from "react"
import '../styles/Accordion.scss';

export const Accordion = (props) => {
    
    const {title, content, nameOfClass} = props;

    const [active, setActive] = useState(false); 

    const largeViewPort = window.innerWidth > 768

    useEffect(() => {
        if (largeViewPort && active === false) {
            setActive(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


return (
    <div className={"accordion " + (nameOfClass ? nameOfClass : "")}>
        <div className="title" onClick={() => setActive(!active)}>
            <h2>{title}</h2>
            <span>{active ? "-" : "+"}</span>
        </div>
        <div className={"content " + (active ? "active " : "")}>{content}</div>
    </div>
)


}