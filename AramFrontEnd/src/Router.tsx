import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useState } from "react";
import SummonerPage from "./pages/SummonerPage";


function Router() {
  const [isUsingRiotId, setIsUsingRiotId] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input 
          name="myInput"
          type="text"
        />
        <button type="submit">Submit</button>
      </form>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/summoner" element={<SummonerPage />} />
            <Route path="/:summonerName" />
          <Route path="*" element={<p>404 Not Found</p>} />
      </Routes>
    </>
  )
}

export default Router