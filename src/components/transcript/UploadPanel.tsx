"use client";

import { Camera, FileUp, LoaderCircle } from "lucide-react";
import { useRef, useState } from "react";
import { primaryButtonClass, secondaryButtonClass } from "@/components/ui/styles";

type Phase = "idle" | "selected" | "running" | "done";

const sampleRows = [
  { course: "MAT101 Kalkülüs I", match: "MAT 101 Analiz I", status: "Yüksek benzerlik", score: "96%" },
  { course: "FIZ102 Fizik II", match: "FIZ 201 Genel Fizik II", status: "Yüksek benzerlik", score: "91%" },
  { course: "ING102 Akademik İngilizce", match: "İncelenecek", status: "Elle kontrol", score: "64%" },
];

export function UploadPanel() {
  const pdfInput = useRef<HTMLInputElement>(null);
  const cameraInput = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");

  function selectFile(file: File | undefined) {
    if (!file) return;
    setFileName(file.name);
    setPhase("selected");
  }

  async function startPreview() {
    setPhase("running");
    await new Promise((resolve) => setTimeout(resolve, 700));
    setPhase("done");
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="rounded-3xl border border-dashed border-indigo-200 bg-white p-8 text-center shadow-sm">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700">
          <FileUp className="h-5 w-5" aria-hidden="true" />
        </span>
        <h2 className="mt-4 text-lg font-semibold text-slate-950">Transkript ekleyin</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
          PDF yükleyin veya kamera ile tarayın. Bu ekran dosyayı tarayıcıda tutar;
          optik karakter tanıma ve model eşleştirmesi sonraki aşamada bağlanacak.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" className={primaryButtonClass} onClick={() => pdfInput.current?.click()}>
            <FileUp className="h-4 w-4" aria-hidden="true" />
            PDF Yükle
          </button>
          <button type="button" className={secondaryButtonClass} onClick={() => cameraInput.current?.click()}>
            <Camera className="h-4 w-4" aria-hidden="true" />
            Kamera ile Tara
          </button>
        </div>
        <input
          ref={pdfInput}
          type="file"
          accept="application/pdf,image/*"
          className="hidden"
          onChange={(event) => selectFile(event.target.files?.[0])}
        />
        <input
          ref={cameraInput}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(event) => selectFile(event.target.files?.[0])}
        />
        {fileName ? (
          <p className="mt-4 text-sm font-medium text-slate-800">Seçilen dosya: {fileName}</p>
        ) : null}
      </div>

      {phase === "selected" || phase === "running" ? (
        <button
          type="button"
          className={`${primaryButtonClass} mt-4 w-full`}
          onClick={startPreview}
          disabled={phase === "running"}
        >
          {phase === "running" ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
              Ön değerlendirme hazırlanıyor
            </>
          ) : (
            "Ön Değerlendirmeyi Başlat"
          )}
        </button>
      ) : null}

      {phase === "done" ? (
        <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="text-base font-semibold text-slate-950">Örnek ön değerlendirme raporu</h2>
            <p className="mt-1 text-sm text-slate-500">
              {fileName} için gösterilen eşleşmeler statik örnek veridir.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead className="bg-slate-50 text-xs tracking-wide text-slate-500 uppercase">
                <tr>
                  <th className="px-5 py-3 font-medium">Kaynak ders</th>
                  <th className="px-5 py-3 font-medium">Öneri</th>
                  <th className="px-5 py-3 font-medium">Durum</th>
                  <th className="px-5 py-3 font-medium">Skor</th>
                </tr>
              </thead>
              <tbody>
                {sampleRows.map((row) => (
                  <tr key={row.course} className="border-t border-slate-100">
                    <td className="px-5 py-3 font-medium text-slate-900">{row.course}</td>
                    <td className="px-5 py-3 text-slate-600">{row.match}</td>
                    <td className="px-5 py-3 text-slate-600">{row.status}</td>
                    <td className="px-5 py-3 font-semibold text-indigo-700">{row.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </div>
  );
}
