import React, { Component } from 'react';
import './App.css';
import Checkbox from "./Checkbox";
import Kingdom from "./Kingdom";

const OPTIONS = ["Dominion", "Dominion1", "Dominion2", "Intrigue", "Intrigue1", "Intrigue2", "Seaside",
                 "Alchemy", "Prosperity", "Cornucopia", "Hinterlands", "Dark Ages", "Guilds", "Adventures",
                 "Empires", "Nocturne", "Renaissance", "Promo"];

const OTHERS = ["Adventures", "Empires", "Renaissance"];

class KingdomPicker extends Component {
  state = {
    checkboxes: OPTIONS.reduce(
        (options, option) => ({
            ...options,
            [option]: false
        }),
        {}
    ),
    otherCheckboxes: OTHERS.reduce(
        (options, option) => ({
            ...options,
            [option]: false
        }),
        {}
    ),
    kingdom: {},
  };

  selectAllCheckboxes = isSelected => {
    Object.keys(this.state.checkboxes).forEach(checkbox => {
        this.setState(prevState => ({
            checkboxes: {
                ...prevState.checkboxes,
                [checkbox]: isSelected
            }
        }));
    });
  };

  selectAllOtherCheckboxes = isSelected => {
     Object.keys(this.state.otherCheckboxes).forEach(checkbox => {
         this.setState(prevState => ({
             otherCheckboxes: {
                 ...prevState.otherCheckboxes,
                 [checkbox]: isSelected
             }
         }));
     });
  };

  selectAll = () => this.selectAllCheckboxes(true);

  deselectAll = () => this.selectAllCheckboxes(false);

  selectOtherAll = () => this.selectAllOtherCheckboxes(true);

  deselectOtherAll = () => this.selectAllOtherCheckboxes(false);

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState(prevState => ({
        checkboxes: {
            ...prevState.checkboxes,
            [name]: !prevState.checkboxes[name]
        }
    }));
  };

  handleOtherCheckboxChange = changeEvent => {
      const { name } = changeEvent.target;

      this.setState(prevState => ({
          otherCheckboxes: {
              ...prevState.otherCheckboxes,
              [name]: !prevState.otherCheckboxes[name]
          }
      }));
    };

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    let params = [];
    Object.keys(this.state.checkboxes)
        .filter(checkbox => this.state.checkboxes[checkbox])
        .forEach(checkbox => {
            params.push(checkbox);
        });

    let otherParams = [];
    Object.keys(this.state.otherCheckboxes)
        .filter(checkbox => this.state.otherCheckboxes[checkbox])
        .forEach(checkbox => {
            otherParams.push(checkbox);
        });

    const url = 'https://ben94ck4j8.execute-api.us-west-2.amazonaws.com/Stage/pick?boxes=' + params.toString() + "&others=" + otherParams.toString();
    this.getPick(url);
  };

  getPick = async (url) => {
    const header = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, X-Auth-Token, Accept',
    });
    let response;
    try {
        response = await fetch(url, {
            method: 'GET',
            headers: header,
        });
    } catch (err) {
        throw new Error('Unexpected');
    }
    if (response.ok) {
        const json = await response.json();
        this.setState({kingdom: json});
    } else {
        throw response;
    }
  };

  createCheckbox = option => (
    <Checkbox
        label={option}
        isSelected={this.state.checkboxes[option]}
        onCheckboxChange={this.handleCheckboxChange}
        key={option}
    />
  );

  createOtherCheckbox = option => (
    <Checkbox
        label={option}
        isSelected={this.state.otherCheckboxes[option]}
        onCheckboxChange={this.handleOtherCheckboxChange}
        key={option}
    />
  );


  createCheckboxes = () => OPTIONS.map(this.createCheckbox);

  createOtherCheckboxes = () => OTHERS.map(this.createOtherCheckbox);

  createKingdom = () => (
    <Kingdom
        keys={Object.keys(this.state.kingdom)}
        cards={this.state.kingdom["Cards"]}
        cardLikes={this.state.kingdom["Card-Likes"]}
    />
  );

  render() {
    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-sm-12">
                    <form onSubmit={this.handleFormSubmit}>
                        {this.createCheckboxes()}

                        <div className="form-group mt-2">
                            <button
                                type="button"
                                className="btn btn-outline-primary mr-2"
                                onClick={this.selectAll}
                            >
                                Select All
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-primary mr-2"
                                onClick={this.deselectAll}
                            >
                                Deselect All
                            </button>
                        </div>

                        {this.createOtherCheckboxes()}
                        <div className="form-group mt-2">
                            <button
                                type="button"
                                className="btn btn-outline-primary mr-2"
                                onClick={this.selectOtherAll}
                            >
                                Select All
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-primary mr-2"
                                onClick={this.deselectOtherAll}
                            >
                                Deselect All
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Get Kingdom
                            </button>
                        </div>
                    </form>
                    {this.createKingdom()}
                </div>
            </div>
        </div>
    );
  }
}

export default KingdomPicker;