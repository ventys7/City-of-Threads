import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, ShoppingBag, Gamepad2, Puzzle, Users, TrendingUp, Menu, X, Moon, Sun } from "lucide-react";
import coinsIcon from "@assets/generated_images/Coins_Currency_Icon_8c9df518.png";
import creditsIcon from "@assets/generated_images/Credits_Currency_Icon_64de7747.png";

interface GameLayoutProps {
  children: ReactNode;
  player?: {
    townName: string;
    townLevel: number;
    coins: number;
    credits: number;
  };
}

export function GameLayout({ children, player }: GameLayoutProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode(!darkMode);
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
  };

  const navItems = [
    { path: "/", label: "City", icon: Home },
    { path: "/shop", label: "Shop", icon: ShoppingBag },
    { path: "/arcade", label: "Arcade", icon: Gamepad2 },
    { path: "/puzzles", label: "Puzzles", icon: Puzzle },
    { path: "/governance", label: "Governance", icon: Users },
    { path: "/dashboard", label: "Dashboard", icon: TrendingUp },
  ];

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Top Bar */}
      <header className="h-16 border-b bg-card/50 backdrop-blur-md flex items-center justify-between px-4 gap-4 sticky top-0 z-50">
        {/* Left: Town Name & Level */}
        <div className="flex items-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <div className="flex flex-col">
            <h1 className="text-lg font-display font-bold leading-none" data-testid="text-town-name">
              {player?.townName || "New Town"}
            </h1>
            <Badge variant="secondary" className="text-xs w-fit mt-1" data-testid="badge-town-level">
              TL {player?.townLevel || 1}
            </Badge>
          </div>
        </div>

        {/* Center: Resources */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-background/80 px-3 py-1.5 rounded-md border" data-testid="container-coins">
            <img src={coinsIcon} alt="Coins" className="w-5 h-5" />
            <span className="font-semibold text-sm" data-testid="text-coins-amount">
              {player?.coins?.toLocaleString() || "0"}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-background/80 px-3 py-1.5 rounded-md border" data-testid="container-credits">
            <img src={creditsIcon} alt="Credits" className="w-5 h-5" />
            <span className="font-semibold text-sm text-primary" data-testid="text-credits-amount">
              {player?.credits?.toLocaleString() || "0"}
            </span>
          </div>
        </div>

        {/* Right: Theme Toggle */}
        <Button
          size="icon"
          variant="ghost"
          onClick={toggleDarkMode}
          data-testid="button-theme-toggle"
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:w-20 lg:w-64 border-r bg-sidebar flex-col gap-2 p-3">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full justify-start gap-3"
                    data-testid={`link-nav-${item.label.toLowerCase()}`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="hidden lg:inline">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Mobile Navigation Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-sm">
            <nav className="flex flex-col gap-2 p-6 pt-20">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.path;
                return (
                  <Link key={item.path} href={item.path}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className="w-full justify-start gap-3 text-lg h-12"
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`link-nav-mobile-${item.label.toLowerCase()}`}
                    >
                      <Icon className="h-6 w-6" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden border-t bg-card/95 backdrop-blur-md flex justify-around items-center h-16 sticky bottom-0 z-50">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          return (
            <Link key={item.path} href={item.path}>
              <Button
                variant="ghost"
                size="icon"
                className={`flex flex-col h-14 w-14 gap-1 ${isActive ? "text-primary" : ""}`}
                data-testid={`link-nav-bottom-${item.label.toLowerCase()}`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
