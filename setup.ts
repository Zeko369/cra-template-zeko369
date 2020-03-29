import * as fs from "fs";
import * as path from "path";

const exclude = ["yarn.lock", "yarn-error.log", "package.json", "node_modules"];

const filter = (files: fs.Dirent[]) => files.filter((item) => !exclude.includes(item.name));

const genPath = (base: string, name: string) => path.join(base, name);

const copy = (from: string, to: string) => {
  fs.readdir(from, { withFileTypes: true }, (error, files: fs.Dirent[]) => {
    if (error) {
      console.error(error);
      return;
    }

    filter(files).forEach((file) => {
      if (file.isDirectory()) {
        fs.mkdirSync(genPath(to, file.name));
        copy(genPath(from, file.name), genPath(to, file.name));
      } else {
        fs.copyFileSync(genPath(from, file.name), genPath(to, file.name));
      }
    });
  });
};

console.log("Coping to template folder 👨‍💻");

fs.rmdir("./template", { recursive: true }, () => {
  fs.mkdir("template", () => {
    copy("./src", "./template");
  });

  const { devDependencies, dependencies, scripts } = require("./src/package.json");

  const data = { devDependencies, dependencies, scripts };

  const template = JSON.stringify(data, null, 2);

  fs.writeFile("template.json", template, () => {
    console.log("done with file");
  });
});

console.log("Copied to template folder 🎉");
