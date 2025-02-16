import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TypographyH1 } from "@/components/ui/typography";
import { Calendar, ChevronDown, EllipsisVertical } from "lucide-react";
import { type PropsWithChildren } from "react";
import { CalendarDrawer } from "./calendar";

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col h-dvh p-2 gap-2 max-w-xl mx-auto">
      <header className="flex justify-between max-h-[64px] px-1">
        <div className="flex gap-2 items-center">
          <TypographyH1>Gym Logs</TypographyH1>
          <Button className="rounded-full bg-secondary size-8" variant="ghost">
            <ChevronDown className="stroke-2 size-4 pt-[1px]" />
          </Button>
        </div>
        <nav className="flex gap-4 items-center">
          <CalendarDrawer>
            <Button className="rounded-full" size="icon" variant="ghost">
              <Calendar className="stroke-2 size-5" />
            </Button>
          </CalendarDrawer>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" size="icon" variant="ghost">
                <EllipsisVertical className="stroke-2 size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
              {/* <DropdownMenuSeparator /> */}
              <DropdownMenuItem>Copy workout</DropdownMenuItem>
              <DropdownMenuItem>Configurations</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full size-fit"
                size="icon"
                variant="ghost"
              >
                <Avatar className="size-10">
                  <AvatarImage src="" />
                  <AvatarFallback>NA</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-1">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </header>
      <main className="flex-1 max-h-[calc(100dvh-64px)]">{children}</main>
    </div>
  );
}
