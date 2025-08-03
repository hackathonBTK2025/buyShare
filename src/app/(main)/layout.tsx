

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from 'react';
import {
  Bell,
  Home,
  Flame,
  Search,
  ShoppingCart,
  Users,
  MessageSquare,
  Compass,
  History,
  PlusSquare,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Menu,
  Activity,
  Bookmark,
  Sun,
  Moon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('query') as string;
    if (query) {
      router.push(`/chat?q=${encodeURIComponent(query)}`);
    }
  };

  const navLinks = [
    { href: "/", label: "Ana sayfa", icon: Home },
    { href: "/chat", label: "Yeni sohbet", icon: PlusSquare },
    { href: "/explore", label: "Keşfet", icon: Compass },
    { href: "/messages", label: "Mesajlar", icon: MessageSquare },
    { href: "/history", label: "Geçmiş aramalar", icon: History },
    { href: "/cart", label: "Sepetim", icon: ShoppingCart },
  ];

  return (
    <TooltipProvider>
    <div className={cn(
      "grid min-h-screen w-full transition-[grid-template-columns] duration-300",
       isSidebarExpanded ? "md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]" : "md:grid-cols-[68px_1fr]"
    )}>
      <div className="hidden border-r bg-card text-foreground md:block sticky top-0 h-screen">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Flame className="h-6 w-6 text-primary" />
              {isSidebarExpanded && <span className="">TrendAI</span>}
            </Link>
             <Button variant="ghost" size="icon" className="ml-auto h-8 w-8" onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}>
                {isSidebarExpanded ? <PanelLeftClose /> : <PanelLeftOpen />}
                <span className="sr-only">Kenar çubuğunu daralt/genişlet</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navLinks.map((link) => (
                 <Tooltip key={link.href} delayDuration={0}>
                    <TooltipTrigger asChild>
                        <Link
                          href={link.href}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                            pathname === link.href && "bg-muted text-primary"
                          )}
                        >
                          <link.icon className="h-5 w-5" />
                          {isSidebarExpanded && <span>{link.label}</span>}
                        </Link>
                    </TooltipTrigger>
                    {!isSidebarExpanded && (
                        <TooltipContent side="right">
                            {link.label}
                        </TooltipContent>
                    )}
                 </Tooltip>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4 space-y-2">
             <DropdownMenu>
                <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                         <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary w-full justify-start",
                                isSidebarExpanded ? "" : "justify-center"
                            )}>
                                <Menu className="h-5 w-5" />
                                {isSidebarExpanded && <span>Daha fazla</span>}
                            </Button>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    {!isSidebarExpanded && (
                        <TooltipContent side="right">
                            Daha fazla
                        </TooltipContent>
                    )}
                </Tooltip>
                 <DropdownMenuContent side="right" align="end" className="w-56">
                    <DropdownMenuItem onClick={() => router.push('/settings/profile')}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Ayarlar</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/activity')}>
                        <Activity className="mr-2 h-4 w-4" />
                        <span>Hareketlerin</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push('/saved')}>
                        <Bookmark className="mr-2 h-4 w-4" />
                        <span>Kaydedilenler</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={toggleTheme}>
                        <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span>Görünümü değiştir</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <span>Çıkış Yap</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
             </DropdownMenu>

             <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <Link
                      href="/profile/me"
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                        pathname === "/profile/me" && "bg-muted text-primary"
                      )}
                    >
                      <Users className="h-5 w-5" />
                       {isSidebarExpanded && <span>Profil</span>}
                    </Link>
                </TooltipTrigger>
                 {!isSidebarExpanded && (
                    <TooltipContent side="right">
                        Profil
                    </TooltipContent>
                 )}
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Navigasyon menüsünü aç/kapa</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold mb-4"
                >
                  <Flame className="h-6 w-6 text-primary" />
                  <span className="">TrendAI</span>
                </Link>
                {navLinks.map((link) => (
                   <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                       pathname === link.href && "bg-muted text-foreground"
                    )}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                ))}
                 <Link
                  href="/settings/profile"
                  className={cn("mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                    pathname.startsWith("/settings") && "bg-muted text-foreground"
                  )}
                >
                  <Settings className="h-5 w-5" />
                  Ayarlar
                </Link>
                <Link
                  href="/profile/me"
                  className={cn("mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                    pathname === "/profile/me" && "bg-muted text-foreground"
                  )}
                >
                  <Users className="h-5 w-5" />
                  Profil
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage
                    src="https://placehold.co/100x100"
                    alt="@shadcn"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <span className="sr-only">Kullanıcı menüsünü aç/kapa</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Ayarlar</DropdownMenuItem>
              <DropdownMenuItem>Destek</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Çıkış Yap</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-grow bg-background">
          {children}
        </main>
      </div>
    </div>
    </TooltipProvider>
  );
}
