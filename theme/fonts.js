import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      /* Quattro */
      @font-face {
        font-family: 'iA Writer Quattro Regular';
        font-style: normal;
        font-weight: normal;
        font-display: swap;
        src: url('/fonts/iAWriterQuattroS-Regular.woff2') format('woff2'), url('/fonts/iAWriterQuattroS-Regular.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'iA Writer Quattro Italic';
        font-style: italic;
        font-weight: normal;
        font-display: swap;
        src: url('/fonts/iAWriterQuattroS-Italic.woff2') format('woff2'), url('/fonts/iAWriterQuattroS-Italic.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'iA Writer Quattro Bold';
        font-style: normal;
        font-weight: bold;
        font-display: swap;
        src: url('/fonts/iAWriterQuattroS-Bold.woff2') format('woff2'), url('/fonts/iAWriterQuattroS-Bold.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'iA Writer Quattro Bold Italic';
        font-style: italic;
        font-weight: bold;
        font-display: swap;
        src: url('./fonts/iAWriterQuattroS-BoldItalic.woff2') format('woff2'), url('./fonts/iAWriterQuattroS-BoldItalic.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      /* Duo */
      @font-face {
        font-family: 'iA Writer Duo Regular';
        font-style: normal;
        font-weight: normal;
        font-display: swap;
        src: url('/fonts/iAWriterDuoS-Regular.woff2') format('woff2'), url('/fonts/iAWriterDuoS-Regular.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'iA Writer Duo Italic';
        font-style: italic;
        font-weight: normal;
        font-display: swap;
        src: url('/fonts/iAWriterDuoS-Italic.woff2') format('woff2'), url('/fonts/iAWriterDuoS-Italic.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'iA Writer Duo Bold';
        font-style: normal;
        font-weight: bold;
        font-display: swap;
        src: url('/fonts/iAWriterDuoS-Bold.woff2') format('woff2'), url('/fonts/iAWriterDuoS-Bold.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'iA Writer Duo Bold Italic';
        font-style: italic;
        font-weight: bold;
        font-display: swap;
        src: url('/fonts/iAWriterDuoS-BoldItalic.woff2') format('woff2'), url('/fonts/iAWriterDuoS-BoldItalic.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }


      /* Mono */
      @font-face {
        font-family: 'iA Writer Mono Regular';
        font-style: normal;
        font-weight: normal;
        font-display: swap;
        src: url('/fonts/iAWriterMonoS-Regular.woff2') format('woff2'), url('/fonts/iAWriterMonoS-Regular.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'iA Writer Mono Italic';
        font-style: italic;
        font-weight: normal;
        font-display: swap;
        src: url('/fonts/iAWriterMonoS-Italic.woff2') format('woff2'), url('/fonts/iAWriterMonoS-Italic.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'iA Writer Mono Bold';
        font-style: normal;
        font-weight: bold;
        font-display: swap;
        src: url('/fonts/iAWriterMonoS-Bold.woff2') format('woff2'), url('/fonts/iAWriterMonoS-Bold.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      @font-face {
        font-family: 'iA Writer Mono Bold Italic';
        font-style: italic;
        font-weight: bold;
        font-display: swap;
        src: url('/fonts/iAWriterMonoS-BoldItalic.woff2') format('woff2'), url('/fonts/iAWriterMonoS-BoldItalic.woff') format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      `}
  />
);

export default Fonts;
