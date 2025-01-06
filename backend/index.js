import express from 'express'; // Impor framework Express untuk membuat server.
import db from './config/Database.js'; // Impor konfigurasi database.
import Users from './models/UserModel.js'; // Impor model tabel "Users".
import router from './routes/index.js'; // Impor rute-rute yang kamu buat.
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

try {
  await db.authenticate(); //cek connection to database
  await Users.sync(); // generatted schema automatically
  console.log('Database Connected...');
} catch (error) {
  console.log(error);
}
//app-cooker-parser
app.use(cookieParser());
// Menambahkan middleware supaya server bisa menerima dan membaca data dalam format JSON dari permintaan (request) yang dikirim user.
app.use(express.json());
// Mengatur semua rute atau jalan ke berbagai "halaman" server.
app.use(router);



app.listen(5000, () => console.log('server running at port 5000'));
