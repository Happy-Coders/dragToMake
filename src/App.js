import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import store from "./store";
import "antd/dist/antd.css";
import { Button, message } from "antd";
import "./App.css";
import WidgetBox from "./components/layout/widgetBox";
import Console from "./components/layout/console";
import Chatbot from "./components/layout/chatbot";
import EditFormPanel from "./components//EditComponents/FormEditWindow"
import Renderedfrom from "./components/EditComponents/Renderedfrom"
import axios from "axios";
import Body from "./components/layout/body";
class App extends Component {
  state = {
    widget: null,
    type: null,
    WidgetLength: null,
    deleteWidget: null,
  };

  handleExport = () => {
    var componentArray = this.state.AllWidget.forEach(function (v) {
      delete v.title;
    });
    var postData = {
      componentsArray: this.state.AllWidget,
    };
    message.info("No export link");
    // axios.post('http://localhost:8080/add', postData)
    //   .then(res => {
    //     console.log(res, "resssssss")
    //     message.success('Webpage expoted successfully');
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  };

  handleCurrentWidget = (data, type) => {
    this.setState({
      Widget: data,
      type: type,
    });
  };
  handleAllWidget = async (data) => {
    await this.setState({
      AllWidget: data,
      WidgetLength: data.length,
    });
  };
  handleDeleteWidget = async (data) => {
    console.log(data);
    await this.setState({
      deleteWidget: data,
    });
  };
  render() {
    return (
      <Router>
      <Provider store={store}>
        <Switch>
          <Route exact path="/">
            <div className="App">
              <div className="container-fluid">
                <div className="row">
                  <div
                    style={{
                      backgroundColor: "#f5f5f5",
                      height: "100vh",
                      overflow: "scroll",
                    }}
                    className="col-sm-2"
                  >
                    <WidgetBox widget={this.handleCurrentWidget} />
                  </div>
                  <div
                    style={{
                      height: "100vh",
                      borderStyle: "solid",
                      borderTop: "none",
                      borderBottom: "none",
                      borderRight: "none",
                      overflow: "scroll",
                    }}
                    className="col-sm-10"
                  >
                    <Body
                      deleteWidget={this.state.deleteWidget}
                      type={this.state.type}
                      widget={this.state.Widget}
                      handleAllWidget={this.handleAllWidget}
                    ></Body>
                  </div>
                  <div className="export-btn">
                    <Button
                      onClick={() => this.handleExport()}
                      style={{ backgroundColor: "#28A745", color: "white" }}
                      color="green"
                    >
                      EXPORT
                    </Button>
                  </div>
                </div>
              </div>
              {this.state.WidgetLength && (
                <Console
                  handleDeleteWidget={this.handleDeleteWidget}
                  AllWidget={this.state.AllWidget}
                />
              )}
              <Chatbot />
            </div>
          </Route>
          <Route path="/form">
          <div className="row">
            <div style={{borderStyle: "none solid", "height": "98vh", "paddingLeft": "25px"}} className="col-sm-3">
            <EditFormPanel/>
            </div>
            <div style={{padding: "50px"}} className="col-sm-9">
              <Renderedfrom/>
            </div>
          </div>
          </Route>
        </Switch>
      </Provider>
      </Router>
    );
  }
}

export default App;
