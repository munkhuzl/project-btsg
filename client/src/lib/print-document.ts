import { toast } from 'react-toastify';
import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf';

export function printDocument(id = 'print-area', fileName = 'чөлөө.pdf') {
    const input = document.getElementById(id);
    if (!input) return;

    const scale = 2;
    const width = input.offsetWidth * scale;
    const height = input.offsetHeight * scale;

    domtoimage
        .toPng(input, {
            width,
            height,
            style: {
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                width: `${input.offsetWidth}px`,
                height: `${input.offsetHeight}px`,
            },
            imagePlaceholder: 'pdf-image',
            cacheBust: true,
        })
        .then((dataUrl) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4',
                });

                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();

                const pxToMm = (px: number) => (px * 25.4) / 96;
                const imgWidthMm = pxToMm(img.width);
                const imgHeightMm = pxToMm(img.height);

                const scaleRatio = Math.min(pageWidth / imgWidthMm, pageHeight / imgHeightMm) * 0.9;
                const finalWidth = imgWidthMm * scaleRatio;
                const finalHeight = imgHeightMm * scaleRatio;

                const marginX = (pageWidth - finalWidth) / 2;
                const halfY = (pageHeight - finalHeight) / 2;
                const marginY = halfY !== 0 ? (halfY > marginX ? marginX : halfY) : 0;

                pdf.addImage(dataUrl, 'PNG', marginX, marginY, finalWidth, finalHeight);
                pdf.save(fileName);
                toast.success('PDF successfully downloaded');
            };

            img.src = dataUrl;
        })
        .catch((e) => {
            console.log(e);
            toast.error('PDF failed to download');
        });
}
