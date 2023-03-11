import {Client} from "ts-postgres";

const client = new Client({
  host: "192.168.1.50",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "blog"
});
client.connect();

export {client};
