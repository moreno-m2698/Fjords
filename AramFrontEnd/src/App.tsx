import ButtonUsage from "./components/ButtonTemplate"
import { TextField } from "@mui/material"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SummonerCard from "./components/OverviewComponents/SummonerCard";
import MatchCard from "./components/OverviewComponents/MatchCard";


function App() {
  return (
    <>
    <ButtonUsage />
    <TextField id="summoner-input" label="Summoner" />
    <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    <SummonerCard summonerName="keoP" />
    <MatchCard />
  </>
  )
}

export default App
