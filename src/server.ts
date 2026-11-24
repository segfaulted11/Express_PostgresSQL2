import app from "./app";
import { initDB } from "./db";
const PORT = 8000;

//moving the src/server.ts content to src/app.ts. creating a main function in server.ts (and calling it) and adding the app.listen function and calling the database initializing function in this function. 
//this way app.ts will handle everything and server.ts will the run the app. this is for the modular pattern.
// Separating application configuration from server initialization.
// The app.ts file handles application setup, middleware, and routes, while server.ts is responsible for initializing the database and starting the server.
// This separation follows a modular architecture, making the application easier to maintain, test, and scale.

const main =async()=>{

initDB();
// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
}
main();