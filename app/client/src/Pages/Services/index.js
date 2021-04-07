import React from "react";
import { Grid } from "@material-ui/core";
import { ServiceCard } from "../../Components";
import { services } from "../../Resources/Data/services";
import { ImageBgContainer } from "../../Resources/Styles/global";

export default function Services({ withNav }) {
  const ServiceContainer = () => (
    <div
      style={{
        maxWidth: "960px",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Grid
        container
        direction="row"
        justify="center"
        alignContent="center"
        spacing={5}
      >
        {services.map((data) => (
          <ServiceCard key={data.heading} {...data} />
        ))}
      </Grid>
    </div>
  );

  return (
    <div>
      <ImageBgContainer>
        <ServiceContainer />
      </ImageBgContainer>
    </div>
  );
}
