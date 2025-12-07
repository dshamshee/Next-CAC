
import Image from "next/image";
import { GetServerSessionHere } from "./api/auth/[...nextauth]/options";



export default async function Home() {
    const session = await GetServerSessionHere();
    console.log(session?.user);
  const user = session?.user.username;
  
  return (
    <div className="mainContainer flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold text-blue-500 mb-8">Home</h1>
      <h1>Welcome {user}</h1>
      {/* <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
}
