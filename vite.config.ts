import { defineConfig, loadEnv } from 'vite';
import uni from "@dcloudio/vite-plugin-uni";
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
// import path from 'path';


// https://vitejs.dev/config/
export default defineConfig(({command, mode}) =>{


  // const envDir: string = path.resolve(__dirname, `./env`); // 设置环境变量的目录
  // const envPrefix: string = 'VITE_'; // 设置环境变量的前缀，暴露import.meta.env.VITE_APP_BASE_API
  // const env = loadEnv(mode, envDir, envPrefix); // 获取环境变量
  // const { VITE_APP_BASE_API, VITE_CSS_PREFIX, VITE_PHONE, VITE_APP_TITLE } = env;
  // const outDir = `./dist/${VITE_APP_TITLE}`; // 设置打包和预览目录

  return {
    plugins: [
      uni(),
      visualizer({
        gzipSize: true    
      }),
      viteCompression(),
    ],
    base: './', // 设置打包路径
    mode: mode, // production || development 用于开发的时候使用某个环境的配置，默认development
    clearScreen: true, // 启动时清空控制台
    build: {
      chunkSizeWarningLimit: 1500, // 打包时超过1500kb的提示
      target: 'modules', // 设置打包环境
      outDir: './dist', // 设置打包输出目录
      assetsDir: './assets', // 设置打包输出静态资源目录
      assetsInlineLimit: 1024 * 1024, // 设置打包时静态资源小于1M时，打包成base64格式变成内联样式，只要js加载出来，图片就会加载出来，0延迟
      reportCompressedSize: false, // 打包时是否生成打包体积报告，提升构建速度
      rollupOptions: {
        plugins: [visualizer()],
        output: {
          experimentalMinChunkSize: 200 * 1024, // 设置打包时最小打包体积
          chunkFileNames: 'assets/js/[name]-[hash].js', // 设置打包时js文件名
          entryFileNames: 'assets/js/[name]-[hash].js', // 设置打包时入口文件名
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]', // 设置打包时静态资源文件名
          compact: true, // 设置打包时是否压缩
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            } else if (id.includes('src')) {
              return id.toString().split('src/')[1].split('/')[0].toString();
            }
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    css: {
      modules: {
        generateScopedName: `UNI_[hash:base64:5]_[local]`, // 设置css模块化的类名
        globalModulePaths: [], // 代表不想参与到css模块化的路径
      },
    }
  }
});
