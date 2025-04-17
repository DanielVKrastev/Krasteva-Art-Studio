export default function NewArts() {
  return (
    <section className="py-12 border border-gray-300">
      <div className="max-w-7xl mx-auto px-4">
        <hr className="w-10 mx-auto border-t-2 border-indigo-700 text-center" />
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Нови картини</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <a
            href="#"
            className="group relative block bg-white rounded-2xl overflow-hidden shadow-lg transition transform hover:scale-105"
            data-aos="fade"
            data-aos-delay={100}
          >
            <img
              src="/images/test_draw.jpg"
              alt=""
              className="w-full h-60 object-cover"
            />
            <div className="p-4 text-center">
              <span className="text-sm text-gray-500 uppercase">Категория</span>
              <h3 className="text-xl font-semibold group-hover:text-indigo-600 transition">
                Пейзажи
              </h3>
            </div>
          </a>
          <a
            href="#"
            className="group relative block bg-white rounded-2xl overflow-hidden shadow-lg transition transform hover:scale-105"
            data-aos="fade"
            data-aos-delay={200}
          >
            <img
              src="/images/test_draw_swan.jpg"
              alt=""
              className="w-full h-60 object-cover"
            />
            <div className="p-4 text-center">
              <span className="text-sm text-gray-500 uppercase">Категория</span>
              <h3 className="text-xl font-semibold group-hover:text-indigo-600 transition">
                Абстрактни картини
              </h3>
            </div>
          </a>
        </div>
      </div>
    </section>

  );
}
