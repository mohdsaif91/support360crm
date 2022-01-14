import { useState } from "react";
import Header from "./Component/Header";
import FilterComponent from "./Pages/FilterComponent";

function App() {
  const [pageData, setPageData] = useState();
  return (
    <div className="App">
      <Header />
      <FilterComponent />
    </div>
  );
}

export default App;
