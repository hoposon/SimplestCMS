const express = require("express");
// const { postgraphile } = require('./src/postgraphile/postgraphile');

const { postgraphile } = require("postgraphile");
const { config } = require('./pg.config');

const app = express();

// app.use(
//   postgraphile
// );
app.use(
	postgraphile(
	config.conn,
	config.schema,
	config.options
)
);

app.listen(process.env.PORT || 7000);

// const express = require("express");
// const { postgraphile } = require("postgraphile");

// const app = express();

// app.use(
//   postgraphile(
//     process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/simplecms",
//     "app_public",
//     {
//       watchPg: true,
//       graphiql: true,
//       enhanceGraphiql: true,
//     }
//   )
// );

// app.listen(process.env.PORT || 7000);