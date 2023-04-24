import Head from "next/head";
import { useEffect, useState } from "react";
import { ColorInput, TextBox, TextInput } from "@/components/Input/Input";
import $ from "jquery";
import Darkmode from "darkmode-js";
import convert from "color-convert";
import { CornerButton, DarkmodeButton } from "@/components/Button/Button";

export default function Home() {

  const options = {
    //bottom: '32px', // default: '32px'
    //right: 'unset', // default: '32px'
    //left: '32px', // default: 'unset'
    time: '0.5s', // default: '0.3s'
    //mixColor: '#ccc', // default: '#fff'
    //backgroundColor: '#fff',  // default: '#fff'
    //buttonColorDark: '#2c2c33',  // default: '#100f2c'
    //buttonColorLight: '#fff', // default: '#fff'
    saveInCookies: false, // default: true,
    //label: '🌓', // default: ''
    autoMatchOsTheme: true // default: true
  }

  const darkmode = new Darkmode(options);

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

  return (
    <>
      <Head>
        <title>QR-Code Generator</title>
        <meta name="description" content="จริง ๆ คือทำมาทดสอบ darkmode 555555" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <DarkmodeButton darkmode={darkmode} />
        <CornerButton />
        <div className="title">QR-Code Generator</div>
        <div className="description">
          Version 1.0.2 By <a href="https://github.com/6MA-606" target="_blank">ZYXMA</a>
        </div>
        <img
          id="qr-image"
          src={imgUrl}
          alt="QRcode must generate here."
          // style={{ display: "none" }}
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
