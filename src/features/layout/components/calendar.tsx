"use client";

import { Calendar } from "@/components/ui/calendar";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import * as React from "react";

export function CalendarDrawer({ children }: React.PropsWithChildren) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>This month</DrawerTitle>
            <DrawerDescription>131 workouts</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pt-0">
            <div className="mt-3">
              <Calendar
                mode="single"
                // selected={date}
                // onSelect={setDate}
                className="rounded-md border"
              />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
