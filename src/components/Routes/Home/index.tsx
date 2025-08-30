

const LumeHome = () => {
  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center justify-center h-full text-center">

      <h1 className="text-4xl font-semibold mb-4">Bem-vindo ao Lume ✨</h1>
      <p className="text-lg text-[var(--c-secondary)] max-w-lg">
        Seu espaço minimalista para criar, organizar e visualizar notas em Markdown.
      </p>

      <div className="flex gap-4 mt-10">
        <button className="px-6 py-3 rounded-xl bg-[var(--c-accent)] text-white font-medium shadow-md hover:scale-105 transition">
          Nova Nota
        </button>
        <button className="px-6 py-3 rounded-xl border border-[var(--c-border)] font-medium hover:bg-[var(--c-surface)] transition">
          Abrir Pasta
        </button>
      </div>

    </div>
  )
}

export default LumeHome;
