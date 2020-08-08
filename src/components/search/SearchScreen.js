import React, { useMemo } from 'react';
import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../../hooks/useForm';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {

    const location = useLocation();

    const { q = '' } = queryString.parse(location.search);

    const [valuesForm, handleInputChange] = useForm({ value: q });

    const { value } = valuesForm;

    const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

    const handleSearch = (e) => {
        e.preventDefault();
        // console.log(value);
        history.push(`?q=${value}`);
    }

    return (
        <div>
            <h1>Search</h1>
            <hr />
            <div className="row">
                <div className="col-md-5">
                    <h4>Search Form</h4>
                    <hr />
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Find your Hero"
                            className="form-control"
                            autoComplete="off"
                            name="value"
                            value={value}
                            onChange={handleInputChange}

                        />
                        <button
                            type="submit"
                            className="btn mt-2 btn-block btn-outline-primary"
                        >
                            Search...
                        </button>
                    </form>
                </div>

                <div className="col-md-7">
                    <h4>Results</h4>
                    <hr />
                    {(q === '') &&
                        <div className="alert alert-info">
                            Search a hero.
                        </div>
                    }
                    {(q !== '' && heroesFiltered.length === 0) &&
                        <div className="alert alert-danger">
                            There is no a hero with {q}
                        </div>
                    }
                    {
                        heroesFiltered.map(hero => (
                            <HeroCard
                                key={hero.id}
                                {...hero}
                            />
                        ))
                    }
                </div>

            </div>
        </div>
    )
}
