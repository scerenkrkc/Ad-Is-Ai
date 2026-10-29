import type { Metadata } from "next";
import { Scale, ScanText, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Hakkımızda",
};

const points = [
  {
    title: "Ne işe yarar?",
    text: "Yatay geçiş, dikey geçiş ve çift anadal başvurularında alınan derslerin hedef programla karşılaştırılmasına yardımcı olur.",
    icon: Scale,
  },
  {
    title: "Nasıl okur?",
    text: "PDF transkript veya kamera taraması, optik karakter tanıma ile metne dönüştürülmek üzere hazırlanır.",
    icon: ScanText,
  },
  {
    title: "Kararı kim verir?",
    text: "Sistem ön değerlendirme üretir. Denklik ve intibak kararı ilgili akademik komisyonda kalır.",
    icon: ShieldCheck,
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold text-indigo-700">Hakkımızda</p>
      <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-slate-950">
        Akademik Denklik ve İntibak Sistemi
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
        AD&İS AI, yapay zeka ve görüntü işleme ile ders intibakı sürecindeki
        tekrarlı karşılaştırmayı kısaltır. Öğrenci belgesini iletir, sistem
        aday eşleşmeleri sıralar, komisyon üyesi raporu inceler.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {points.map((point) => (
          <article key={point.title} className="rounded-2xl border border-slate-200 bg-white p-6">
            <point.icon className="h-5 w-5 text-indigo-700" aria-hidden="true" />
            <h2 className="mt-4 text-base font-semibold text-slate-950">{point.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{point.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
