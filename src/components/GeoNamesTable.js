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
                        {
                            //sorting by Levenshtein distance between name of place and the input text. The distance is computed on substring of names with same length as inputText length for better match.
                            //todo write test cases to confirm this algorithm
                            _.sortBy(geoNamesArray, [o=> distance(o.name.substring(0, inputText.length-1).toLowerCase(), inputText.toLowerCase())])
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
                            //todo write test cases to confirm this algorithm
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
