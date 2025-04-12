import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
// import fs from "fs";

// https://vitejs.dev/config/
export default ({ mode }) => {
  // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }; // eslint-disable-line no-undef

  return defineConfig({
    plugins: [react()],
    // server: {
    //   https: {
    //     key: fs.readFileSync("./certs/server.key"),
    //     cert: fs.readFileSync("./certs/server.cert"),
    //   },
    // }, // Uncomment this line to use HTTPS in development mode
  });
};
