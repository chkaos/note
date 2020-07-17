
module.exports = {
    base: "/MIT-Challenge/",
    title: 'CHKAOS', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
    description: 'My MIT Challenge inspired by Scott Young', // meta 中的描述文字，用于SEO
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', { rel: 'icon', href: '/egg.png' }],  //浏览器的标签栏的网页图标
    ],
    markdown: {
        lineNumbers: true
    },
    serviceWorker: true,
    themeConfig: {
        logo: '/egg.png',
        lastUpdated: 'lastUpdate', // string | boolean
        nav: [
            { text: '首页', link: '/' },
            // {
            //     text: '分类',
            //     ariaLabel: '分类',
            //     items: [
            //         { text: '文章', link: '/pages/folder1/test1.md' },
            //         { text: '琐碎', link: '/pages/folder2/test4.md' },
            //     ]
            // },
            { text: '博客', link: 'http://chkaos.top' },
            { text: 'Github', link: 'https://github.com/chkaos/MIT-Challenge' },
        ],
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@oss': 'path/to/some/dir'
            }
        }
    },
    plugins: ['permalink-pinyin', ['autobar', { 'pinyinNav': true }], 'rpurl'],
}