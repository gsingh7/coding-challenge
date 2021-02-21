import React, {useState, useEffect} from 'react';

function DisplayGeoNames() {
    const [inputText, setInputText] = useState("");
    const [geoNamesArray, setGeoNamesArray]=useState([]);
    useEffect(()=>{
        let cancelled = false;//Cancelled is set to false and state is only updated if the effect is not cancelled
        if(inputText.length<2){
            if(!cancelled){
                setGeoNamesArray([]);
            }
        }
        else{
            fetch('/locations/?q='+inputText)
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
        return () => (cancelled = true);//cleanup done to avoid any race conditions
    }, [inputText])
    const handleChange=(e)=>{
        setInputText(e.target.value);
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
                    {geoNamesArray.map((element, i) => <tr key={i}>
                        <td>{element.name}</td>
                        <td>{element.latitude}</td>
                        <td>{element.longitude}</td>
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
