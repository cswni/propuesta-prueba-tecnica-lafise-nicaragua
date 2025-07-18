export function Error404Page() {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white p-8">
        <div className="bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center max-w-lg w-full animate-fade-in">
          <svg width="96" height="96" fill="none" viewBox="0 0 24 24" className="mb-6">
            <circle cx="12" cy="12" r="12" fill="#3B8668" />
            <text x="12" y="16" textAnchor="middle" fontSize="3.5em" fill="#fff" fontFamily="monospace">404</text>
          </svg>
          <h1 className="text-4xl text-center font-bold text-[var(--green)] mb-2">¡Ups! Página no encontrada</h1>
          <p className="text-gray-600 mb-6 text-center">
            La página que buscas no existe o fue movida.<br />
            Por favor, verifica la URL o regresa al inicio.
          </p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-[var(--green)] text-white rounded-lg font-semibold hover:bg-green-700 transition text-lg shadow-md"
          >
            Ir al inicio
          </a>
        </div>
      </div>
    );
  }
