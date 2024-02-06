import Link from "next/link";
import Logo from "../images/logo_1.jpg"
const Navbar = () => 
{
return(
    <nav className = "bg-white">
        <div className = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className = "flex items-center justify-between h-16">
                <div className = "flex items-center"> 
                    <div className = "flex-shrink-0"> 
                        <a href="/" className="text-black">
                        <img src={Logo} alt="Logo"/>
                        </a>
                    </div>
                </div>
                <div className="ml-4 flex items-center space-x-4">
                    <a href="/">
                        List Your Plate
                    </a>
                    <a href="/about">
                        About
                    </a>
                </div>
            </div>
        </div>
    </nav>
);
}

export default Navbar;