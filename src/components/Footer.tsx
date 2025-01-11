export const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {["Impressum", "Datenschutz", "AGB", "Kontakt"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-gray-600 hover:text-gray-900"
            >
              {item}
            </a>
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; 2024 Website Builder. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};