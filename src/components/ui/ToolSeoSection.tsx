interface FaqItem {
  q: string
  a: string
}

interface ToolSeoSectionProps {
  steps: string[]
  faqs: FaqItem[]
}

export function ToolSeoSection({ steps, faqs }: ToolSeoSectionProps) {
  return (
    <div className="mt-12 border-t border-gray-100 pt-10 text-gray-400 dark:border-gray-800 dark:text-gray-600">
      <section className="mb-8">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest">
          How It Works
        </h2>
        <ol className="space-y-2">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed">
              <span className="shrink-0 font-mono font-semibold text-gray-300 dark:text-gray-700">
                {i + 1}.
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest">
          Frequently Asked Questions
        </h2>
        <dl className="space-y-5">
          {faqs.map((item, i) => (
            <div key={i}>
              <dt className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-500">
                {item.q}
              </dt>
              <dd className="text-sm leading-relaxed">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  )
}
