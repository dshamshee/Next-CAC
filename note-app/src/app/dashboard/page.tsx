import { GetServerSessionHere } from "../api/auth/[...nextauth]/options";




const DashboardPage = async ()=>{
    
    const session = await GetServerSessionHere();
    console.log(session?.user);

    return(
        <div className="mainContainer">
            <h1>Dashboard</h1>
            
        </div>
    )
}

export default DashboardPage;