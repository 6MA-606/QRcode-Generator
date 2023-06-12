import { useEffect, useState } from "react";
import {
  ColorInput,
  FileInput,
  OptionInput,
  RangeInput,
  TextBox,
} from "@/components/Input";
import { Button, CornerButton, DarkmodeButton } from "@/components/Button";
import { Github } from "react-bootstrap-icons";
import Head from "next/head";
import QRCodeComponent from "@/components/QRCodeComponent";

export default function Home() {
  const version = "2.1.0 alpha 3.1";
  const [isDarkmode, setIsDarkmode] = useState(false);
  const [text, setText] = useState("");
  const [color, setColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [qrCodeCanvas, setQRCodeCanvas] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [size, setSize] = useState(256);
  const [imageSize, setImageSize] = useState(15);
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState("L");

  const handleQRCodeGenerated = (canvas) => {
    setQRCodeCanvas(canvas);
  };

  const handleDownload = () => {
    if (qrCodeCanvas) {
      const dataURL = qrCodeCanvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = dataURL;
      downloadLink.download = "qrcode.png";
      downloadLink.click();
    }
  };

  const handleTextChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleBgColorChange = (e) => {
    setBgColor(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleImageChange = (image) => {
    if (image !== null) imageToBase64(image);
    else setBase64Image("");
  };

  const imageToBase64 = (image) => {
    var reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      setBase64Image(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const handleImageSizeChange = (e) => {
    setImageSize(e.target.value);
  };

  const handleErrorCorrectionLevelChange = (e) => {
    setErrorCorrectionLevel(e.target.value);
  };

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setIsDarkmode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkmode(false);
    }
  }, []);

  return (
    <>
      <Head>
        <title>QR-Code Generator</title>
        <meta
          name="description"
          content="จริง ๆ คือทำมาทดสอบ darkmode 555555"
        />
        <meta
          name="google-site-verification"
          content="fTpcRTgchLEorR5mVUoQp8NUGiwU5Gl5Zm11Fu39ZmA"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center w-screen h-screen min-h-full mt-8 font-sans text-base transition-colors sm:mt-0 sm:justify-center zyxma__container isolate">
        <DarkmodeButton state={isDarkmode} setState={setIsDarkmode} />
        <CornerButton
          icon={<Github size={30} color="lightgray" />}
          url={"https://github.com/6MA-606/goqr-QRcode-Generator"}
          bg={"#555"}
        />
        <div className="my-1 text-4xl font-semibold transition-colors title isolate text-neutral-800 dark:text-neutral-50">
          QR-Code Generator
        </div>
        <div className="mb-6 transition-colors description isolate text-neutral-600 dark:text-neutral-400">
          Version {version} By&nbsp;
          <a
            className="no-underline hover:underline"
            href="https://github.com/6MA-606"
            target="_blank"
          >
            ZYXMA
          </a>
        </div>
        <div className="flex flex-col items-center w-8/12 gap-8 sm:justify-center sm:flex-row h-96">
          <div className="flex flex-col items-center justify-center flex-1">
            <QRCodeComponent
              text={text}
              color={color}
              bgColor={bgColor}
              size={size}
              image={{
                base64Image: base64Image,
                size: imageSize,
              }}
              errorCorrectionLevel={errorCorrectionLevel}
              isDarkmode={isDarkmode}
              onQRCodeGenerated={handleQRCodeGenerated}
            />
            <Button
              label="Download"
              id="qr-download"
              className="bg-orange-400 hover:bg-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={handleDownload}
              disabled={text.length === 0}
            />
          </div>
          <div className="flex items-center justify-center flex-1 w-full">
            <div className="flex flex-col">
              <TextBox
                id="qr-input"
                placeholder="Link or text here"
                onChange={handleTextChange}
              />
              <div className="flex justify-between">
                <ColorInput
                  label="Color"
                  id="qr-color"
                  value={color}
                  onChange={handleColorChange}
                />
                <ColorInput
                  label="Background Color"
                  id="qr-bgcolor"
                  value={bgColor}
                  onChange={handleBgColorChange}
                />
              </div>
              <FileInput
                label="Image"
                id="qr-image"
                onChange={handleImageChange}
              />
              <RangeInput
                label="Image Size"
                id="qr-imageSize"
                min={1}
                max={100}
                step={1}
                value={imageSize}
                unit={"%"}
                onChange={handleImageSizeChange}
                hidden={base64Image === ""}
              />
              <OptionInput
                label="Error Correction Level"
                id="qr-errorCorrectionLevel"
                options={[
                  { value: "L", label: "L" },
                  { value: "M", label: "M" },
                  { value: "Q", label: "Q" },
                  { value: "H", label: "H" },
                ]}
                onChange={handleErrorCorrectionLevelChange}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
