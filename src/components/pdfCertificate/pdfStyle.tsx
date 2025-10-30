import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  certificateContainer: {
    display: "flex",
    width: "1920px",
    height: "1050px",
  },
  certificateBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "1920px",
    height: "1080px",
    objectFit: "cover",
    zIndex: -999,
  },
  title: {
    fontSize: "37px",
    lineHeight: "37px",
    weight: "black",
    position: "absolute",
    top: "203px",
    left: "176px",
    textAlign: "left",
    fontFamily: "Altone",
    fontWeight: 700,
  },

  regularText: {
    fontSize: "28px",
    lineHeight: "35px",
    position: "absolute",
    top: "267px",
    left: "176px",
    fontFamily: "Altone",
    fontWeight: 500,
  },

  participantName: {
    position: "absolute",
    top: "340px",
    left: "176px",
    width: "1200px",
    fontFamily: "Altone",
    fontWeight: 300,
    fontSize: "140px",
  },

  description: {
    width: "1131px",
    fontSize: "33px",
    position: "absolute",
    top: "525px",
    left: "176px",
    lineHeight: "40px",
    fontFamily: "Altone",
    fontWeight: 300,
  },
  code: {
    fontSize: "24px",
    position: "absolute",
    top: "976px",
    left: "176px",
    fontFamily: "Altone",
    fontWeight: 300,
  },
});

export default styles;
