type FAQ = { q: string; a: string };

export default function FAQBlock({ faqs, title = "Preguntas frecuentes" }: { faqs: FAQ[]; title?: string }) {
  if (faqs.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="mt-10 bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details key={i} className="bg-slate-50 rounded-lg p-4 border border-slate-200 group">
              <summary className="font-semibold cursor-pointer text-slate-900 group-open:text-brand">
                {f.q}
              </summary>
              <p className="mt-3 text-slate-700">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
