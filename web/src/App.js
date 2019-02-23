import React, {Component} from 'react';
import './App.css';
import './css/font-awesome-4.7.0/css/font-awesome.min.css';
import './css/semantic-ui-2.2.2/semantic.min.css';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/theme-fresh.css';
import store from './MainStore';
import toastr from 'toastr';
import {Button} from 'semantic-ui-react'
import {Icon, Label, Menu, Table} from 'semantic-ui-react'
import {Input} from 'semantic-ui-react'


var jq = window.$;
var location = window.location;

class App extends Component {


    state = {
        employeeData: [],
        juniorDevelopers: 0,
        seniorDevelopers: 0,
        budget: 0,
        totalBudget: 0
    }

    componentDidMount() {
        //   this.getAllEmployees();
    }

    generateEmployees = () => {

        let that = this;
        that.setState({disableLoader: false});
        jq.ajax({
            url: window.ajaxPrefix + "employees/generate",
            type: "GET",
            dataType: "json",
            cache: false,
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                that.setState({disableLoader: true});
                if (response.length > 0) {
                } else {
                    that.setState({rowData: []});
                }
            },
            error: function (xhr, status, err) {
                that.setState({disableLoader: true});
                if (xhr.responseJSON)
                    toastr.error(xhr.responseJSON.errorMessage);
            }
        });

        window.alert("Employees Generated")
    }

    getAllEmployees = () => {

        let that = this;
        that.setState({disableLoader: false});
        jq.ajax({
            url: window.ajaxPrefix + "employees/filtered",
            type: "GET",
            dataType: "json",
            cache: false,
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                that.setState({employeeData: response});
            },
            error: function (xhr, status, err) {
                that.setState({disableLoader: true});
                if (xhr.responseJSON)
                    toastr.error(xhr.responseJSON.errorMessage);
            }
        });


    }

    seniorDeveloperInput = (event, data) => {
        this.setState({seniorDevelopers: data.value})
    }


    juniorDeveloperInput = (event, data) => {
        this.setState({juniorDevelopers: data.value})
    }


    budgetInput = (event, data) => {
        this.setState({budget: data.value})
    }
    submitBudgetDetails = () => {
        let that = this;
        that.setState({disableLoader: false});
        jq.ajax({
            url: window.ajaxPrefix + "employees/filtered?senior=" + that.state.seniorDevelopers + "&junior=" + that.state.juniorDevelopers + "&budget=" + that.state.budget,
            type: "GET",
            dataType: "json",
            cache: false,
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                that.setState({employeeData: response.employees,totalBudget:response.totalBudget});

                if (response.status == 0) {
                    toastr.error(response.message)
                }
                else {
                    toastr.success(response.message)
                }
            },
            error: function (xhr, status, err) {
                that.setState({disableLoader: true});
                if (xhr.responseJSON)
                    toastr.error(xhr.responseJSON.errorMessage);
            }
        });
    }

    render() {
        var st = this.state;
        var employeeDetails = [];
        for (var i = 0; i < st.employeeData.length; i++) {
            employeeDetails.push(<Table.Row>
                <Table.Cell>{st.employeeData[i].name}</Table.Cell>
                <Table.Cell>{st.employeeData[i].experience == 0 ? "0" : st.employeeData[i].experience}</Table.Cell>
                <Table.Cell>{st.employeeData[i].salary}</Table.Cell>
                <Table.Cell>{st.employeeData[i].type}</Table.Cell>
            </Table.Row>)
        }

        return (
            <div>
                <div>
                    <Button onClick={this.generateEmployees}>Generate Employees</Button>
                </div>
                <div>
                    Number of Senior Developers : <Input value={st.seniorDevelopers}
                                                         onChange={this.seniorDeveloperInput}
                                                         placeholder='Senior Developers'/><br/>
                    Number of Junior Developers : <Input value={st.juniorDevelopers}
                                                         onChange={this.juniorDeveloperInput}
                                                         placeholder='Junior Developers'/><br/>
                    Budget : <Input value={st.budget} onChange={this.budgetInput} placeholder='Budget'/><br/>
                    <Button onClick={this.submitBudgetDetails}>Sumbit Team Details</Button><br/>
                </div>
                <h1>Total Budget Used : {st.totalBudget}</h1>
                <div>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Experience</Table.HeaderCell>
                                <Table.HeaderCell>Salary</Table.HeaderCell>
                                <Table.HeaderCell>Type</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {employeeDetails}
                        </Table.Body>

                    </Table>
                </div>
            </div>
        );
    }
}

export default App;
