import { Menu, LogOut, Settings, User } from "lucide-react";
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
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const navigationItems = [
  { label: "About Us", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Extra Services", href: "/extra-services" },
  { label: "Support", href: "/contact" },
];

export const Navigation = () => {
  const { user, profile } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        setIsAdmin(!!profile?.is_admin);
      }
      setIsLoading(false);
    };

    checkSession();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        setIsAdmin(!!profile?.is_admin);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const allNavigationItems = [
    ...navigationItems,
    ...(isAdmin ? [{ label: "Admin Dashboard", href: "/admin" }] : []),
  ];

  // Get first letter of email or full name
  const getInitial = () => {
    if (profile?.full_name) {
      return profile.full_name[0].toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "?";
  };

  const getAvatarContent = () => {
    if (profile?.avatar_url) {
      return (
        <img 
          src={profile.avatar_url} 
          alt="Profile" 
          className="w-full h-full object-cover rounded-full"
        />
      );
    }
    return getInitial();
  };

  const handleSignOut = async () => {
    try {
      // Erst alle lokalen Daten löschen
      window.localStorage.clear();
      
      // Dann bei Supabase abmelden
      await supabase.auth.signOut();
      
      // Alle Cookies löschen
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      }
      
      // Session-Storage leeren
      window.sessionStorage.clear();
      
      // Kompletten Browser-Cache leeren
      if (window.caches) {
        caches.keys().then((names) => {
          names.forEach(name => {
            caches.delete(name);
          });
        });
      }

      // Seite komplett neu laden
      window.location.replace('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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
              {allNavigationItems.map((item) => (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-accent-foreground focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
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
          <Button variant="secondary" asChild className="bg-secondary hover:bg-secondary-light">
            <Link to="/customize">Customize Website</Link>
          </Button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium cursor-pointer hover:bg-primary/20 transition-colors overflow-hidden">
                  {getAvatarContent()}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-[300px] bg-background/[0.98] backdrop-blur-sm supports-[backdrop-filter]:bg-background/95 border-border"
              >
                <div className="p-2">
                  <p className="text-sm text-muted-foreground px-2 py-1 truncate">
                    {user?.email}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Einstellungen</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <button 
                    onClick={async () => {
                      console.log('1. Abmelde-Button geklickt');
                      try {
                        console.log('2. Versuche lokalen Speicher zu löschen');
                        localStorage.clear();
                        console.log('3. Lokaler Speicher gelöscht');

                        console.log('4. Versuche Session-Storage zu löschen');
                        sessionStorage.clear();
                        console.log('5. Session-Storage gelöscht');

                        console.log('6. Versuche Supabase-Token zu entfernen');
                        localStorage.removeItem('sb-ubraqzydrsfbgzoszifp-auth-token');
                        console.log('7. Supabase-Token entfernt');

                        console.log('8. Versuche zur Hauptseite zu navigieren');
                        window.location.href = '/';
                        console.log('9. Navigation ausgeführt');

                      } catch (error) {
                        console.error('FEHLER beim Abmelden:', error);
                      }
                    }}
                    className="w-full flex items-center text-red-600 hover:text-red-700"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Abmelden</span>
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" asChild>
              <Link to="/signin">Sign In</Link>
          </Button>
          )}
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
                {allNavigationItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="text-foreground/60 transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
                <hr className="my-4" />
                {user ? (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      {getAvatarContent()}
                    </div>
                    <span className="text-sm text-gray-600">{user.email}</span>
                  </div>
                ) : (
                <Button variant="ghost" asChild className="justify-start">
                  <Link to="/signin">Sign In</Link>
                </Button>
                )}
                <Button variant="secondary" asChild className="justify-start bg-secondary hover:bg-secondary-light">
                  <Link to="/customize">Customize Website</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};