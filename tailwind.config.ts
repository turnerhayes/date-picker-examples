// const flowbitePlugin = ((window as any).Flowbite as any).Plugin;
import flowbitePlugin from "flowbite/plugin";

const config = {
  content: ["./index.html", "./node_modules/flowbite/**/*.js"],
  plugins: [flowbitePlugin],
};

export default config;
