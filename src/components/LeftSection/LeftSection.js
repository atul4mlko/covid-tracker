import React from 'react';
import axios from 'axios';

class LeftSection extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            countries: [],
            fullListOfCountries: []
        };
    }

    async componentDidMount() {
        const countries = await axios.get('https://api.covid19api.com/countries');
        this.setState({
            countries: countries.data,
            fullListOfCountries: countries.data
        })
    }

    selectCountry = (e, country) => {
        e.preventDefault();
        this.props.handleCountryChange(country);
    }

    handleSearchChange = e => {
        const enteredText = e.target.value.toLowerCase();
        let countryList = this.state.fullListOfCountries;
        console.log(countryList.length);
        if (enteredText !== '') {
            countryList = countryList.filter(c => c.Country.toLowerCase().search(enteredText) > 0);
        } 
        console.log(countryList.length);
        this.setState({
            countries: countryList
        })
    }

    render() {
        const { countries } = this.state;
        countries.sort((a,b) => a.Country.localeCompare(b.Country));
        const { selectedCountry } = this.props;
        const isCountrySelected = (country) => selectedCountry === country;
        return (
            <div className="left-section">
                <input className="search-box" onChange={this.handleSearchChange} type="text" name="countryName" placeholder="Type a country name"></input>
                <ul>
                    {
                        countries.map(
                            (c,i) => {
                                return <li className={isCountrySelected(c.Country) ? 'selected-country' : ''} onClick={e => this.selectCountry(e, c)} key={i}>{c.Country}</li>
                            }
                        )
                    }
                </ul>
            </div>
        )
    }
}

export default LeftSection;