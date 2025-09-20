"use client"
import SpotlightCard from "@/components/SpotlightCard";
import { Button } from "@/components/ui/button";
import { Note } from "@/schemas/NoteSchema";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"





const DashboardPage = ({notes}: {notes: Note[]}) => {

  const [allNotes, setAllNotes] = useState<Note[]>(notes)
  // const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [updatedNote, setUpdatedNote] = useState({
    title: "",
    content: "",
  })
  const router = useRouter()



  const handleNoteDelete = async(noteId: string)=>{
    setIsDeleting(true)
    try {
      const response = await axios.delete(`/api/deleteNote/${noteId}`)
      if(response.data.success){
        toast.success(response.data.message)
        setAllNotes(allNotes.filter((note)=> note._id !== noteId))
        router.refresh()
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleNoteEdit = async(noteId: string)=>{
    setIsEditing(true)
    // console.log(updatedNote);

    try {
      const response = await axios.patch(`/api/updateNote/${noteId}`, updatedNote)
      if(response.data.success){
        toast.success(response.data.message)
        router.refresh()
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsEditing(false)
    }
  }


  return (
    <div className="mainContainer pt-36 md:px-20 px-5 min-h-screen bg-neutral-950 antialiased bg-grid-white/[0.02]">

        {/* Page Title */}
      <h1 className="text-white text-2xl font-bold text-center">Your Notes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">

        {
          allNotes.map((note)=>{
            return(
        <SpotlightCard
        key={note._id as string}
        className="custom-spotlight-card flex flex-row"
        spotlightColor="rgba(0, 229, 255, 0.2)"
      >
        <div className="flex flex-col w-full">

          {/* Card Title and Delete Button */}
          <div className="action h-10 w-full flex justify-between items-center">
            <h1 className="text-white text-2xl font-bold line-clamp-1">{note.title}</h1>
            <Button
              variant="outline"
              className="md:w-8 md:h-8 cursor-pointer hover:text-red-700 font-bold" onClick={()=> handleNoteDelete(note._id as string)} aria-disabled={isDeleting}>
              {
                isDeleting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <FaTrash className="text-red-500" />
                )
              }
            </Button>
          </div>

          {/* Card Content */}
          <div className="mt-5">
              <div className="max-h-[190px] md:min-h-[80px] md:h-auto overflow-hidden">
                  <p className="text-white text-lg mt-2 md:max-w-lg line-clamp-6">
                    {note.content}
                  </p>
              </div>
           <div className="foot flex justify-between items-center">
          

            {/* <Button
              variant="outline"
              className=" cursor-pointer hover:text-red-700" onClick={()=> handleNoteDelete(note._id as string)} aria-disabled={isDeleting}>
              {
                isDeleting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <FaEdit className="text-blue-500" />
                )
              }
            </Button> */}

<Sheet>
      <SheetTrigger asChild>
        <Button variant="outline"><FaEdit className="text-blue-500" /></Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Note</SheetTitle>
          <SheetDescription>
            Make changes to your note here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Title</Label>
            <Input id="sheet-demo-name" defaultValue={note.title} onChange={(e)=> setUpdatedNote({...updatedNote, title: e.target.value})}/>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Content</Label>
            <Input id="sheet-demo-username" defaultValue={note.content} onChange={(e)=> setUpdatedNote({...updatedNote, content: e.target.value})}/>
          </div>
        </div>
        <SheetFooter>
          <Button type="submit" onClick={()=> handleNoteEdit(note._id as string)} aria-disabled={isEditing}>Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>

            <h1 className="text-white text-xs text-start" suppressHydrationWarning>
              Created: {
                new Date(note.createdAt).toLocaleString()
              }
            </h1>
           </div>
          </div>

        </div>

      </SpotlightCard>
            )
          })
        }



      </div>

    </div>
  );
};

export default DashboardPage;
