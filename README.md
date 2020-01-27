# Towards Liberty

---

### VuePress

The knowledge archive [Towards Liberty](https://towardsliberty.com) is built using an open source static site generator called VuePress.
Its [configuration](https://github.com/MaxHillebrand/towardsliberty/blob/master/docs/.vuepress/config.js) and [theme](https://github.com/MaxHillebrand/towardsliberty/tree/master/docs/.vuepress/styles) are extremely customizable, and it offers great defaults out-of-the-box.
Check out the [VuePress website](https://v1.vuepress.vuejs.org/) for details on how to use it.

To contribute to the content of the website, you can make PRs related to the markdown files in the `/docs/` directory, and if merged, the changes will automatically be integrated into the documentation website by VuePress.
Know that you do not need to understand/deal with VuePress at all in this case.

### Reference files

Please consider this repository structure for hyperlinks, and use relative links whenever possible, for example:

```
[Max' PGP key](/contact/MaxHillebrandPublicKey.asc)
```

### Embedding images

The images are stored in the [`/docs/.vuepress/public/`](https://github.com/MaxHillebrand/towardsliberty/tree/master/docs/.vuepress/public) directory.
They can be embedded via the following markdown tags:

```
![](/IMAGENAME.png)
```

### Embedding icons

To insert icons inline with the text, use these HTML tags:

```html
<img src="/Icon.png" alt="icon" class="shield" />
```

### Embedding videos

Youtube videos and playlists can be embedded via the following custom markdown tags:

```md
@[youtube](VIDEO_ID)
@[youtubePlaylist](PLAYLIST_ID)
```

Optionally you can also specify the start position of a video in seconds (e.g. starts at 100 seconds):

```md
@[youtube](VIDEO_ID,100)
```

And the index of the video of a playlist (e.g. starts the third video):

```md
@[youtubePlaylist](PLAYLIST_ID,VIDEO_ID)
```

### Text Highlights

There are three types of text highlights that can be used to display different colored boxes.

A green box displaying a friendly tip:

```
:::tip
foo
:::
```

A yellow box with a cautious warning:

```
:::warning
foo
:::
```

A red box with a clear danger, you can also add a title `foo` to any container:

```
:::danger foo
bar
:::
```

### Frequently asked questions

Use this markdown box with the headers to write the FAQ:
```
:::details
### question

answer answer answer.
answer answer answer.
:::
```

When you want to [highlight text](README.md#text-highlights) within a question, then you need to [nest containers](https://github.com/markdown-it/markdown-it-container/issues/6#issuecomment-213789283) by adding more `:` for the outer block start/end. The outer `details` container has now four `::::`, and the inner `warning` container has still three `:::`.

```
::::details
### question

answer answer answer.

:::warning
answer answer answer.
:::
::::
```

### Variables

To have a single place to maintain universal strings like the current Wasabi version number, we use variables in the Markdown (i.e.  `${currentVersion}`).
These variables are managed in [`docs/.vuepress/variables.js`](https://github.com/MaxHillebrand/towardsliberty/blob/master/docs/.vuepress/variables.js).
Occurrences of `${variableName}` get substituted before the Markdown is processed.

---

## Build the Documentation Locally

In order to build the website locally, you'll need [Node.js](https://nodejs.org/) >= 10.16 (or basically the latest LTS version).

### Serve locally

1. Install dependencies
2. Serve locally (by default on port 8080)

```bash
npm install
npm start
```
