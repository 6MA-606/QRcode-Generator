import { useEffect, useState } from "react";
import { ColorInput, TextBox } from "@/components/Input";
import $ from "jquery";
import convert from "color-convert";
import { Button, CornerButton, DarkmodeButton } from "@/components/Button";
import { Github } from "react-bootstrap-icons";
import QrCodeBox from "@/components/QrCodeBox";
import Head from "next/head";

export default function Home() {
  const version = "1.0.4.3";
  const [isDarkmode, setIsDarkmode] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState("#");
  const [disabledDownload, setDisabledDownload] = useState(true);

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      setIsDarkmode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkmode(false);
    }
    setImgUrl(null);
  }, []);

  const hexToRGB = (hex) => {
    let [red, green, blue] = convert.hex.rgb(hex.split("#")[1]);
    return red + "-" + green + "-" + blue;
  };

  const qrRequest = () => {
    let parametersJson = {
      size: 250,
      backgroundColor: "255-255-255",
      qrColor: "00-00-00",
      padding: 2,
      data: "dev.to",
      download: 1,
    };

    let parameters;
    let input = $("#qr-input");
    let colorValue = $("#qr-colorInput");
    let bgcolorValue = $("#qr-bgcolorInput");
    let button = $("#qr-submit");
    let download = $("#qr-download");

    parametersJson.data = input.val() || "";

    const convertColor = (color) => {
      if (color === "") {
        color = "#000000";
      } else if (color[0] !== "#") {
        color = "#" + convert.keyword.hex(color.toLowerCase());
      } else if (color.length === 4) {
        color = "#" + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
      } else if (color.length === 7) {
        color = "#" + color[1] + color[2] + color[3] + color[4] + color[5] + color[6];
      } else {
        color = "#000000";
      }
      return hexToRGB(color);
    };

    parametersJson.qrColor = convertColor(colorValue.val());
    parametersJson.backgroundColor = convertColor(bgcolorValue.val());

    if (parametersJson.data !== "") {
      parameters = `size=${parametersJson.size}&bgcolor=${parametersJson.backgroundColor}&color=${parametersJson.qrColor}&qzone=${parametersJson.padding}&data=${parametersJson.data}`; // Stitch Together all Paramenters
      button.text("Re-generate");
      download.show();
      setDownloadUrl(
        `https://api.qrserver.com/v1/create-qr-code/?${parameters}&download=1`
      );
      setDisabledDownload(false);
      setImgUrl(`https://api.qrserver.com/v1/create-qr-code/?${parameters}`);
    } else {
      button.text("Generate");
      download.hide();
      setImgUrl(null);
      setDisabledDownload(true);
    }
  };

  return (
    <>
      <Head>
        <title>QR-Code Generator</title>
        <meta
          name="description"
          content="จริง ๆ คือทำมาทดสอบ darkmode 555555"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <main className="flex flex-col items-center justify-center w-screen h-screen min-h-full font-sans text-base transition-colors zyxma__container isolate bg-neutral-50 dark:bg-neutral-800 ">
        <DarkmodeButton
          state={isDarkmode}
          setState={setIsDarkmode}
        />
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
        <QrCodeBox
          url={imgUrl} 
          disabled={disabledDownload}
          isDarkmode={isDarkmode}
        />
        <TextBox
          id="qr-input"
          placeholder="Link or text here" 
        />
        <ColorInput
          label="Color"
          id="qr-color"
          base="#000000"
        />
        <ColorInput
          label="Background Color"
          id="qr-bgcolor"
          base="#ffffff"
        />
        <div className="flex my-2">
          <Button
            label="Generate"
            id="qr-submit"
            className="bg-orange-400 hover:bg-orange-500"
            onClick={qrRequest}
          />
          <Button
            label="Download"
            id="qr-download"
            className="bg-gray-500 hover:bg-gray-600"
            onClick={() => {
              window.open(downloadUrl, "_self");
            }}
            style={{ display: "none" }}
          />
        </div>
      </main>
    </>
  );
}
