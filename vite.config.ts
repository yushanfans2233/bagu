import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { type ConfigEnv, defineConfig, type PluginOption } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

const AddAnalytics = (isProduction: boolean): PluginOption => {
  return {
    name: 'add-analytics',
    transformIndexHtml(html: string) {
      if (!isProduction) {
        return html
      }

      return html
        .replace(
          '<!-- Microsoft Clarity -->',
          `
<script type="text/javascript">
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
    t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", "mzstl94s97");
</script>
`,
        ).replace(
          '<!-- Google Analytics -->',
          `
<script async src="https://www.googletagmanager.com/gtag/js?id=G-36GCMM73V3"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());

  gtag('config', 'G-36GCMM73V3');
</script>
`
        )
    },
  }
}


// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  return {
    plugins: [
      vue(),
      vueDevTools(),
      AddAnalytics(mode === 'production')
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
