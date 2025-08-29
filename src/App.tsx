import "./App.css";
import GeneralContainer from "./components/General/GeneralContainer";
import LumeHeader from "./components/Lume/Header";

function App() {
  return (
    <div className="w-screen h-screen bg-[var(--c-background)] text-[var(--c-primary)] grid grid-rows-[64px_1fr] grid-cols-[72px_1fr] theme-light">

      <LumeHeader />

      <aside className="row-start-2 col-start-1 w-full h-full flex flex-col items-center py-4 bg-[var(--c-surface)]">
        <div className="w-10 h-10 bg-[var(--c-primary)] rounded-full flex items-center justify-center mb-6">
          ❤️
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main id="lumecontent" className="absolute z-10 left-16 top-12 right-0 bottom-0 h-[calc(100vh - 4rem)] p-4">
        <GeneralContainer customStyle="row-start-2 col-start-2 p-6 overflow-auto bg-[var(--c-accent)] border border-[var(--c-border)] rounded-xl shadow-lg">
          <h1 className="text-3xl font-semibold mb-4">Bem-vindo de volta!</h1>
          <p className="text-[var(--c-secundary)]">
            Aqui você pode acessar suas notas, criar novas ideias e organizar tudo de forma minimalista.
          </p>
        </GeneralContainer>
      </main>
    </div>
  );
}

export default App;
