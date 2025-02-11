"usec client";


import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const CreateNewRequest = () => {
  return (
    <div className="text-[#000000] text-sm max-w-[680px] mx-auto bg-white mt-12 h-full p-8 rounded-md">
      <div className="font-bold pt-4 text-2xl">Чөлөөний хүсэлт</div>
      <span className="text-[#EF4430]">
        Хамгийн богинодоо нэг өдрийн чөлөө авах боломжтой.
      </span>
      <div className="mt-4 flex ">
        <div className="flex-1 pr-3">
          <Label className="py-2">Эхлэх өдөр</Label>
          <Input placeholder="calendar " />
        </div>
        <div className="flex-1">
          <Label>Дуусах өдөр</Label>
          <Input placeholder="calendar" />
        </div>
      </div>
      <div className="mt-6 mb-2">Тэмцээний албан ёсны удирдамж</div>
      <Input type="file" className="file-input" placeholder="Жишээ нь: Буудлага спортын насанд хүрэгчдийн УАШТ" />
      <div className="mt-6 mb-2">
        Тэмцээний мэдүүлэг (заавал) хавсаргах
        <Input type="file" className="file-input w-full max-w-xs mt-2" />
       </div>
       <Button className="w-full mt-4">Хүсэлт илгээх</Button>
    </div>

  );
};
export default CreateNewRequest;
