import { Brain, FileScan, FileText } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const features: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "PDF yükleme veya kamera ile tarama",
    description:
      "Transkripti PDF olarak yükleyin ya da belgeyi kamerayla tarayın. Metin, optik karakter tanıma ile okunmaya hazır hale gelir.",
    icon: FileScan,
  },
  {
    title: "Yapay zeka destekli ders eşleştirme",
    description:
      "Ders adları, krediler ve içerik ipuçları anlamsal benzerlikle karşılaştırılır. Yatay geçiş, dikey geçiş ve çift anadal için aday eşleşmeler önerilir.",
    icon: Brain,
  },
  {
    title: "Hızlı ön değerlendirme raporu",
    description:
      "Eşleşen, kısmen eşleşen ve incelenmesi gereken dersler tek raporda toplanır. Komisyon nihai kararı vermeden önce özeti görür.",
    icon: FileText,
  },
];

export function Features() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12" aria-labelledby="features-title">
      <div className="max-w-2xl">
        <h2 id="features-title" className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
          İntibak sürecini hızlandıran üç adım
        </h2>
        <p className="mt-3 text-base leading-7 text-slate-600">
          Öğrenci başvurusunu iletir, sistem dersleri karşılaştırır, komisyon üyesi
          ön raporu inceler.
        </p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
              <feature.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-base font-semibold text-slate-950">{feature.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
