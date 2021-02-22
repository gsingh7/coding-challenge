import React from 'react';
import _ from "lodash";
import {distance} from 'fastest-levenshtein'

function GeoNamesTable({geoNamesArray, inputText, closestNameMatch}) {
    return (
        <div>
            {geoNamesArray&&geoNamesArray.length ?
                <table className='GeoNamesTable'>
                    <thead>
                    <tr>
                        <th> Name</th>
                        <th> Latitude</th>
                        <th> Longitude</th>
                    </tr>
                    </thead>
                    {closestNameMatch ?
                        <tbody>
                        {//sorting by Levenshtein distance of name the input text
                            _.sortBy(geoNamesArray, [o=> distance(o.name.toLowerCase(), inputText.toLowerCase())])
                                .map((sorted) => <tr key={sorted.geonameid}>
                                        <td>{sorted.name}</td>
                                        <td>{sorted.latitude}</td>
                                        <td>{sorted.longitude}</td>
                                    </tr>
                                )
                        }
                        </tbody>
                        :
                        <tbody>
                        {
                            geoNamesArray.filter(element=>  _.startsWith(element.name.toLowerCase(), inputText.toLowerCase())||_.startsWith(element.asciiname.toLowerCase(), inputText.toLowerCase()))
                                .map((filtered) => <tr key={filtered.geonameid}>
                                        <td>{filtered.name}</td>
                                        <td>{filtered.latitude}</td>
                                        <td>{filtered.longitude}</td>
                                    </tr>
                                )
                        }
                        </tbody>
                    }

                </table>
                :
                null
            }
        </div>
    );
}

export default GeoNamesTable;
