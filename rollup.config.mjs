import { defineConfig } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import commonJS from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import executable from "rollup-plugin-executable";

const extensions = [".mjs", ".js", ".ts", ".json", ".d.ts"];

export default defineConfig({
    input: "./src/index.ts",
    external: ["inquirer", "yargs", "commit-and-tag-version"],
    plugins: [
        // Allows node_modules resolution
        resolve({ extensions }),

        // Compile TypeScript
        typescript({ tsconfig: "./tsconfig.json" }),

        json(),

        // Resolve CommonJS modules
        commonJS(),

        // Transpile to ES5
        babel({
            presets: ["@babel/env"],
            extensions: extensions,
            babelHelpers: "bundled",
            comments: false
        }),

        executable()
    ],
    output: {
        file: "dist/index.js",
        banner: "#!/usr/bin/env node\n\n"
    }
});
