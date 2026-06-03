"use client";
import { useState } from "react";
import { useGetRequestTypeTemplatesQuery, useCreateRequestTypeMutation, useDeleteRequestTypeMutation } from "@/generated";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Plus, Trash2, Layout, FormInput, FileSpreadsheet, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

interface LocalField {
  id: string;
  label: string;
  type: "text" | "number" | "date" | "file" | "textarea";
  required: boolean;
}

export function TemplateBuilder() {
  const { data, loading: loadingQuery, refetch } = useGetRequestTypeTemplatesQuery();
  const [createRequestType, { loading: creating }] = useCreateRequestTypeMutation();
  const [deleteRequestType] = useDeleteRequestTypeMutation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState<LocalField[]>([
    { id: "reason_detail", label: "Чөлөө авах шалтгаан", type: "textarea", required: true }
  ]);

  const templates = data?.getRequestTypeTemplates || [];

  const handleAddField = () => {
    const randomId = "field_" + Math.random().toString(36).substr(2, 9);
    setFields(prev => [
      ...prev,
      { id: randomId, label: "", type: "text", required: false }
    ]);
  };

  const handleFieldChange = (index: number, key: keyof LocalField, value: string | boolean) => {
    setFields(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: value };

      // Auto-generate safe database ID from label if it's the label changing
      if (key === "label") {
        const safeId = value
          .toString()
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "_")
          .replace(/_+/g, "_")
          .substring(0, 30);
        updated[index].id = safeId || "field_" + index;
      }

      return updated;
    });
  };

  const handleRemoveField = (index: number) => {
    setFields(prev => prev.filter((_, i) => i !== index));
  };

  const handleCreateTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.warning("Формын нэрийг оруулна уу");
      return;
    }

    const invalidField = fields.find(f => !f.label.trim());
    if (invalidField) {
      toast.warning("Бүх талбарын нэрийг (Label) оруулна уу");
      return;
    }

    try {
      await createRequestType({
        variables: {
          input: {
            name,
            description,
            fields: fields.map(f => ({
              id: f.id,
              label: f.label,
              type: f.type,
              required: f.required,
            }))
          }
        }
      });
      toast.success("Шинэ форм амжилттай үүсгэлээ");
      setName("");
      setDescription("");
      setFields([{ id: "reason_detail", label: "Чөлөө авах шалтгаан", type: "textarea", required: true }]);
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Форм үүсгэхэд алдаа гарлаа");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Энэ формыг устгахдаа итгэлтэй байна уу? Үүнтэй холбоотой хүсэлтүүдэд нөлөөлөх магадлалтай.")) return;

    try {
      await deleteRequestType({
        variables: { id },
      });
      toast.success("Форм устгагдлаа");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Устгахад алдаа гарлаа");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Form Creator */}
      <div className="lg:col-span-7 bg-white border border-zinc-150 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2 mb-6">
          <FormInput className="size-5 text-zinc-900" /> Шинэ форм зохиох
        </h2>

        <form onSubmit={handleCreateTemplate} className="space-y-6">
          <div>
            <Label className="text-zinc-700 font-medium">Чөлөөний төрлийн нэр</Label>
            <Input
              className="mt-1.5 h-11 rounded-xl"
              placeholder="Жишээ нь: Тэмцээний чөлөө, Өвчтэй чөлөө"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label className="text-zinc-700 font-medium">Тайлбар (Заавал биш)</Label>
            <Input
              className="mt-1.5 h-11 rounded-xl"
              placeholder="Жишээ нь: Тамирчдыг уралдаан тэмцээнд оролцоход ашиглах форм"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="border-t border-zinc-100 pt-6">
            <div className="flex items-center justify-between mb-4">
              <Label className="text-sm font-semibold uppercase tracking-wider text-zinc-650">Формын талбарууд</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddField}
                className="rounded-lg text-xs flex items-center gap-1 py-1 px-2.5 h-8 border-zinc-200"
              >
                <Plus className="size-3.5" /> Талбар нэмэх
              </Button>
            </div>

            <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
              {fields.map((field, idx) => (
                <div key={field.id} className="bg-zinc-50 border border-zinc-150 rounded-xl p-4 flex flex-col gap-3 relative">
                  <button
                    type="button"
                    onClick={() => handleRemoveField(idx)}
                    className="absolute top-3 right-3 text-zinc-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </button>

                  <div className="grid grid-cols-12 gap-3 pr-6">
                    <div className="col-span-7">
                      <Label className="text-xs text-zinc-500 font-medium">Талбарын нэр (Label)</Label>
                      <Input
                        className="mt-1 h-9 rounded-lg text-xs"
                        placeholder="Жишээ нь: Тэмцээний нэр, Албан ёсны файл"
                        value={field.label}
                        onChange={(e) => handleFieldChange(idx, "label", e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-span-5">
                      <Label className="text-xs text-zinc-500 font-medium">Төрөл (Type)</Label>
                      <select
                        className="mt-1 block w-full h-9 rounded-lg border border-zinc-200 bg-white px-2.5 text-xs text-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950 transition-all"
                        value={field.type}
                        onChange={(e) => handleFieldChange(idx, "type", e.target.value)}
                      >
                        <option value="text">Текст (Богино)</option>
                        <option value="textarea">Текст (Урт)</option>
                        <option value="number">Тоо</option>
                        <option value="date">Огноо</option>
                        <option value="file">Файл хавсралт</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 select-none">
                    <input
                      type="checkbox"
                      id={`req-${field.id}`}
                      checked={field.required}
                      onChange={(e) => handleFieldChange(idx, "required", e.target.checked)}
                      className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 size-3.5 cursor-pointer"
                    />
                    <label htmlFor={`req-${field.id}`} className="text-xs text-zinc-650 cursor-pointer font-medium">
                      Заавал бөглөх талбар
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl h-11 flex items-center justify-center gap-1.5"
            disabled={creating}
          >
            {creating ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Үүсгэж байна...
              </>
            ) : (
              "Форм үүсгэх"
            )}
          </Button>
        </form>
      </div>

      {/* Existing Templates */}
      <div className="lg:col-span-5 bg-white border border-zinc-150 rounded-2xl p-6 shadow-sm flex flex-col">
        <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2 mb-6">
          <Layout className="size-5 text-zinc-900" /> Идэвхтэй чөлөөний төрлүүд
        </h2>

        {loadingQuery ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="h-16 bg-zinc-50 animate-pulse border border-zinc-100 rounded-xl" />
            ))}
          </div>
        ) : templates.length === 0 ? (
          <div className="flex-1 flex flex-col justify-center items-center py-12 text-center bg-zinc-50/50 rounded-xl border border-dashed border-zinc-200">
            <FileSpreadsheet className="size-8 text-zinc-300 mb-2" />
            <p className="text-zinc-500 text-xs">Үүсгэсэн чөлөөний форм байхгүй байна.</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
            {templates.map((template) => (
              <div
                key={template._id}
                className="border border-zinc-150 rounded-xl p-4 flex items-start justify-between gap-3 hover:bg-zinc-50/30 transition-colors"
              >
                <div>
                  <h3 className="font-semibold text-zinc-900 text-sm">{template.name}</h3>
                  {template.description && (
                    <p className="text-xs text-zinc-500 mt-0.5">{template.description}</p>
                  )}
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    <span className="text-[10px] font-medium bg-zinc-100 text-zinc-650 px-2 py-0.5 rounded-md">
                      {template.fields.length} талбартай
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(template._id)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
