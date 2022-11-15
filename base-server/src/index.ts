import app from './server'
import * as dotenv from 'dotenv'
dotenv.config()


app.listen(3000, () => {
    console.log("Listening to 3000")
})