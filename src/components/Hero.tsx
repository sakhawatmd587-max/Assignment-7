export default function Hero() {
  return (
    <section className="bg-green-50">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-green-700">আজকের বাজারদর</p>
          <h1 className="mt-2 text-3xl font-bold md:text-5xl">
            নিত্যপ্রয়োজনীয় পণ্যের দাম, এক নজরে
          </h1>
          <p className="mt-4 text-gray-600">
            চাল, সবজি, মাছ, মাংস ও আরও অনেক পণ্যের আজকের দাম ও দামের ওঠানামা জানুন।
          </p>
          <a
            href="#সব-পণ্য"
            className="mt-6 inline-block rounded-lg bg-green-700 px-6 py-3 font-medium text-white"
          >
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="flex h-56 items-center justify-center rounded-3xl bg-green-100 text-8xl md:h-72">
          🛒🥬🐟
        </div>
      </div>
    </section>
  );
}