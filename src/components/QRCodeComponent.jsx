import { useEffect, useRef } from "react";
import QRCode from "qrcode";

const QRCodeComponent = (props) => {
  const { text, color, bgColor, isDarkmode, onQRCodeGenerated  } = props;
  const qrCodeRef = useRef(null);

  useEffect(() => {
    const options = {
        margin : 2,
        width: 256,
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
  }, [text, color, bgColor, isDarkmode]);

  if (text === "") {
    const qrCode = () => {
        if (isDarkmode) {
            return "/img/default/QR-placeholder-dark.svg";
        } else {
            return "/img/default/QR-placeholder-light.svg";
        }
    }


    return (
      <img
        id="qr-image"
        src={qrCode()}
        alt="QRcode"
        className="w-64 h-64 mb-6 qr-image filter drop-shadow-xl"
      />
    );
  }

  return <canvas ref={qrCodeRef} className="mb-6 filter drop-shadow-xl" />;
};

export default QRCodeComponent;
