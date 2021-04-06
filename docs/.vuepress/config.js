const getConfig = require("vuepress-bar");
const path = require("path")
const { nav, sidebar } = getConfig();

module.exports = {
    base: "/note/",
    title: 'CHKAOS', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
    description: 'My Note Collection', // meta 中的描述文字，用于SEO
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', { rel: 'icon', href: '/egg.png' }],  //浏览器的标签栏的网页图标
    ],
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        logo: '/favicon.png',
        lastUpdated: 'lastUpdate', // string | boolean
        nav: [
            ...nav,
            { text: '博客', link: 'http://chkaos.top' },
            { text: 'Github', link: 'https://github.com/chkaos/note' },
        ],
        sidebar,
        docsRepo: 'chkaos/note',
        docsDir: '/',
        smoothScroll: true
    },

    plugins: ['permalink-pinyin', 'rpurl'],
    // chainWebpack: (config, isServer) => {
    //     const inlineLimit = 10000
    //     config.module.rule('images')
    //         .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
    //         .use('url-loader')
    //         .loader('url-loader')
    //         .options({
    //             limit: inlineLimit,
    //             name: `assets/img/[name].[hash:8].[ext]`
    //         })
    // },
    configureWebpack: {
        resolve: {
          alias: {
            '@assets':path.resolve(__dirname, '../../assets')
          }
        }
      }
}