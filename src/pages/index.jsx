import Head from "next/head";
import { useEffect, useState } from "react";
import { ColorInput, TextBox, TextInput } from "@/components/Input/Input";
import $ from "jquery";
import Darkmode from "darkmode-js";
import convert from "color-convert";
import { CornerButton, DarkmodeButton } from "@/components/Button/Button";
import { Helmet } from "react-helmet";
import { Github } from "react-bootstrap-icons";

export default function Home() {

  const options = {
    autoMatchOsTheme: true // default: true
  }

  const darkmode = new Darkmode(options);

  const [darkmodeIsActivated, setDarkmodeIsActivated] = useState("false");
  const [imgUrl, setImgUrl] = useState("/img/default/qr-placeholder.png");
  const [downloadUrl, setDownloadUrl] = useState("#");

  const hexToRGB = hex => {
    let [ red, green, blue ] = convert.hex.rgb(hex.split("#")[1]);
    return red + "-" + green + "-" + blue;
  }

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
    let colorInput = $(".qr-color");
    let bgcolorInput = $(".qr-bgcolor");
    let button = $("#qr-submit");
    let download = $("#qr-download");
    let qrImage = $("#qr-image");

    parametersJson.data = input.val() || "";

    const convertColor = color => {
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
    }

    parametersJson.qrColor = convertColor(colorInput.val());
    parametersJson.backgroundColor = convertColor(bgcolorInput.val());

    if (parametersJson.data !== "") {
      parameters = `size=${parametersJson.size}&bgcolor=${parametersJson.backgroundColor}&color=${parametersJson.qrColor}&qzone=${parametersJson.padding}&data=${parametersJson.data}`; // Stitch Together all Paramenters
      button.text("Re-generate");
      download.show();
      setDownloadUrl(
        `https://api.qrserver.com/v1/create-qr-code/?${parameters}&download=1`
      );
      qrImage.show();
      setImgUrl(`https://api.qrserver.com/v1/create-qr-code/?${parameters}`);
    } else {
      button.text("Generate");
      setDownloadUrl("#");
      download.hide();
      setImgUrl("/img/default/qr-placeholder.png");
    }
  }

  useEffect(() => {
    setDarkmodeIsActivated(localStorage.getItem("darkmode"));
  }, [])

  return (
    <>
      <Helmet>
        <title>QR-Code Generator</title>
        <meta name="description" content="จริง ๆ คือทำมาทดสอบ darkmode 555555" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <body className={ darkmodeIsActivated == "true" ? 'darkmode--activated' : ''} />
      </Helmet>
      <main className="container">
        <DarkmodeButton
          darkmode={darkmode}
          isActivated={darkmodeIsActivated}
        />
        <CornerButton icon={<Github size={30} color="lightgray" />} url="https://github.com/6MA-606/goqr-QRcode-Generator" />
        <div className="title">QR-Code Generator</div>
        <div className="description">
          Version 1.0.2.1 By <a href="https://github.com/6MA-606" target="_blank">ZYXMA</a>
        </div>
        <img
          id="qr-image"
          src={imgUrl}
          alt="QRcode must generate here."
          className="qr-image"
          onClick={() => {window.open(downloadUrl, "_self")}}
        />
        <TextBox
          id="qr-input"
          placeholder="Link or text here"
        />
        <ColorInput
          label="Color"
          className="qr-color"
          id="qr-color"
          base="#000000"
        />
        <ColorInput
          label="Background Color"
          className="qr-bgcolor"
          id="qr-bgcolor"
          base="#ffffff"
        />
        <div className="bthGroup">
          <button className="submitBtn" id="qr-submit" onClick={qrRequest}>
            Generate
          </button>
          <button className="downloadBtn" id="qr-download" onClick={() => {window.open(downloadUrl, "_self")}} style={{ display: "none" }}>
            Download
          </button>
        </div>
      </main>
    </>
  );
}