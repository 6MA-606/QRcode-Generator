import { useEffect, useRef } from "react";
import QRCode from "qrcode";
import Image from "next/image";

const QRCodeComponent = (props) => {
  const {
    text,
    color,
    bgColor,
    size,
    isDarkmode,
    onQRCodeGenerated,
    image,
    errorCorrectionLevel,
  } = props;
  const qrCodeRef = useRef(null);

  useEffect(() => {
    const options = {
      errorCorrectionLevel: errorCorrectionLevel,
      margin: 2,
      width: size,
      type: "image/png",
      color: {
        dark: color,
        light: bgColor,
      },
    };
    if (text !== "") {
      QRCode.toCanvas(qrCodeRef.current, text, options, function (error) {
        if (error) console.log(error.name + ": " + error.message);
        else onQRCodeGenerated(qrCodeRef.current);
      });
    }
  }, [
    text,
    color,
    bgColor,
    size,
    isDarkmode,
    onQRCodeGenerated,
    errorCorrectionLevel,
  ]);

  useEffect(() => {
    if (image !== "" && text !== "") {
      const canvas = document.getElementById("qrCodeCanvas");
      const ctx = canvas.getContext("2d");
      const img = document.createElement("img");
      img.src = image.base64Image;
      const area = (image.size / 100) * size;
      const pos = size / 2 - area / 2;

      img.onload = () => {
        ctx.drawImage(img, pos, pos, area, area);
        onQRCodeGenerated(canvas);
      };
    }
  }, [size, image, onQRCodeGenerated, text]);

  if (text === "") {
    const qrCode = () => {
      if (isDarkmode) {
        return "/img/default/QR-placeholder-dark.svg";
      } else {
        return "/img/default/QR-placeholder-light.svg";
      }
    };

    return (
      <div className="w-64 h-64 mb-6">
        <Image
          id="qr-image"
          src={qrCode()}
          alt="QRcode"
          className="qr-image filter drop-shadow-xl"
          width={256}
          height={256}
        />
      </div>
    );
  }

  return (
    <canvas
      ref={qrCodeRef}
      id="qrCodeCanvas"
      className="mb-6 filter drop-shadow-xl"
    />
  );
};

export default QRCodeComponent;
