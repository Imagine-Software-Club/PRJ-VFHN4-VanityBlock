import Link from "next/link";
import "../styles/navbar.css";
const Navbar = () => 
{
return(
    <nav>
        <div className="nav">
            <a href="/">
                <img src="/images/logo.png" alt="Logo" width={160} height={160}/>
            </a>
            <a href="/listings">
                <img src="/images/list_your_plates.png" alt="List your plates" width={160} height={160}/>
            </a>
            <a href="/about">
                <img src="/images/about.png" alt='About' width={84} height={84}/>
            </a>
            <div className="rightImages">
                <div className="links">
                    <a href="/comments">
                        <img src="/images/comments.png" alt="Comments" width={50} height={50}/>
                    </a>
                    <a href="/notifications">
                        <img src="/images/notifications.png" alt='Notifications' width={50} height={50}/>
                    </a>
                    <a href="/signup">
                        <img src="/images/signup.png" alt='Signup' width={100} height={100}/>
                    </a>
                </div>
                <div className="menu-icon">
                    <img src="/images/menu.png" alt="menu" width={50} height={50}/>
                </div>
            </div>
        </div>
    </nav>
);
}

export default Navbar;