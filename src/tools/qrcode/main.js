import tools from '../tools.module.css';
import $ from 'jquery';
import ColorInput from '../../components/colorInput';
import TextInput from '../../components/textInput';
import { useState } from 'react';

function QRCode() {

    const [imgUrl,setImgUrl] = useState('./img/default/qr-placeholder.png');
    const [downloadUrl,setDownloadUrl] = useState('./img/default/qr-placeholder.png');

    const [buttonStyle,setButtonStyle] = useState(tools.successBtn);

    const hexToDecimal = hex => parseInt(hex, 16);

    function hexToRGB(hex) {

        let red, green, blue;

        red = hexToDecimal(hex[1] + '' + hex[2]);
        green = hexToDecimal(hex[3] + '' + hex[4]);
        blue = hexToDecimal(hex[5] + '' + hex[6]);
        return red + '-' + green + '-' + blue;

    }

    function qrRequest() {

        let parametersJson = {
            "size": 250,
            "backgroundColor": "255-255-255",
            "qrColor": "00-00-00",
            "padding": 2,
            "data": "dev.to",
            "download": 1
        };
    
        let parameters;
        
        let input = $('#qr-input');
        let colorInput = $('.qr-color');
        let bgcolorInput = $('.qr-bgcolor');
        let button = $('#qr-submit');
        let download = $('#qr-download');
        
        parametersJson.data = input.val() || '';

        parametersJson.qrColor = hexToRGB(colorInput.val());
        parametersJson.backgroundColor = hexToRGB(bgcolorInput.val());
        
        if (parametersJson.data !== '') {

            parameters = `size=${parametersJson.size}&bgcolor=${parametersJson.backgroundColor}&color=${parametersJson.qrColor}&qzone=${parametersJson.padding}&data=${parametersJson.data}`; // Stitch Together all Paramenters
            button.text('Re-generate');
            setButtonStyle(tools.warningBtn);
            download.show();
            setDownloadUrl(`https://api.qrserver.com/v1/create-qr-code/?${parameters}&download=1`);
            setImgUrl(`https://api.qrserver.com/v1/create-qr-code/?${parameters}`);

        } else {

            button.text('Generate');
            setButtonStyle(tools.successBtn);
            download.hide();
            setImgUrl('./img/default/qr-placeholder.png');

        }

    }

    return (
        <div id="QRCode" style={{ padding: '1vw' }}>
            <div className={ tools.toolbox }>
                <div className={ tools.toping }>
                    <TextInput id="qr-input" placeholder="Link or text here" />
                    <ColorInput label="Color: " className="qr-color" id="qr-color" base="#000000" />
                    <ColorInput label="Background Color: " className="qr-bgcolor" id="qr-bgcolor" base="#ffffff" />
                    <button id="qr-submit" onClick={ qrRequest } className={ buttonStyle }>Generate</button>
                    &nbsp;<a href={ downloadUrl } target="_blank" rel="noreferrer" id="qr-download" className={ tools.downloadBtn } style={{display: "none"}}><em className="fa fa-download"></em> Download</a>        
                </div>
                <br />
                <img id="qr-image" className={ tools.qrImage } src={ imgUrl } alt="QRcode must generate here."></img>
            </div>
        </div>
    );
}

export default QRCode;