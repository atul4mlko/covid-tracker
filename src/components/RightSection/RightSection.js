import React from 'react';
import axios from 'axios';
import Card from '../Card/Card';
import CountryCasesChart from '../DataViz/Linechart/CountryCasesChart'

class RightSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            summaryData: {
                Global: {
                    NewConfirmed : 0,
                    TotalConfirmed : 0,
                    NewDeaths : 0,
                    TotalDeaths : 0,
                    NewRecovered : 0,
                    TotalRecovered : 0,
                },
                Countries: []
            }
        };
    }

    async componentDidMount() {
        let summaryData = await axios.get('https://api.covid19api.com/summary');
        this.setState({
            summaryData: summaryData.data
        });
    }
    
    render() {
        const { Global, Countries } = this.state.summaryData;
        const { selectedCountry } = this.props;
        let selectedCountryData = Countries.filter(c => c.Country === selectedCountry.Country);
        if (selectedCountryData.length > 0) {
            selectedCountryData = selectedCountryData[0];
        } else {
            selectedCountryData = null;
        }

        return (
            <>
                <div className="right-section">
                    <h3 className="right-section-heading">Global</h3>
                    <div className="card-section">
                        <Card 
                            newCases = {Global.NewConfirmed} 
                            totalCases = {Global.TotalConfirmed} 
                            type = "Confirmed">
                        </Card>
                        <Card 
                            newCases = {Global.NewDeaths} 
                            totalCases = {Global.TotalDeaths} 
                            type = "Deaths">
                        </Card>
                        <Card 
                            newCases = {Global.NewRecovered} 
                            totalCases = {Global.TotalRecovered} 
                            type = "Recovered">
                        </Card>
                    </div>

                    { selectedCountryData &&
                        <div>
                            <h3 className="right-section-heading">{selectedCountryData.Country}</h3>
                            <div className="card-section">
                                <Card 
                                    newCases = {selectedCountryData.NewConfirmed} 
                                    totalCases = {selectedCountryData.TotalConfirmed} 
                                    type = "Confirmed">
                                </Card>
                                <Card 
                                    newCases = {selectedCountryData.NewDeaths} 
                                    totalCases = {selectedCountryData.TotalDeaths} 
                                    type = "Deaths">
                                </Card>
                                <Card 
                                    newCases = {selectedCountryData.NewRecovered} 
                                    totalCases = {selectedCountryData.TotalRecovered} 
                                    type = "Recovered">
                                </Card>
                            </div>
                            <CountryCasesChart selectedCountry={selectedCountry.Slug} />
                        </div>
                    }
                </div>
            </>
        )
    }
}

export default RightSection;