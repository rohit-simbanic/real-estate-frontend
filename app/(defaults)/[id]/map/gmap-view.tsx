import React from "react";
const EmbedMap: React.FC<{ src: string }> = ({ src }) => {
  return (
    <div className="embed-map-container">
      <iframe
        src={src}
        width="100%"
        height="520"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default EmbedMap;
