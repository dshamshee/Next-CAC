
import { getNotes } from "@/lib/action";
import { Note } from "@/schemas/NoteSchema";
import axios from "axios";


export default async function TestingPage(){

  
        const response = await axios.get('http://localhost:3000/api/getnotes');
        console.log(response.data);


        // const notes = await getNotes();
        // console.log(notes);
 
    //     fetch('http://localhost:3000/api/getnotes')
    //   .then(response => response.json())
    //   .then(json => console.log(json))


        return(
            <div>
            {/* {
                response.data?.notes?.map((note: Note)=>{
                    return(
                        <h1 key={note._id as string}>{note.title}</h1>
                    )
                })
            } */}
            hello
        </div>
    )
}
