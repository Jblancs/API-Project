import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsShow from "./components/SpotsShow";
import SingleSpotShow from "./components/SingleSpotShow";
import CreateSpotForm from "./components/CreateSpotForm";
import ManageSpots from "./components/ManageSpots";
import PreloadedFormData from "./components/EditSpot/PreloadedFormData";
import ManageBookings from "./components/ManageBookings";

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
          <Route path="/spots/new" component={CreateSpotForm} />
          <Route path="/spots/current" component={ManageSpots} />
          <Route path="/spots/:spotId/edit" component={PreloadedFormData} />
          <Route path="/spots/:spotId" component={SingleSpotShow} />
          <Route path="/bookings/current" component={ManageBookings} />
        </Switch>
      )}
    </>
  );
}

export default App;
