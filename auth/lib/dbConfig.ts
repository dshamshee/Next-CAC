import mongoose from 'mongoose';

interface ConnectionObject {
    isConnected: number;
}

const connection: ConnectionObject = {
    isConnected: 0
}


export async function dbConnect(): Promise<void>{

    // 1. Check for existing connection (Idempotency)
    if(connection.isConnected){
        console.log("Already connected to the database");
        return;
    }

    try {

        // 2. Initial connection attempt
        const db = await mongoose.connect(process.env.MONGODB_URI || "")

        // 3. Update global connection state
        connection.isConnected = db.connections[0].readyState;
        console.log("DB Connected Successfully 🎉");

        // 4. Set up event listeners for subsequent connection errors/status changes
        const mongooseConnection = mongoose.connection;

        // Error handling for errors that occur AFTER the initial successful connection
        mongooseConnection.on('error', (error)=>{
            console.error("MongoDB connection error AFTER initial success:", error);
            // Optionally, implement logic to try and reconnect or gracefully shut down
            // process.exit(1); 
        })

        // Logging for disconnection (e.g., if the MongoDB server goes down)
        mongooseConnection.on('disconnected', ()=>{
            console.log("MongoDB disconnected ❌");
            connection.isConnected = 0; // Reset connection status
        })

    } catch (error) {
        // 5. Initial connection failure
        console.error("Initial Database Connection Failed 🛑", error);
        // Exit the process on critical failure
        process.exit(1); 
    }
}