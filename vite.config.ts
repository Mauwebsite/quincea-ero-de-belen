import {defineConfig} from 'vite';
import tailwindcss from '@tailwindcss/vite';
// base relativa: funciona en GitHub Pages (/quincea-ero-de-belen/), en local y en cualquier dominio.
export default defineConfig({base:'./',plugins:[tailwindcss()]});
