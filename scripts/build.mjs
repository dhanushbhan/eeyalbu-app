import { cp } from "node:fs/promises";
import { resolve } from "node:path";
import { build, mergeConfig } from "vite";
import viteConfig from "../vite.config.js";

const projectRoot = resolve(import.meta.dirname, "..");
const publicDir = resolve(projectRoot, "public");
const outDir = resolve(projectRoot, viteConfig.build?.outDir ?? "dist");

const buildConfig = mergeConfig(viteConfig, {
  publicDir: false,
});

await build(buildConfig);
await cp(publicDir, outDir, { recursive: true, force: true });
