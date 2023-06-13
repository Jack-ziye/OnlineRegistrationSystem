import React from "react";
import { Particles } from "@blackbox-vision/react-particles";

import params from "@/config/particles.json";

const ParticlesComponent = () => {
  return (
    <Particles
      className="particles_card"
      style={{
        backgroundColor: "#000",
      }}
      params={params}
    />
  );
};

export default ParticlesComponent;
