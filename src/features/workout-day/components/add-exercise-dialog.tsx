import { Combobox } from "@/components/combo-box";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { FormEventHandler, useState } from "react";
// import { useFormStatus } from "react-dom";

export function AddExerciseDialog({ children }: React.PropsWithChildren) {
  // const { pending, data, method, action } = useFormStatus();
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const onAddNewExercise = () => {
    addExercise(1, value, 2);
  };

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Add exercise</DialogTitle>
            {/* <DialogDescription> */}
            {/*   Make changes to your profile here. Click save when you're done. */}
            {/* </DialogDescription> */}
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Exercise
              </Label>
              <Combobox value={value} onSelect={setValue} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={onAddNewExercise} type="submit">
              Add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
