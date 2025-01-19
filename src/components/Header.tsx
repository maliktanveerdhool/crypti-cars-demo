import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Header = () => {
  return (
    <header className="bg-black text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="https://crypticars.com/wp-content/uploads/2024/12/screencapture-crypti-hexweb-net-2024-12-01-11_33_49.png" 
            alt="Crypti Cars" 
            className="h-12 w-auto"
          />
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link 
                to="/" 
                className={`${navigationMenuTriggerStyle()} bg-white text-black hover:bg-gray-200`}
              >
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link 
                to="/account" 
                className={`${navigationMenuTriggerStyle()} bg-white text-black hover:bg-gray-200`}
              >
                Account
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;