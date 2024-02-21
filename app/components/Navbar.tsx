import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 logo-container">
              <Link href="/">
                  <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
              </Link>
            </div>
          </div>
          <div className="ml-4 flex items-center space-x-4">
            <Link href="/">
              List Your Plate
            </Link>
            <Link href="/about">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
