// function convertToEmoji(countryCode) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());

//   return String.fromCodePoint(...codePoints);
// }
const convertToEmoji = (c) =>
  c.replace(/./g, (ch) =>
    String.fromCodePoint(0x1f1a5 + ch.toUpperCase().charCodeAt())
  );

export default convertToEmoji;
