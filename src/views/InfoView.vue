<template>
    <LayoutComponent footer header> 
      <div class="row center">
        <div class="col flex-1 py-1 md-pl-1 mb-5 info">
          <h1>What is this thing?</h1>
          <p>
            This is my personal project, a photo gallery application made with Vue.js, that fetches content from a WordPress based backend. 
            In other words, it's so called "headless" implementation for WordPress CMS and the content can be fully self-hosted.
            The user interface also includes some additional fields to proof the originality of photos by using blockchain technology.
          </p>
          <p>
            I made this app for my personal purposes in the first instance, as I was not able to find a reasonable photo gallery app for
            all my thousands of photos, previously published in Flickr.
            I expected it to be reliable, not selling or over compressing my photos and definitely not selling my personal data to advertisers. 
            I also expected, that it should have an UI good enough and it can't be too expensive to use either. Well, not that much options left anymore.
          </p>
          <p>
            I have also been deeply interested in blockchain technology in general over 10 years and I wanted to implement some simple yet practical
            features to proof the originaly of my photos by using this technology. I knew already, that service called 
            <a target="_blank" href="https://originstamp.com">OriginStamp</a> would be just perfect for that purpose. In their own words, it's a blockchain based 
            platform to provide a tamper-proof timestamp irrefutably proving the existence of any digital content at a given time. I can add, that they also have 
            a well documented and smoothly working Restful API and they let me to use it for free, while I developed this project! So a huge thanks for guys in OriginStamp!
          </p>
          <p>
            In the time of visually oriented social media, AI and lizard people, I feel that any amount of transparent information, that can't be altered without traces,
            is always a positive progress. Of course this implementation is not a comprehensive solution that could save the world from drowning in false information.
            It's more like an ideological principle and a proof-of-concept for myself as a developer, that this could be the right path to follow and continue to develop this project. 
          </p>
          <p>
            If you wish to try this app on your own, feel free to download the source from <a target="_blank" href="https://github.com/henritik/blockr-vue-app">Github</a>.
            Besides the app itself, you need a WordPress environment running anywhere, a small 
            <a target="_blank" href="https://github.com/henritik/blockr-helper-plugin">helper plugin</a>
            and <a target="_blank" href="https://wordpress.org/plugins/attachment-taxonomies/">Attachment Taxonomies</a>
            plugin by Felix Arntz installed on the WordPress side. Alternatively, a bit more versatile plugin called
            <a target="_blank" href="https://wordpress.org/plugins/media-library-assistant/">Media Library Assistant</a> 
            by David Lindgren can be also used to create attachment taxonomies and can be very useful when there is need to handle bigger amount of photos.
            If you wish to use OriginStamp timestamping service, you will also need my  
            <a target="_blank" href="https://github.com/henritik/osawp-plugin">OriginStamp Attachments for WordPress</a> plugin.
          </p>
          <p>
            Especially the UI of this Vue implementation is based on the work by Emre Güney,  
            <a target="_blank" href="https://github.com/eeguney/vue-photogram-app">a photo gallery app for Pixabay API</a>. 
            As this project is published under the fully open MIT licence, you are wellcome to contribute and free to use this source to make your own implementations.
            Or if you have anything to ask about this project, feel free to send me a <a href="mailto:henri@henritikkanen.info">message</a>.
          </p>
          <p>
            With <span class="heart">♥</span> Henri Tikkanen
          </p>
          <div class="logos">
            <a class="github" href="https://github.com/henritik" target="blank"><font-awesome-icon :icon="['fab', 'fa-github']" size="3x"/></a>
            <a href='https://ko-fi.com/H2H5NVO9K' target='_blank'><img class="kofi" src='https://storage.ko-fi.com/cdn/kofi3.png?v=3' alt='Buy Me a Coffee at ko-fi.com' /></a>
          </div>
        </div>
      </div>
    </LayoutComponent>
  </template>
  
  <script>
  import LayoutComponent from "@/components/Layout.vue";
  
  export default {
    components: {
      LayoutComponent
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .mb-5 {
    margin-bottom: 5rem;
  }
  .info {
    max-width: 700px;
  }
  .heart {
    font-size: 1.5em;
    color: red;
  }
  .logos {
    margin-top: 20px;
  }
  .github {
    height: 48px;
  }
  .kofi {
    height: 48px;
    margin-left: 20px;
    filter: saturate(0);
    transition: all 0.4s cubic-bezier(0.445, 0.05, 0.55, 0.95);
    &:hover {
    filter: none;
    }
  }
  .github .svg-inline--fa {
    vertical-align: 0;
  }
  </style>
  
