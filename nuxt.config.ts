export default {
  ssr: false,
  target: "static",
  app: {
    head: {
      title: "CodeRed | Get started with business tools from CodeRed",
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.svg" }],
    },
  },
  server: {
    port: 4000, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  modules: ["@nuxtjs/tailwindcss"],
  css: ["/assets/css/main.css"],
  tailwindcss: {
    cssPath: "@/assets/css/main.css",
  },
  axios: {
    // Axios options here
    timeout: 10000, // Example: set timeout to 10 seconds
  },
  plugins: [{ src: '~/plugins/google-analytics.client.ts', mode: 'client' }, { src: '~/plugins/googleTagManager.client.ts', mode: 'client' },]
};
