export default function LiveDemo() {
  return (
    <section className="py-24 px-6 bg-secondary-900">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-primary-500 text-sm mb-3">// live demo</p>
        <h2 className="text-4xl font-black tracking-tight text-secondary-50 mb-8">
          See it in action.
        </h2>
        <div className="border border-secondary-700 rounded-2xl overflow-hidden">
          <iframe
            src="https://app.schemaviz.mystaline.dev/?embed"
            title="Schema Vis live demo"
            className="w-full h-[400px] md:h-[600px]"
            style={{ border: "none" }}
          />
        </div>
        <div className="mt-4 text-center">
          <span className="text-secondary-400 text-sm">Or open the full app</span>
          <a
            href="https://app.schemaviz.mystaline.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-400 hover:text-primary-300 ml-1 inline"
          >
            →
          </a>
        </div>
      </div>
    </section>
  );
}
