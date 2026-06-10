import { toast } from "react-toastify";
import domtoimage from "dom-to-image";
import jsPDF from "jspdf";

export async function printDocument(
  id = "print-area",
  fileName = "чөлөө.pdf"
) {
  const input = document.getElementById(id);
  if (!input) return;

  try {
    // Rasterize the element at a higher pixel density than the screen so the
    // text stays sharp once it's scaled up to fill an A4 page. Without this the
    // DOM is captured at 1x (~screen width) and looks blurry in the PDF.
    const scale = 3;
    const width = input.offsetWidth;
    const height = input.offsetHeight;

    const dataUrl = await domtoimage.toPng(input, {
      quality: 1,
      cacheBust: true,
      bgcolor: "#ffffff",
      width: width * scale,
      height: height * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        width: `${width}px`,
        height: `${height}px`,
      },
    });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const img = new Image();
    img.src = dataUrl;

    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = img.width;
    const imgHeight = img.height;

    const ratio = Math.min(
      pageWidth / imgWidth,
      pageHeight / imgHeight
    );

    const finalWidth = imgWidth * ratio;
    const finalHeight = imgHeight * ratio;

    const marginX = (pageWidth - finalWidth) / 2;
    const marginY = (pageHeight - finalHeight) / 2;

    pdf.addImage(dataUrl, "PNG", marginX, marginY, finalWidth, finalHeight);
    pdf.save(fileName);

    toast.success("PDF амжилттай татагдлаа");
  } catch (error) {
    console.error(error);
    toast.error("PDF татахад алдаа гарлаа");
  }
}