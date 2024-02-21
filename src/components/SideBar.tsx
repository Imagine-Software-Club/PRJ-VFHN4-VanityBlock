import Link from "next/link";
import "@/src/styles/sidebar.css";

const SideBar = () => {
  return (
    // Apply the 'sidebar-container' class from your CSS file
    <div className="sidebar-container">
      <nav className="sidebar-nav">
        <a href="/about" className="sidebar-link">About Us</a>
        <a href="/what-is-vanity-block" className="sidebar-link">What is Vanity Block?</a>
        <a href="/how-it-works" className="sidebar-link">How it works</a>
        <a href="/buying-a-plate" className="sidebar-link">Buying a Plate</a>
        <a href="/selling-a-plate" className="sidebar-link">Selling a Plate</a>
        <a href="/finalizing-a-deal" className="sidebar-link">Finalizing a Deal</a>
        <a href="/faq" className="sidebar-link">FAQ</a>
      </nav>
    </div>
  );
}

export default SideBar;