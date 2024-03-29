import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

import SummonerPage from "./pages/SummonerPage";
import GameNameOutlet from "./pages/GameNameOutlet";


function Router() {

  return (
    <>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/account">
            <Route index element={<p>please give a name</p>} />
            <Route path=":gameName/:tagLine" element={<SummonerPage />}/>
          </Route>
          <Route path="*" element={<p>404 Not Found</p>} />
      </Routes>
    </>
  )
}

export default Router