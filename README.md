# Blockr Vue App
A photo gallery app made with Vue.js for WordPress based backend with an option to use OriginStamp API. 
Not a standalone solution, needs a WP environment running and a few **[Plugins](https://github.com/henritik/blockr-helper-plugin)** installed in WordPress.

Especially the UI of this Vue implementation is based on the work by **Emre Güney**, **[a photo gallery app for Pixabay API](https://github.com/eeguney/vue-photogram-app)**. 

Live demo: **[https://blockr.henritikkanen.info/](https://blockr.henritikkanen.info/)** (heavily loaded)

## Features:

 - Using **[WordPress API](https://developer.wordpress.org/rest-api/)** and **[OriginStamp API](https://docs.originstamp.com/api/)**
 - Supports to download proofs for stamped photos (needs a plugin installed in WP)
 - Home, album, single photo and info views
 - Albums with cover images and description texts
 - Modal view with unlimited photo carousel
 - Descending and ascending orders
 - Infinite scroll
 - Masonry Wall layout
 - Filter by tags and safe search
 - Search photos
 - Dark and light modes
 - Dropdown navigations
 - Shortkeys for quick keyboard navigation
 - Unlimited and anonymous likes
 - Fully responsive design
 - Supports unlimited amount of photos
 - Supports up to 100 albums and tags
 
## Technologies and tools:

- **Vue.js** 
- **VueX, Vue Router**
- **Masonry Wall**
- **Pure SASS** and **SCSS**
- **Fontawesome**

## Packages
- [@yeger/vue2-masonry-wall](https://github.com/DerYeger/yeger/tree/main/packages/vue2-masonry-wall)
- [@fortawesome](https://github.com/FortAwesome/vue-fontawesome)
- [vue-clickaway](https://github.com/simplesmiler/vue-clickaway)
- [vue-router](https://github.com/vuejs/router)
- [vuex](https://github.com/vuejs/vuex)

## To-do:

- Vue 3 migration
- Better photo ordering
- Login for social content
- Comments and reactions for photos
- More detailed metadata for photos
- More detailed instructions and documentations
- Multi-gallery option for a single WP-instance
- Support for over 100 albums and tags (limit comes from WP Rest API)
- Some performance optimization

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Setting up env.locals
```
VUE_APP_BASE_PATH = <!-- Your end path for the production app (if not "/") -->
VUE_APP_WP_URL = <!-- The full path of your WP-instance. NOTE! Without a slash at the end (e.g. "https://yourdomain.com/wp" ) -->
VUE_APP_API_URL = <!-- The base address for Rest API (if not "wp-json/wp/v2") -->
VUE_APP_UNSAFE_TAG_ID = <!-- The ID of your "unsafe" tag in WP -->
VUE_APP_ADDITIONAL_FILE_EXTENSION_THUMB = <!-- Additional file extension for thumbnail images (e.g. ".webp"). This is an optional field -->
VUE_APP_ADDITIONAL_FILE_EXTENSION_LARGE = <!-- Additional file extension for large size images (e.g. ".webp"). This is an optional field -->
```

### Changelog

#### 1.0.0
- Initial release

#### 1.0.1
- Added timeout lock and some other small performance related tweaks for fetchMore function

- Minor performance optimization for Albums component

- Small tweaks for Masonry Wall props

- Option to use additional file extension for image optimization

#### 1.0.2
- Changed full size images in SingleModal view to be "large" size (1024px by default)

- Small fixes for navigation and loading control in SingleModal view

- Small refactoring in SingleModal view

- Added an option to show caption text in SingleModal view

## License:

MIT License

Copyright (c) 2023 Henri Tikkanen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
<br>
<br>
<br>
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/H2H5NVO9K)
