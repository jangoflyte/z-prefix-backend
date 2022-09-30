const app = require("./app");
const port = process.env.PORT || 8080;

app.listen(process.env.PORT || port, () => {
  console.log(`server running on port: ${port}`);
});
