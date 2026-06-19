import fs from "fs";
import path from "path";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  Font,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";

const assetsDir = path.join(process.cwd(), "src", "assets");
const fontsDir = path.join(assetsDir, "fonts");
const imagesDir = path.join(assetsDir, "images");

// Register a Cyrillic-capable font once (default PDF fonts lack Cyrillic glyphs).
Font.register({
  family: "NotoSans",
  fonts: [
    { src: path.join(fontsDir, "NotoSans-Regular.ttf"), fontWeight: "normal" },
    { src: path.join(fontsDir, "NotoSans-Bold.ttf"), fontWeight: "bold" },
  ],
});

// Read raster assets once into Buffers (signature converted from SVG to PNG).
const logo = { data: fs.readFileSync(path.join(imagesDir, "logo2.png")), format: "png" as const };
// Rasterized from tamga1.svg to a transparent PNG (the old .jpg was opaque and
// painted a white box over the document). @react-pdf Image only decodes raster.
const stamp = { data: fs.readFileSync(path.join(imagesDir, "tamga1.png")), format: "png" as const };
const signature = { data: fs.readFileSync(path.join(imagesDir, "lkham.png")), format: "png" as const };

export type LeaveSlipData = {
  firstname: string;
  lastname: string;
  startTime: string;
  endTime: string;
  templateName: string;
  detailText: string;
  number: string; // e.g. "03/589"
  dateStr: string; // e.g. "2026-06-01"
  fields: Array<{ label: string; value: string }>;
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "NotoSans",
    fontSize: 11,
    color: "#18181b",
    paddingVertical: 48,
    // 3cm gap on both sides (1cm ≈ 28.35pt → 3cm ≈ 85pt).
    paddingHorizontal: 85,
    lineHeight: 1.6,
  },
  header: { alignItems: "center", marginBottom: 24 },
  logo: { width: 70, height: 70, objectFit: "contain", marginBottom: 12 },
  title: {
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    textTransform: "uppercase",
    maxWidth: 420,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e4e4e7",
    fontSize: 10,
    color: "#71717a",
  },
  body: { textAlign: "justify", color: "#27272a", marginBottom: 12 },
  bold: { fontWeight: "bold" },
  fieldsBox: {
    marginVertical: 20,
    padding: 14,
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#f4f4f5",
    borderRadius: 8,
  },
  fieldsTitle: {
    fontSize: 9,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
    color: "#18181b",
  },
  fieldRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 10,
    color: "#3f3f46",
    marginBottom: 4,
  },
  // Mirrors the client leave-slip footer (leave-slip-preview.tsx): a narrow,
  // centered block (~74% width) with the role text on the left, the signature
  // and stamp overhanging to its right, and the signer name on the far right.
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    alignSelf: "center",
    width: "74%",
    marginTop: 28,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#e4e4e7",
  },
  signatureWrap: { position: "relative", width: 146, height: 80 },
  signatureRole: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    maxWidth: 146,
    lineHeight: 1.3,
  },
  signatureImg: { position: "absolute", top: 7, right: -53, width: 66, height: 33, objectFit: "contain" },
  stampImg: {
    position: "absolute",
    bottom: 13,
    right: -73,
    width: 93,
    height: 93,
    objectFit: "contain",
    opacity: 0.8,
    transform: "rotate(6deg)",
  },
  signerName: { fontSize: 10, fontWeight: "bold", marginBottom: 40, marginLeft: 26, textAlign: "right" },
});

export const generateLeaveSlipPdf = async (data: LeaveSlipData): Promise<Buffer> => {
  const doc = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {/* eslint-disable-next-line jsx-a11y/alt-text -- @react-pdf/renderer Image has no alt prop */}
          <Image style={styles.logo} src={logo} />
          <Text style={styles.title}>
            БИЕИЙН ТАМИР, СПОРТЫН ГАЗАР ТЭМЦЭЭН, УРАЛДААНД ОРОЛЦОХ ЧӨЛӨӨЛӨХ ХУУДАС
          </Text>
          <View style={styles.metaRow}>
            <Text>Огноо: {data.dateStr}</Text>
            <Text>Дугаар: {data.number}</Text>
            <Text>Баян-Өндөр сум</Text>
          </View>
        </View>

        <Text style={styles.body}>
          Үндсэн заалтуудыг үндэслэн ажилтан/суралцагч <Text style={styles.bold}>{data.lastname}</Text> овогтой{" "}
          <Text style={styles.bold}>{data.firstname}</Text> нь <Text style={styles.bold}>{data.startTime}</Text>-ны
          өдрөөс <Text style={styles.bold}>{data.endTime}</Text>-ны өдрийг хүртэлх хугацаанд{" "}
          <Text style={styles.bold}>{data.templateName}</Text> ({data.detailText}) шалтгаанаар чөлөөлөгдөх зөвшөөрөл
          олгогдсон тул ажил (хичээл)-ээс нь чөлөөлж, дэмжин ажиллана уу.
        </Text>

        {data.fields.length > 0 && (
          <View style={styles.fieldsBox}>
            <Text style={styles.fieldsTitle}>Хүсэлтийн нэмэлтүүд</Text>
            {data.fields.map((f, i) => (
              <View key={i} style={styles.fieldRow}>
                <Text style={styles.bold}>{f.label}:</Text>
                <Text>{f.value}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.footer}>
          <View style={styles.signatureWrap}>
            <Text style={styles.signatureRole}>
              Биеийн тамир, спортын газрын даргын үүрэг гүйцэтгэгч
            </Text>
            {/* eslint-disable-next-line jsx-a11y/alt-text -- @react-pdf/renderer Image has no alt prop */}
            <Image style={styles.signatureImg} src={signature} />
            {/* eslint-disable-next-line jsx-a11y/alt-text -- @react-pdf/renderer Image has no alt prop */}
            <Image style={styles.stampImg} src={stamp} />
          </View>
          <Text style={styles.signerName}>Э.ЛХАМСҮРЭНБААТАР</Text>
        </View>
      </Page>
    </Document>
  );

  return renderToBuffer(doc);
};
