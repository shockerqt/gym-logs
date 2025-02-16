import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { PlusIcon } from "lucide-react";

interface Props {
  scrolledDown: boolean;
  onClick?: () => void;
}

export function AddExerciseButton({ scrolledDown, onClick }: Props) {
  const buttonClasses = cva(
    "size-12 rounded-full bg-gray-900 text-gray-50 shadow-lg transition-all hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50 dark:focus-visible:ring-gray-300",
    {
      variants: {
        expanded: {
          true: "w-40",
          false: "w-12",
        },
      },
    },
  );

  const iconClasses = cva("size-6", {
    variants: {
      expanded: {
        true: "mr-2",
        false: "",
      },
    },
  });

  const spanClasses = cva("", {
    variants: {
      expanded: {
        true: "",
        false: "sr-only",
      },
    },
  });

  return (
    <div className="fixed  bottom-0 z-50 size-fit self-end py-3 px-4">
      <Button
        onClick={onClick}
        className={cn(buttonClasses({ expanded: scrolledDown }))}
      >
        <PlusIcon className={cn(iconClasses({ expanded: scrolledDown }))} />
        <span className={cn(spanClasses({ expanded: scrolledDown }))}>
          Add exercise
        </span>
      </Button>
    </div>
  );
}
