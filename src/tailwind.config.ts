import { Config } from "tailwindcss";
import flowbitePlugin from "flowbite/plugin";

const config: Config = {
  content: ["./index.html", "./node_modules/flowbite/**/*.js"],
  plugins: [flowbitePlugin],
};

export default config;
