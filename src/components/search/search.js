import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { geoApioptions, geoApiurl } from '../../api';

const Search = ({ onSearchChange }) => {



    const [search, setSearch] = useState(null);

    const loadOptions = (inputValue) => {
        return fetch(`${geoApiurl}?minPopulation=10000&namePrefix=${inputValue}`, geoApioptions)
            .then(response => response.json())
            .then((response) => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} , ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        }
                    })
                }
            })
            .catch(err => console.error(err));
    };

    const handleonChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    return (
        <AsyncPaginate
            placeholder='Search for City'
            debounceTimeout={600}
            value={search}
            onChange={handleonChange}
            loadOptions={loadOptions}
        />
    
    )
}

export default Search