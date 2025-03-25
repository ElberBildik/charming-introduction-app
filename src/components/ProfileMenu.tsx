
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsDown, User, Settings, LogOut, BookMarked, PenSquare } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const ProfileMenu = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
        <Avatar className="h-9 w-9 border-2 border-amber-200">
          {user?.avatar ? (
            <AvatarImage src={user.avatar} alt={user.name} />
          ) : (
            <AvatarFallback className="bg-amber-100 text-amber-800">
              {user?.name ? getInitials(user.name) : "U"}
            </AvatarFallback>
          )}
        </Avatar>
        <span className="text-sm font-medium hidden md:block">{user?.name}</span>
        <ChevronsDown className="h-4 w-4 opacity-50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align={isMobile ? "end" : "end"} 
        className="w-56 z-[60] bg-popover border border-border"
        sideOffset={isMobile ? 5 : 4}
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/profile")}>
          <User className="mr-2 h-4 w-4" />
          <span>Profilim</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/favorites")}>
          <BookMarked className="mr-2 h-4 w-4" />
          <span>Favorilerim</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/tarif-ekle")}>
          <PenSquare className="mr-2 h-4 w-4" />
          <span>Tarif Ekle</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/settings")}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Ayarlar</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Çıkış Yap</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
