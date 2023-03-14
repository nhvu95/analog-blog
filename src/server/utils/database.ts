import {Client} from "ts-postgres";
import {createApp} from "h3";

const client = new Client({
  host: "192.168.1.50",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "blog"
});

client.connect().then(() => {
  // console.log("Connect to the database!")
});
const app = createApp();

export {client, app};
