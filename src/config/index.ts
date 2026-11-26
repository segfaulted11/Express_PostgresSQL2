import dotenv from "dotenv";
import path from "path"
dotenv.config({
    path : path.join(process.cwd(),'.env')
})
const config = {
    connection_string : process.env.DATABASE_URL as string,
    jwt_secret_token : process.env.JWT_SECRET_TOKEN as string,
    jwt_refresh_token : process.env.JWT_REFRESH_TOKEN as string,
}
export default config;