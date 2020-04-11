import * as fs from "fs";
import * as path from "path";

const base_exclude = ["yarn.lock", "package.json", ".github"];

const genPath = (base: string, name: string) => path.join(base, name);
const filter = (files: fs.Dirent[], exclude: string[]) =>
  files.filter((item) => !exclude.includes(item.name));

const copy = async (from: string, to: string, exclude: string[]): Promise<any> => {
  try {
    const files = await fs.promises.readdir(from, { withFileTypes: true });

    return Promise.all(
      filter(files, exclude).map(async (file) => {
        if (file.isDirectory()) {
          await fs.promises.mkdir(genPath(to, file.name));
          return copy(genPath(from, file.name), genPath(to, file.name), exclude);
        } else {
          return fs.promises.copyFile(genPath(from, file.name), genPath(to, file.name));
        }
      })
    );
  } catch (err) {
    return console.error(err);
  }
};

const removeComments = (s: string): boolean =>
  !(s.startsWith("#") || s.length === 0 || s.indexOf("/") !== s.lastIndexOf("/"));

const gitignore = async () => {
  const data = await fs.promises.readFile("./src/.gitignore", "utf-8");
  return data
    .split("\n")
    .filter(removeComments)
    .map((item) => item.trim())
    .map((item) => item.replace(/\*/g, ""))
    .map((item) => item.replace(/\//g, ""));
};

const main = async () => {
  const gitIg = await gitignore();
  const exclude = [...base_exclude, ...gitIg];

  await fs.promises.rmdir("./template", { recursive: true });
  await fs.promises.mkdir("template");

  await copy("./src", "./template", exclude);

  const { devDependencies, dependencies, scripts } = require("./src/package.json");
  const data = { package: { dependencies: { ...devDependencies, ...dependencies }, scripts } };

  const template = JSON.stringify(data, null, 2);

  await fs.promises.writeFile("template.json", template);
};

console.log("Coping to template folder 👨‍💻");
main()
  .then(() => {
    console.log("Copied to template folder 🎉");
  })
  .catch((err) => console.error("Error building template 😭"));
