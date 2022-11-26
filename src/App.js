import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChecklistPage from "./routes/ChecklistPage";
import Home from "./routes/Home";
import CalenderPage from "./routes/CalenderPage";
import DocumentPage from "./routes/DocumentPage";
import ProgressPage from "./routes/ProgressPage";
import Test from "./routes/Test";

import {useState,useEffect} from "react"
import { BrowserView, MobileView } from 'react-device-detect'
function App() {

  return (
    <Router>
        <Switch>
        {/* <MobileView> */}
            <Route path='/checklist'> 
            {/* path는 경로 컴포넌트로 사이트 띄우기 */}
              <ChecklistPage/>
            </Route>
            <Route path='/calender'>
                <CalenderPage/>
            </Route>
            <Route path='/progress'>
                <ProgressPage/>
            </Route>
            <Route path='/document/:id'>
                <DocumentPage/>
            </Route>
            <Route path='/test'>
                <Test/>
            </Route>
            <Route path='/'>
                <Home/>
            </Route>


        {/* </MobileView> */}
        </Switch>
    </Router>
  );
}
export default App;