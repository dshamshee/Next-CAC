"use client"
import { Input } from "@/components/ui/input";
// import { GetServerSessionHere } from "../api/auth/[...nextauth]/options";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner"


interface Note {
    title: string;
    content: string;
}

const AddNote = ()=>{

    const [note, setNote] = useState<Note>({
        title: "",
        content: "",
    })

    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleAddNote = async(e: any)=>{
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await axios.post('/api/addnote', note)
   
            if(response.data.success){
                setNote({
                    title: '',
                    content:''
                })
                toast.success(response.data.message);
                router.push('/')
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message);
        }finally{
            setIsSubmitting(false);
        }
    }

    return(
        <div className="mainContainer bg-neutral-950 w-screen h-screen pt-36 flex flex-col items-center">
            <h1>Add New Note</h1>

            <form action="" className="flex flex-col items-center gap-5 w-[500px] mt-5">
                <Input type="text" placeholder="Title" value={note.title} onChange={(e)=> setNote({...note, title: e.target.value})} />
                <Input type="text" placeholder="Write your note here" className="h-14 resize-none" value={note.content} onChange={(e)=> setNote({...note, content: e.target.value})} />
                <Button type="submit" className="w-[80%]" onClick={(e)=> handleAddNote(e)} aria-disabled={isSubmitting}>
                {
                    isSubmitting ? (
                        <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait 
                        </>
                    ) : ('Add Note')
                }
                </Button>
            </form>
            
        </div>
    )
}

export default AddNote;