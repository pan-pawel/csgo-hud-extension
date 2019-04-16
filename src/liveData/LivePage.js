import React, { Component } from "react";
import { connect } from "react-redux";
import { getLiveData } from "../reducers/liveDataReducer";
import _ from "lodash";

export class LivePage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { map, provider, player, round } = this.props.liveData;
    return (
      <div className="page">
        <ul>
          <li>
            MAP: {map && map.name} round: {map && map.round}{" "}
          </li>
          <li>Player Name: {player && player.name}</li>
          <li>
            Kills: {player && player.match_stats && player.match_stats.kills}
          </li>
          <li>Weapons:</li>
          <ul>
            {_.map(player.weapons, (weapon, index) => (
              <li key={index}>
                {" "}
                {weapon.name} :{" "}
                {weapon.ammo_clip
                  ? weapon.ammo_clip + "/" + weapon.ammo_clip_max
                  : ""}{" "}
              </li>
            ))}
          </ul>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  liveData: getLiveData(state)
});

export default connect(mapStateToProps)(LivePage);