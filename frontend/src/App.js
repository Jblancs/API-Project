import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsShow from "./components/SpotsShow";
import SingleSpotShow from "./components/SingleSpotShow";
import CreateSpotForm from "./components/CreateSpotForm";
import EditSpotForm from "./components/EditSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" component={SpotsShow} />
          <Route path="/spots/new" component={CreateSpotForm}/>
          <Route path="/spots/current"/>
          <Route path="/spots/:spotId/edit" component={EditSpotForm} />
          <Route path="/spots/:spotId" component={SingleSpotShow} />
        </Switch>
      )}
    </>
  );
}

export default App;
