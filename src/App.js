import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChecklistPage from "./routes/ChecklistPage";
import Home from "./routes/Home";
// import Test from "./routes/Test";
import DocumentPage from "./routes/DocumentPage";
import ProgressPage from "./routes/ProgressPage";

function App() {

  return (
    <Router>
        <Switch>
             {/*체크리스트페이지  */}
            <Route path='/checklist'> 
              <ChecklistPage/>
            </Route>
            {/*프로그래스페이지  */}
            <Route path='/progress'>
                <ProgressPage/>
            </Route>
            {/*도큐먼트페이지  */}
            <Route path='/document/:id'>
                <DocumentPage/>
            </Route>
            {/* <Route path='/test'>
                <Test/>
            </Route> */}
            {/*홈페이지  */}
            <Route path='/'>
                <Home/>
            </Route>


        {/* </MobileView> */}
        </Switch>
    </Router>
  );
}
export default App;