import {
  // Atoms
  SVGBackground,
} from "../../config/exports";

// Other Imports
import landingBg from "../../assets/images/landing-bg.svg";

function LandingPageBG(attr) {
  return <SVGBackground type="fixed" imageUrl={landingBg} {...attr} />;
}

const attribution = {
  link: "https://www.svgbackgrounds.com/set/free-svg-backgrounds-and-patterns/",
  text: "Free SVG Backgrounds and Patterns by SVGBackgrounds.com",
};

export default LandingPageBG;
export { attribution };
