const express = require(`express`);
const mongoose = require(`mongoose`);
const cors = require(`cors`);
const app = express();
require(`dotenv.config`);

app.use(cors());

// routes
const companyRoutes = require(`./src/routes/company`);
const goalRoutes = require(`./src/routes/goal`);
const fieldRoutes = require(`./src/routes/field`);

// consuming routes
app.use(`/company`, companyRoutes);
app.use(`/goal`, goalRoutes);
app.use(`/field`, fieldRoutes);

// server
app.listen(8000, () => console.log(`listening on port 8000`));

// mongodb connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("connected to database");
});
