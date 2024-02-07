import Link from "next/link";
const Navbar = () => 
{
return(
    <nav className = "bg-white">
        <div className = "max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className = "flex items-center justify-between h-16">
                <div className = "flex items-center space-x-4"> 
                    <div className = "flex-shrink-0">
                        <a href="/" className="text-black">
                            <img src="/images/logo.png" alt="Logo" width={120} height={120}/>
                        </a>
                    </div>
                    <a href="/listings">
                        <img src="/images/list_your_plates.png" alt="List your plates" width={120} height={120}/>
                    </a>
                    <a href="/about">
                        <img src="/images/about.png" alt='About' width={65} height={65}/>
                    </a>
                </div>
            </div>
        </div>
    </nav>
);
}

export default Navbar;