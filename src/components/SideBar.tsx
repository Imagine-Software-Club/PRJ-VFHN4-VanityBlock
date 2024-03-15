import Link from "next/link";
import "@/src/styles/sidebar.css";

const SideBar = () => {
  return (
    // Apply the 'sidebar-container' class from your CSS file
    <div className="sidebar-container">
      <nav className="sidebar-nav">
        <a href="/about" className="sidebar-link">About Us</a>
        <a href="/about/what-is-vanity-block" className="sidebar-link">What is Vanity Block?</a>
        <a href="/about/buying-a-plate" className="sidebar-link">Buying a Plate</a>
        <a href="/about/selling-a-plate" className="sidebar-link">Selling a Plate</a>
        <a href="/about/finalizing-a-deal" className="sidebar-link">Finalizing a Deal</a>
        <a href="/about/faq" className="sidebar-link">FAQ</a>
      </nav>
    </div>
  );
}

export default SideBar;