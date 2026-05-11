// Root app
function App() {
  return (
    <React.Fragment>
      <Nav />
      <Hero />
      <Achievements />
      <Projects />
      <Value />
      <Founder />
      <Testimonials />
      <Insights />
      <Connect />
      <CtaBand />
      <Footer />
      <Tweaks />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
