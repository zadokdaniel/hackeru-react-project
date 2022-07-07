import Footer from "./components/footer";

import "./App.css";

function App() {
  return (
    <div className="app d-flex flex-column min-vh-100">
      <header>HEADER</header>
      <main className="flex-fill container">MAIN</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
