/* eslint-disable jsx-a11y/alt-text */
import { Page, Text, View, Document, Font, Image } from "@react-pdf/renderer";
import styles from "./pdfCertificate/pdfStyle";

type PdfCertificateProps = {
  name: string;
  type: string;
  code: string;
  subtype?: string;
};

export default function PdfCertificate({
  name,
  type,
  subtype,
  code,
}: PdfCertificateProps) {
  return (
    <Document
      title={`${
        type === "confops25" ? "ConfOps LATAM 2025" : "WS LATAM 2025"
      }   - ${name}`}
    >
      <Page size={{ width: 1920, height: 1080 }}>
        <View
          style={[
            styles.certificateContainer,
            { color: type === "confops25" ? "#111319" : "#FFFCEC" },
          ]}
        >
          {type === "confops25" ? (
            <Image
              src={`${process.env.SUPABASEURL}/storage/v1/object/public/images/certificate_confops25.png`}
              style={styles.certificateBackground}
            />
          ) : (
            <Image
              src={`${process.env.SUPABASEURL}/storage/v1/object/public/images/certificate_ws25.png`}
              style={styles.certificateBackground}
            />
          )}
          <Text
            style={[
              styles.title,
              { color: type === "confops25" ? "#111319" : "#FF64C1" },
            ]}
          >
            CERTIFICADO DE PARTICIPACIÓN
          </Text>

          <Text style={styles.regularText}>
            por medio del presente reconocemos que
          </Text>

          <Text style={styles.participantName}>{name}</Text>

          {type === "confops25" ? (
            <Text style={styles.description}>
              Asistió a la ConfOps 25, la conferencia de DesignOps Latam,
              realizada los días 6, 7, 8 y 9 de Octubre de 2025, un espacio que
              contó con más de 20 charlas presentadas por expertos en la
              práctica.
            </Text>
          ) : (
            <Text style={styles.description}>
              Asistió al taller práctico &ldquo;{subtype}&rdquo;, realizado el 9
              de Octubre de 2025.
            </Text>
          )}

          <Text style={styles.code}>{code}</Text>
        </View>
      </Page>
    </Document>
  );
}

Font.register({
  family: "Altone",
  fonts: [
    {
      src: `${process.env.SUPABASEURL}/storage/v1/object/public/fonts/Altone/Altone-Bold.ttf`,
      fontWeight: 700,
    },
    {
      src: `${process.env.SUPABASEURL}/storage/v1/object/public/fonts/Altone/Altone-Medium.ttf`,
      fontWeight: 500,
    },
    {
      src: `${process.env.SUPABASEURL}/storage/v1/object/public/fonts/Altone/Altone-Regular.ttf`,
      fontWeight: 300,
    },
  ],
});
