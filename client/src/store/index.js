import { proxy } from "valtio";

const state = proxy({
  intro: true,
  color: "#0c1021",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./logo.png",
  fullDecal: "./texture.webp",
  download: false,
});

export default state;
