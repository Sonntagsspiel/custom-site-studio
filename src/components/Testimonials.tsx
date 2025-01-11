export const Testimonials = () => {
  return (
    <section className="bg-neutral-light py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-primary">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-neutral sm:text-4xl">
            Von unseren Kunden empfohlen
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-900/5"
              >
                <div className="gap-x-4">
                  <div className="text-sm leading-6">
                    <p className="text-gray-600">
                      "Unsere neue Website war in wenigen Minuten fertig – unglaublich
                      einfach!"
                    </p>
                    <p className="mt-4 font-semibold text-neutral">
                      Max Mustermann
                    </p>
                    <p className="text-gray-600">CEO, Musterfirma GmbH</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};