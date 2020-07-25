import React from 'react';
import '../../App.css';
import LeftSection from '../LeftSection/LeftSection';
import RightSection from '../RightSection/RightSection';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCountry: {
                Country: '',
                Slug: ''
            }
        }
    }

    handleCountryChange = (country) => {
        if (this.state.selectedCountry.Country !== country.Country) {
            this.setState({
                selectedCountry: country
            });
        } else {
            this.setState({
                selectedCountry: {
                    Country: '',
                    Slug: ''
                }
            });
        }
    }

    render() {
        return (
            <>
                <div className="container">
                    <LeftSection handleCountryChange={this.handleCountryChange} selectedCountry={this.state.selectedCountry.Country}></LeftSection>
                    <RightSection selectedCountry={this.state.selectedCountry}></RightSection>
                </div>
                <div className="footer">Made by&nbsp;<a target="_blank" rel="noopener noreferrer"  href="https://www.linkedin.com/in/atul4mlko/">Atul Gupta</a></div>
            </>
        )
    }
}

export default Main;