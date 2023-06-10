import { useEffect, useState } from "react";

export default function QrCodeBox(props) {

    const {url, disabled, darkmodeIsActivated} = props
    const downloadUrl = `${url}&download=1`;
    const [qrCode, setQrCode] = useState(null);

    const imgUrl = () => {
        if (url == null) {
            if (darkmodeIsActivated) {
                return "/img/default/QR-placeholder-dark.svg";
            } else {
                return "/img/default/QR-placeholder-light.svg";
            }
        } else {
            return url;
        }
    }

    const handleClick = () => {
        if (disabled) return
        window.open(downloadUrl, "_self")
    }

    useEffect(() => {
        setQrCode(imgUrl);
    }, [url, darkmodeIsActivated]);

    return (
        <img
          id="qr-image"
          src={qrCode}
          alt="QRcode"
          className="qr-image mb-6 w-64 h-64 filter drop-shadow-xl"
          onClick={handleClick}
          key={qrCode}
        />
    )
}