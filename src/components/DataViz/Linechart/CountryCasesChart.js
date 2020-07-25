import React from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

class CountryCasesChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            historicalData: []
        }
    }

    async componentDidMount () {
        this.getCountryHistoricalData();
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.selectedCountry !== this.props.selectedCountry) {
            this.getCountryHistoricalData();
        }
    }
    
    async getCountryHistoricalData() {
        console.log(`Getting ${this.props.selectedCountry} data!`);
        const response = await axios.get(`https://api.covid19api.com/dayone/country/${this.props.selectedCountry}`);
        this.setState({
            historicalData: response.data
        })
    }

    render() {
        const { historicalData } = this.state;

        const dates = historicalData.map(d => new Date(d.Date).toLocaleDateString("en-US"));
        const deaths = historicalData.map(d => d.Deaths);
        const confirmed = historicalData.map(d => d.Confirmed);
        const recovered = historicalData.map(d => d.Recovered);
        const data = {
            labels: dates,
            datasets: [
                {
                  label: 'Confirmed',
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: '#4964df',
                  borderColor: '#4964df',
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: '#4964df',
                  pointBackgroundColor: '#fff',
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: '#4964df',
                  pointHoverBorderColor: '#4964df',
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: confirmed
                },
                {
                label: 'Deaths',
                fill: false,
                lineTension: 0.1,
                backgroundColor: '#c40b0b',
                borderColor: '#c40b0b',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#c40b0b',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#c40b0b',
                pointHoverBorderColor: '#c40b0b',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: deaths
              },
              {
                label: 'Recovered',
                fill: false,
                lineTension: 0.1,
                backgroundColor: '#48d35f',
                borderColor: '#48d35f',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#48d35f',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#48d35f',
                pointHoverBorderColor: '#48d35f',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: recovered
              }
            ]
          };
        return (
            <>
                <Line data={data} />
            </>
        );
    }
}

export default CountryCasesChart;