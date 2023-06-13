export const TruncateText = (props) => {
    const { text, maxLength, keepExtension } = props;
    var resultString = "";

    if (keepExtension) {
        var name = text.split(".")[0];
        var extension = text.split(".")[1];
        resultString = (name.length > maxLength) ? (name.slice(0, maxLength - 1) + "*" + "." + extension) : text;
    } else {
        resultString = (text.length > maxLength) ? (text.slice(0, maxLength - 3) + "...") : (text);
    }

    return <div title={text}>{resultString}</div>
};