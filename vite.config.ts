import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:[
      {
        find: '@vgmemory',
        replacement: path.resolve(path.join(__dirname,'/src/modules/vgmemory'))
      },
      {
        find: '@utils',
        replacement:path.resolve(path.join(__dirname,'/src/utils'))
      },
      {
        find:'@interfaces',
        replacement:path.resolve(path.join(__dirname),'/src/interfaces')
      },{
        find:'@assets',
        replacement:path.resolve(path.join(__dirname,'/src/assets'))
      }
    ]
  }
})
