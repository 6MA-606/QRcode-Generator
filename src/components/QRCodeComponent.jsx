import { useEffect, useRef } from "react";
import QRCode from "qrcode";
import Image from "next/image";

const QRCodeComponent = (props) => {
  const { text, color, bgColor, isDarkmode, onQRCodeGenerated, image } = props;
  const qrCodeRef = useRef(null);

  useEffect(() => {
    const options = {
        margin : 2,
        width: 256,
        type: 'image/svg+xml',
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
  }, [text, color, bgColor, isDarkmode, onQRCodeGenerated]);

  useEffect(() => {
    if (image !== "" && text !== "") {
        const canvas = document.getElementById("qrCodeCanvas");
        const ctx = canvas.getContext("2d");
        const img = document.createElement("img");
        img.src = image.base64Image;
        img.onload = () => {
            ctx.drawImage(img, 108, 108, 40, 40);
            onQRCodeGenerated(canvas);
        };
    }
  }, [image, onQRCodeGenerated, text]);

  if (text === "") {
    const qrCode = () => {
        if (isDarkmode) {
            return "/img/default/QR-placeholder-dark.svg";
        } else {
            return "/img/default/QR-placeholder-light.svg";
        }
    }


    return (
      <Image
        id="qr-image"
        src={qrCode()}
        alt="QRcode"
        className="w-64 h-64 mb-6 qr-image filter drop-shadow-xl"
        width={256}
        height={256}
      />
    );
  }

  return <canvas ref={qrCodeRef} id="qrCodeCanvas" className="mb-6 filter drop-shadow-xl" />;
};

export default QRCodeComponent;
