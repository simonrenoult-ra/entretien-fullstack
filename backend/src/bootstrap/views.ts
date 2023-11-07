import * as path from "node:path";

import { NestExpressApplication } from "@nestjs/platform-express";
import { create } from "express-handlebars";

export function configureViews(app: NestExpressApplication) {
  app.useStaticAssets(path.join(__dirname, "../shared/public"));
  app.setBaseViewsDir([
    path.join(__dirname, "../shared/views"),
    // FIXME: not a fan of module views being declared in a global module
    path.join(__dirname, "../carbone/reads/views"),
  ]);

  const hbs = create({
    extname: "hbs",
    defaultLayout: "layout_main",
    layoutsDir: path.join(__dirname, "../shared/views", "layouts"),
    partialsDir: path.join(__dirname, "../shared/views", "partials"),
  });

  app.engine("hbs", hbs.engine);
  app.setViewEngine("hbs");
}
