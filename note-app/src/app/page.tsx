
import DashboardPage from "@/components/Dashboard";
import axios from "axios";
import { headers } from "next/headers";
import Link from "next/link";



const HomePage = async ()=>{
  const headerPayload = headers();

  const response = await axios.get('http://localhost:3000/api/getnotes', {
    headers: {
        'Cookie': (await headerPayload).get('cookie') || '', // cookie from header payload
    }
});

const notes = await response.data.notes;


if(!notes){
  return(
    <div className="mainContainer w-screen h-screen flex justify-center items-center pt-36 md:px-20 px-5 min-h-screen bg-neutral-950 antialiased bg-grid-white/[0.02]">
      <p className="text-white text-2xl font-bold">Internal Server Error</p>
    </div>
  )
}

if(notes.length === 0){
  return(
    <div className="mainContainer w-screen h-screen flex justify-center items-center pt-36 md:px-20 px-5 min-h-screen bg-neutral-950 antialiased bg-grid-white/[0.02]">
      <p className="text-white text-2xl font-bold">No notes found</p>
      <Link href="/addnote" className="text-blue-500">Create a note</Link>
    </div>
  )
}


  return(
    <>
    <DashboardPage notes={notes} />
    </>
  )
}

export default HomePage;