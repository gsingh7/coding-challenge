import React from 'react';
import _ from "lodash";

function GeoNamesTable({geoNamesArray, inputText}) {
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
                    <tbody>
                    {geoNamesArray.filter(element=>  _.startsWith(element.name.toLowerCase(), inputText.toLowerCase())).map((filtered, i) => <tr key={i}>
                        <td>{filtered.name}</td>
                        <td>{filtered.latitude}</td>
                        <td>{filtered.longitude}</td>
                    </tr>)
                    }
                    </tbody>
                </table>
                :
                null
            }
        </div>
    );
}

export default GeoNamesTable;
