const steps = [
  {
    index: "01",
    title: "Belgeyi getirin",
    text: "PDF transkript yükleyin veya kamera ile sayfayı tarayın.",
  },
  {
    index: "02",
    title: "Dersler eşleşsin",
    text: "Sistem, hedef program dersleriyle anlamsal benzerlik arar.",
  },
  {
    index: "03",
    title: "Raporu inceleyin",
    text: "Ön değerlendirme, komisyonun nihai intibak kararına zemin hazırlar.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6" aria-labelledby="steps-title">
      <div className="rounded-3xl bg-indigo-950 px-6 py-10 text-white sm:px-10">
        <h2 id="steps-title" className="text-2xl font-semibold tracking-tight">
          Nasıl çalışır?
        </h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <li key={step.index}>
              <p className="text-sm font-semibold text-indigo-200">{step.index}</p>
              <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-indigo-100">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
