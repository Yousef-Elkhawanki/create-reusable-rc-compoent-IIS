import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    build: {
        lib: {
            entry: "./src/index.jsx",
            name: "SharedTable",
            fileName: (format) => `shared-table.${format}.js`,
            formats: ["umd", "es"],
        },
        roullupOptions: {
            external: ["react", "react-dom"],
        },
        define: {
            "process.env.NODE_ENV": JSON.stringify("production"),
        },
    },
});
