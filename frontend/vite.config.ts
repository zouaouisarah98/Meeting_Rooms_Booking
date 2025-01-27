import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    // Configuration du serveur de développement
    server: {
        // Configuration du port sur lequel le serveur tourne
        port: 5173,

    },
    plugins: [vue()],
})
