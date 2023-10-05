import React from "react";
import { Grid, Card } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import home from "../images/home.jpg";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  backgroundImage: `url({home})`,
}));

const cardStyle = {
  padding: 50,
  height: "auto",
  width: 280,
  margin: "112px auto",
};

const Home = () => {
  const classes = useStyles();
  const avatarStyle = { backgroundColor: "#000000" };

  return (
    <div className="App">
      <Grid container spacing={3}>
        <Grid item lg={3} md={3}></Grid>

        <Grid item xs={12} lg={6} md={6}>
          <Card style={cardStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}></Avatar>
              <h2>Home!</h2>
            </Grid>
          </Card>
        </Grid>

        <Grid item lg={3} md={3}></Grid>
      </Grid>
    </div>
  );
};

export default Home;
