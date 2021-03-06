import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DriverAPI } from "../../Api";
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";
import { LocationSearchInput } from "../MapInput/elements";

import { MdDirectionsCar, MdCallToAction, MdStreetview } from "react-icons/md";

import {
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  InputAdornment,
} from "@material-ui/core";

import { Form, SubmitButton, FormPaper, FormAvatar } from "../Account/elements";
import { Label } from "./elements";
import Glitch from "../../Resources/Utils/error";
import { useToasts } from "react-toast-notifications";
import { RenderErrorMessage } from "../Error/Validation";

export default function DriverRegistration({ USER_ID }) {
  const [truckno, setTruckNo] = useState("");
  const [dlno, setDlNo] = useState("");
  const [place_name, setPlaceName] = useState("");
  const [place_id, setPlaceId] = useState("");
  const handleChange = (address) => {
    setPlaceName(address);
  };

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState("");

  const removeMessage = () => {
    setMessage("");
  };

  const handleSelect = async (selectedAddress) => {
    const results = await geocodeByAddress(selectedAddress);
    setPlaceId(results[0].place_id);
    setPlaceName(results[0].formatted_address);
  };
  const { addToast } = useToasts();
  const onSubmit = (e) => {
    e.preventDefault();
    // setLoading(true);
    DriverAPI.complete_registration(USER_ID, truckno, dlno, {
      place_name,
      place_id,
    })
      .then(
        (response) => {
          setMessage(response.data.message);
          setLoading(false);
          window.location.reload(false);
        },
        (error) => {
          const errorMessage = Glitch.message(error);
          if (error.response && error.response.status === 409) {
            addToast(errorMessage, {
              appearance: "error",
            });
            setMessage(errorMessage);
          } else {
            addToast(errorMessage, {
              appearance: "error",
            });
          }
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <FormPaper elevation={6}>
        <FormAvatar>
          <MdStreetview />
        </FormAvatar>
        <Typography component="h1" variant="h5">
          Complete registration
        </Typography>
        <Form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdDirectionsCar />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                required
                fullWidth
                id="truckno"
                label="Truck No"
                name="truckno"
                autoComplete="truckno"
                onChange={(e) => {
                  setTruckNo(e.target.value);
                  removeMessage();
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdCallToAction />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                required
                fullWidth
                id="dlno"
                label="Driving Licence"
                name="dlno"
                autoComplete="dlno"
                onChange={(e) => {
                  setDlNo(e.target.value);
                  removeMessage();
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Label>Place of Residence</Label>
              <PlacesAutocomplete
                value={place_name}
                onChange={handleChange}
                onSelect={handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div>
                    <LocationSearchInput
                      {...getInputProps({
                        placeholder: "Search Places ...",
                        className: "location-search-input",
                      })}
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: "#fafafa", cursor: "pointer" }
                          : { backgroundColor: "#ffffff", cursor: "pointer" };
                        return (
                          <div
                            key={uuidv4()}
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            </Grid>
            <Grid>
              <p
                style={{
                  padding: "5px 20px",
                }}
              >
                By clicking finish you agree to the terms and conditions
              </p>
            </Grid>
          </Grid>
          <br />
          <SubmitButton type="submit" secondary disabled={loading}>
            Finish
          </SubmitButton>
          {message && <RenderErrorMessage msg={message} />}
          <br />
          <br />
        </Form>
      </FormPaper>
    </Container>
  );
}
