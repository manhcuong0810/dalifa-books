import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors":{
        "on-tertiary-fixed-variant":"#93000b",
        "tertiary-fixed-dim":"#ffb4ab",
        "surface-card":"#ffffff",
        "error-container":"#ffdad6",
        "surface-container-high":"#e2e7ff",
        "background":"#faf8ff",
        "on-primary":"#ffffff",
        "inverse-on-surface":"#eef0ff",
        "outline-variant":"#e1bfb3",
        "on-error-container":"#93000a",
        "secondary-container":"#fd651e",
        "on-secondary-fixed":"#370e00",
        "surface-container-low":"#f2f3ff",
        "on-surface-variant":"#594138",
        "on-secondary-container":"#571a00",
        "on-secondary":"#ffffff",
        "surface-border":"#e2e8f0",
        "on-tertiary":"#ffffff",
        "tertiary":"#bf0715",
        "surface-canvas":"#ffffff",
        "tertiary-fixed":"#ffdad6",
        "surface-bright":"#faf8ff",
        "surface-container-lowest":"#ffffff",
        "on-surface":"#131b2e",
        "on-error":"#ffffff",
        "on-primary-fixed-variant":"#7f2b00",
        "primary-fixed":"#ffdbce",
        "accent-star":"#f59e0b",
        "primary":"#a63b00",
        "surface-variant":"#dae2fd",
        "surface-dim":"#d2d9f4",
        "surface-subtle":"#f8fafc",
        "text-muted":"#64748b",
        "primary-container":"#f26522",
        "surface-container":"#eaedff",
        "inverse-primary":"#ffb599",
        "secondary-fixed-dim":"#ffb599",
        "secondary-fixed":"#ffdbce",
        "badge-discount":"#dc2626",
        "on-tertiary-container":"#5c0004",
        "secondary":"#a73a00",
        "on-primary-fixed":"#370e00",
        "surface":"#faf8ff",
        "surface-tint":"#a63b00",
        "on-primary-container":"#4f1800",
        "primary-fixed-dim":"#ffb599",
        "on-secondary-fixed-variant":"#7f2b00",
        "tertiary-container":"#ff554b",
        "inverse-surface":"#283044",
        "error":"#ba1a1a",
        "outline":"#8d7166",
        "on-background":"#131b2e",
        "on-tertiary-fixed":"#410002",
        "surface-container-highest":"#dae2fd"
      },
      "borderRadius":{
        "DEFAULT":"0.25rem","lg":"0.5rem","xl":"0.75rem","full":"9999px"
      },
      "spacing":{
        "gutter-mobile":"0.75rem","space-sm":"0.5rem","gutter":"1.5rem","space-md":"1rem","space-xs":"0.25rem","space-lg":"1.5rem","margin":"2rem","margin-mobile":"1rem","space-xl":"2.5rem"
      },
      "fontFamily":{
        "display-lg":["Plus Jakarta Sans"],"headline-xl-mobile":["Plus Jakarta Sans"],"body-md":["Plus Jakarta Sans"],"headline-xl":["Plus Jakarta Sans"],"label-lg":["Plus Jakarta Sans"],"headline-lg":["Plus Jakarta Sans"],"body-sm":["Plus Jakarta Sans"],"label-sm":["Plus Jakarta Sans"],"headline-sm":["Plus Jakarta Sans"],"label-md":["Plus Jakarta Sans"],"display-lg-mobile":["Plus Jakarta Sans"],"headline-md":["Plus Jakarta Sans"],"price-card":["Plus Jakarta Sans"],"price-hero":["Plus Jakarta Sans"],"body-lg":["Plus Jakarta Sans"]
      },
      "fontSize":{
        "display-lg":["48px",{"lineHeight":"56px","letterSpacing":"-0.02em","fontWeight":"800"}],
        "headline-xl-mobile":["26px",{"lineHeight":"34px","letterSpacing":"-0.01em","fontWeight":"700"}],
        "body-md":["14px",{"lineHeight":"22px","fontWeight":"400"}],
        "headline-xl":["36px",{"lineHeight":"44px","letterSpacing":"-0.02em","fontWeight":"700"}],
        "label-lg":["14px",{"lineHeight":"20px","letterSpacing":"0.01em","fontWeight":"600"}],
        "headline-lg":["28px",{"lineHeight":"36px","letterSpacing":"-0.01em","fontWeight":"700"}],
        "body-sm":["12px",{"lineHeight":"18px","fontWeight":"400"}],
        "label-sm":["11px",{"lineHeight":"14px","letterSpacing":"0.04em","fontWeight":"700"}],
        "headline-sm":["18px",{"lineHeight":"26px","fontWeight":"600"}],
        "label-md":["12px",{"lineHeight":"16px","letterSpacing":"0.02em","fontWeight":"600"}],
        "display-lg-mobile":["32px",{"lineHeight":"40px","letterSpacing":"-0.015em","fontWeight":"800"}],
        "headline-md":["22px",{"lineHeight":"30px","letterSpacing":"-0.005em","fontWeight":"700"}],
        "price-card":["16px",{"lineHeight":"22px","fontWeight":"700"}],
        "price-hero":["22px",{"lineHeight":"28px","fontWeight":"700"}],
        "body-lg":["16px",{"lineHeight":"26px","fontWeight":"400"}]
      }
    },
  },
  plugins: [],
};
export default config;
