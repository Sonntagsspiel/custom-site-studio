import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const navigationItems = [
  { label: "About Us", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Website Templates", href: "/templates" },
];

export const Navigation = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">WebBuilder</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1">
          <NavigationMenu>
            <NavigationMenuList>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                    )}
                  >
                    <Link to={item.href}>{item.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Auth and Customize Buttons */}
        <div className="hidden md:flex md:items-center md:gap-4">
          <Button variant="ghost" asChild>
            <Link to="/signin">Sign In</Link>
          </Button>
          <Button variant="secondary" asChild className="bg-secondary hover:bg-secondary-light">
            <Link to="/customize">Customize Website</Link>
          </Button>
          <Button variant="default" asChild>
            <Link to="/get-started">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex flex-1 justify-end md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="text-foreground/60 transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
                <hr className="my-4" />
                <Button variant="ghost" asChild className="justify-start">
                  <Link to="/signin">Sign In</Link>
                </Button>
                <Button variant="secondary" asChild className="justify-start bg-secondary hover:bg-secondary-light">
                  <Link to="/customize">Customize Website</Link>
                </Button>
                <Button asChild className="justify-start">
                  <Link to="/get-started">Get Started</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};