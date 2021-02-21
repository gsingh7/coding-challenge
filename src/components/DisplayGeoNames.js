import React, {useState, useEffect} from 'react';
import _ from 'lodash';

function DisplayGeoNames() {

    const [inputText, setInputText] = useState("");
    const [geoNamesArray, setGeoNamesArray]=useState([]);
    const [inputFirstTwoChars, setInputFirstTwoChars]=useState("");

    useEffect(()=>{
        let cancelled = false;//Cancelled is set to false and state is only updated if the effect is not cancelled
        if(inputFirstTwoChars.length<2){
            if(!cancelled){
                setGeoNamesArray([]);
            }
        }
        else{
            fetch('/locations/?q='+inputFirstTwoChars)
                .then(response=>{
                    console.log(response);
                    if(response.status===200){
                        return response.json();
                    }
                    else{
                        return([]);
                    }
                })
                .then((result)=>
                    {
                        console.log(result);
                        if(!cancelled){
                            setGeoNamesArray(result);
                        }
                    }
                )
                .catch(console.log)
        }
        return () => (cancelled = true);//cleanup done to avoid updating dom after cancelling the effect
    }, [inputFirstTwoChars]);//the effect needs to run only when first two characters change. The results are filtered for display.

    const handleChange=(e)=>{
        setInputText(e.target.value);
        setInputFirstTwoChars(e.target.value.substring(0,2));
    }

    return (
        <div>
            <input value={inputText} onChange={handleChange} placeholder='search box' className='inputTextBox'/>
            {geoNamesArray.length ?
                <table className='geoNamesTable'>
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

export default DisplayGeoNames;
