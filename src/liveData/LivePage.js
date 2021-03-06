import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getLiveData,
  getRoundPhase,
  getEquipment
} from "../reducers/liveDataReducer";
import _ from "lodash";
import { startReceivingData } from "../liveData/liveDataActions";
import Bomb from "./bomb/Bomb";

export class LivePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bomb: false
    };
  }
  componentDidMount() {
    const establishingConnection = setInterval(() => {
      try {
        this.props.startReceivingData();
        clearInterval(establishingConnection);
      } catch (err) {}
    }, 2000);
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
            {_.map(this.props.equipment, (equipment, index) => (
              <li key={index}>{JSON.stringify(equipment)}</li>
            ))}
          </ul>
          <li> Round phase: {this.props.roundPhase}</li>
        </ul>
        <Bomb />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  liveData: getLiveData(state),
  roundPhase: getRoundPhase(state),
  equipment: getEquipment(state)
});

const mapDistpachToProps = dispatch => ({
  startReceivingData: () => dispatch(startReceivingData)
});
export default connect(
  mapStateToProps,
  mapDistpachToProps
)(LivePage);
