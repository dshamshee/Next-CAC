"use client"
import SpotlightCard from "@/components/SpotlightCard";
import { Button } from "@/components/ui/button";
import { Note } from "@/schemas/NoteSchema";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";





const DashboardPage = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false)
  const {data: session} = useSession();


  useEffect(()=>{

    const fetchNotes = async()=>{
      setIsLoading(true);
  
      try {
        if(!session || !session.user) return;
        const response = await axios.get('/api/getnotes');
        if(response.data.success){
          setNotes(response.data.notes || []);
          toast.success(response.data.message)
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error.message)
      }finally{
        setIsLoading(false);
      }
    }

    // console.log("fetching notes")
    fetchNotes();
  }, [session])


  // console.log(notes?.[0]._id); 

  const handleNoteDelete = async(noteId: string)=>{
    setIsDeleting(true)
    try {
      const response = await axios.delete(`/api/deleteNote/${noteId}`)
      if(response.data.success){
        toast.success(response.data.message)
        setNotes(notes.filter((note)=> note._id !== noteId))
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsDeleting(false)
    }
  }


  if(isLoading){
    return(
      <div className="mainContainer w-screen h-screen flex justify-center items-center pt-36 md:px-20 px-5 min-h-screen bg-neutral-950 antialiased bg-grid-white/[0.02]">
        <Loader2 className="w-4 h-4 animate-spin" />
      </div>
    )
  }

  if(notes.length === 0){
    return(
      <div className="mainContainer w-screen h-screen flex justify-center items-center pt-36 md:px-20 px-5 min-h-screen bg-neutral-950 antialiased bg-grid-white/[0.02]">
        <p className="text-white text-2xl font-bold">No notes found</p>
      </div>
    )
  }


  return (
    <div className="mainContainer pt-36 md:px-20 px-5 min-h-screen bg-neutral-950 antialiased bg-grid-white/[0.02]">

        {/* Page Title */}
      <h1 className="text-white text-2xl font-bold text-center">Your Notes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">

        {
          notes.map((note)=>{
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
            <h1 className="text-white text-xs mt-5 text-end">
              Created: {
                new Date(note.createdAt).toLocaleString()
              }
            </h1>
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
