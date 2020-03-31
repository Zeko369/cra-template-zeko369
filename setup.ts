import * as fs from "fs";
import * as path from "path";

const genPath = (base: string, name: string) => path.join(base, name);
const filter = (files: fs.Dirent[], exclude: string[]) =>
  files.filter((item) => !exclude.includes(item.name));

const copy = (from: string, to: string, exclude: string[]) => {
  fs.readdir(from, { withFileTypes: true }, (error, files: fs.Dirent[]) => {
    if (error) {
      console.error(error);
      return;
    }

    filter(files, exclude).forEach((file) => {
      if (file.isDirectory()) {
        fs.mkdirSync(genPath(to, file.name));
        copy(genPath(from, file.name), genPath(to, file.name), exclude);
      } else {
        fs.copyFileSync(genPath(from, file.name), genPath(to, file.name));
      }
    });
  });
};

console.log("Coping to template folder 👨‍💻");

const base_exclude = ["yarn.lock", "package.json"];

const removeComments = (s: string): boolean =>
  !(s.startsWith("#") || s.length === 0 || s.indexOf("/") !== s.lastIndexOf("/"));
const gitignore = fs
  .readFileSync("./src/.gitignore", "utf-8")
  .split("\n")
  .filter(removeComments)
  .map((item) => item.trim())
  .map((item) => item.replace(/\*/g, ""))
  .map((item) => item.replace(/\//g, ""));

const exclude = [...base_exclude, ...gitignore];

fs.rmdir("./template", { recursive: true }, () => {
  fs.mkdir("template", () => {
    copy("./src", "./template", exclude);
  });

  const { devDependencies, dependencies, scripts } = require("./src/package.json");
  const data = { package: { dependencies: { ...devDependencies, ...dependencies }, scripts } };

  const template = JSON.stringify(data, null, 2);

  fs.writeFile("template.json", template, () => {
    console.log("done with file");
  });
});

console.log("Copied to template folder 🎉");
