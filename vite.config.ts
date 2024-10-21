import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
export default defineConfig((command, mode) =>{
  return {
    plugins: [uni()],
  }
});
