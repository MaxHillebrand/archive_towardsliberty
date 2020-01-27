const { resolve } = require('path')
const { slugify } = require('@vuepress/shared-utils')
const customBlock = require('markdown-it-custom-block')

const youtubeEmbed = (id, path) => `
  <div class="ytEmbed" data-id="${id}" style="background-image:url(https://img.youtube.com/vi/${id}/hqdefault.jpg);">
    <iframe
      title="YouTube ${id}"
      data-src="https://www.youtube-nocookie.com/embed/${path}&autoplay=1&autohide=1&modestbranding=1&color=white&rel=0"
      frameborder="0"
      allow="autoplay;encrypted-media;picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>`

const themeColor = "#211b24"

module.exports = {
  title: "Towards Liberty",
  description: "An archive of knowledge about Bitcoin, Economics and Natural Law, curated by Max Hillebrand.",
head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["link", { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" }],
    ["link", { rel: "manifest", href: "/site.webmanifest" }],
    ["link", { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: themeColor }],
    ["link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Inconsolata:400,700|Playfair+Display:700&display=swap" }],
    ["meta", { name: "msapplication-TileColor", content: themeColor }],
    ["meta", { name: "theme-color", content: themeColor }],
  ],
  plugins: [
    "@vuepress/back-to-top",
    ["container", {
      type: "details",
      render (tokens, idx) {
        const token = tokens[idx]
        // turn details headline into summary
        if (token.type === 'container_details_open') {
          const next = tokens[idx + 1]
          const match = token.info.trim().match(/^details\s+(.*)$/)
          let title = match && match[1]
          if (next.type === 'heading_open' && !title) {
            const headContent = tokens[idx + 2]
            const headClose = tokens[idx + 3]
            // hide headline and its contents
            next.hidden = headClose.hidden = headContent.hidden = true
            headContent.children = []
            // extract title
            title = headContent.content || ''
          } else {
            title = ''
          }
          const slug = slugify(title)
          return `<details id="${slug}"><summary><a href="#${slug}" aria-hidden="true" class="header-anchor">#</a> <h4>${title}</h4></summary>`
        } else if (token.type === 'container_details_close') {
          return '</details>'
        }
      }
    }]
  ],
  chainWebpack (config) {
    return config.module
      .rule('md')
      .test(/\.md$/)
      .use(resolve(__dirname, './variables'))
        .loader(resolve(__dirname, './variables'))
        .end()
  },
  markdown: {
    extendMarkdown (md) {
      md.use(customBlock, {
        youtube (arg) {
          const [id, start] = arg.split(',')
          const path = start ? `${id}?start=${start}` : `${id}?`
          return youtubeEmbed(id, path)
        },
        youtubePlaylist (arg) {
          const [id, video] = arg.split(',')
          const path = `${video || ''}?listType=playlist&list=${id}`
          return youtubeEmbed(video || id, path)
        }
      })
    }
  },
  themeConfig: {
    logo: "/seed_of_bitcoin.png",
    searchPlaceholder: 'Search the archive...',
    smoothScroll: true,
    displayAllHeaders: false,
    sidebarDepth: 0,
    docsDir: "docs",
    editLinks: true,
    lastUpdated: 'Last Updated',
    nav: [
      {
        text: "Bitcoin",
        link: "/bitcoin/"
      },
      {
        text: "Economics",
        link: "/economics/"
      },
      {
        text: "Natural Law",
        link: "/natural-law/"
      },
      {
	text: "Contact",
	link: "/contact/"
      }
    ],
    sidebar: {
      "/bitcoin/": [
        {
          title: "Bitcoin",
          collapsable: false,
          sidebarDepth: 2,
          children: [
            "/bitcoin/InitiationBitcoin.md",
            "/bitcoin/FullNode.md",
            "/bitcoin/Wallets.md",
            "/bitcoin/Transaction.md",
            "/bitcoin/StackingSats.md",
            "/bitcoin/Privacy.md",
            "/bitcoin/LightningNetwork.md",
            "/bitcoin/Cryptography.md",
            "/bitcoin/Cryptoanarchy.md",
            "/bitcoin/Resources.md"

	  ]
        }
      ]
    }
  }
}
