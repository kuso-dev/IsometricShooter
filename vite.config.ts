import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    assetsInlineLimit: 0,
  },
  plugins: [tsconfigPaths()],
  base: process.env.GITHUB_PAGES ? "IsometricShooter" : "./",
});
