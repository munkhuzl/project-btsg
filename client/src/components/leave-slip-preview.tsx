/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";

// The leave slip is a formal, A4-style document. We render it at a FIXED width
// on every device so its layout (and therefore the downloaded PDF) is always
// the complete document — identical on desktop and mobile. On narrow screens we
// only scale the *preview* down to fit; the printable node (`printId`) keeps its
// full size, so dom-to-image always captures the whole thing, never a clipped
// half. See printDocument in lib/print-document.ts.
const SLIP_WIDTH = 720;

type LeaveSlipReq = {
  firstname: string;
  lastname: string;
  startTime: string;
  endTime: string;
  requestNumber?: number | null;
};

export function LeaveSlipPreview({
  req,
  templateName,
  detailText,
  printId,
}: {
  req: LeaveSlipReq;
  templateName: string;
  detailText: string;
  printId: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const slipRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [scaledHeight, setScaledHeight] = useState<number | undefined>(
    undefined,
  );

  useEffect(() => {
    const update = () => {
      const container = containerRef.current;
      const slip = slipRef.current;
      if (!container || !slip) return;
      // Fit the fixed-width slip into whatever width the dialog gives us, but
      // never scale it up past 1 (desktop shows it at full size).
      const next = Math.min(1, container.clientWidth / SLIP_WIDTH);
      setScale(next);
      // Collapse the leftover space the un-scaled element would otherwise
      // reserve (transform doesn't affect layout box) so there's no big gap.
      setScaledHeight(slip.offsetHeight * next);
    };

    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    if (slipRef.current) ro.observe(slipRef.current); // re-measure once images load
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <div style={{ height: scaledHeight }}>
        <div
          className="mx-auto"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: SLIP_WIDTH,
          }}
        >
          <div
            ref={slipRef}
            id={printId}
            style={{ width: SLIP_WIDTH }}
            className="bg-white py-8 px-[103px] text-[13px] text-zinc-950 leading-relaxed border border-zinc-100 rounded-xl"
          >
            <div className="text-center mb-6">
              <img
                src="/logo2.png"
                alt="logo"
                width={80}
                className="mx-auto"
              />
              <h1 className="font-bold text-sm text-zinc-950 mt-4 max-w-md mx-auto uppercase">
                БИЕИЙН ТАМИР, СПОРТЫН ГАЗАР ТЭМЦЭЭН, УРАЛДААНД ОРОЛЦОХ ТАМИРЧИН
                (ДАСГАЛЖУУЛӨГЧ)-ЫГ ЧӨЛӨӨЛҮҮЛЭХ ХУУДАС
              </h1>
              <div className="flex justify-between mt-6 text-[11px] text-zinc-500 border-b border-zinc-100 pb-2">
                <p>Огноо: {new Date().toLocaleDateString("mn-MN")}</p>
                <p>
                  Дугаар:{" "}
                  {req.requestNumber ? `03/${req.requestNumber + 579}` : ""}
                </p>
                <p>Баян-Өндөр сум</p>
              </div>
            </div>

            <p className="text-justify indent-8 text-zinc-800 mb-4 leading-relaxed">
              Эрүүл мэндийн сайд, Сангийн сайдын хамтарсан 2009 оны 53/45 дугаар
              тушаалын нэгдүгээр хавсралтаар батлагдан журмын 4.2, 4.3 дахь
              заалтыг үндэслэн ажилтай/сурагч <strong>{req.lastname}</strong>{" "}
              овогтой <strong>{req.firstname}</strong>
              нь <strong>{req.startTime}</strong>-ны өдрөөс{" "}
              <strong>{req.endTime}</strong>-ны өдрийг хүртэлх хугацаанд{" "}
              <strong>{templateName}</strong> ({detailText}) оролцох тул
              ажил(хичээл)-ээс нь чөлөөлж, хамтран ажиллана уу.
            </p>
            <p className="text-justify indent-8 text-zinc-800 mb-4 leading-relaxed">
              Мөн тус тушаалын 3.2 дахь заалтад "Ажлаас чөлөөлөгдсөн хугацааны
              цалинг өмчийн хэлбэр харгалзахгүйгээр үндсэн байгууллагааас нь
              олгоно" гэж заасан тул тамирчин (дамгалжуулагч)-ны чөлөөтэй
              хугацааны цалинг шийдвэрлэж хамтран ажиллахыг хүсье.
            </p>

            <div className="flex mt-8 justify-between border-t border-zinc-100 pt-6">
              <div className="relative w-44 h-24">
                <h4 className="text-xs font-semibold text-zinc-950 uppercase leading-snug">
                  Биеийн тамир, спортын газрын даргын үүрэг гүйцэтгэгч
                </h4>
                <img
                  src="/tamga1.svg"
                  alt="tamga"
                  className="absolute -bottom-0 -right-6 w-28 h-28 opacity-80 mix-blend-multiply rotate-6"
                />
                <img
                  src="/lkham.svg"
                  alt="signature"
                  className="absolute top-2 right-2 w-20 h-10 object-contain"
                />
              </div>
              <div className="text-right text-xs font-semibold text-zinc-950 self-end mb-12">
                Э.ЛХАМСҮРЭНБААТАР
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
