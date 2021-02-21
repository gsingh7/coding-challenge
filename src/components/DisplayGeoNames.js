import React, {useState, useEffect} from 'react';
import GeoNamesTable from "./GeoNamesTable";

function DisplayGeoNames() {

    const [inputText, setInputText] = useState("");
    const [geoNamesArray, setGeoNamesArray]=useState([]);
    const [inputFirstTwoChars, setInputFirstTwoChars]=useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        let cancelled = false;//Cancelled is set to false and state is only updated if the effect is not cancelled
        if(inputFirstTwoChars.length<2){
            if(!cancelled){
                setGeoNamesArray([]);
            }
        }
        else{
            setIsLoading(true);
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
                .finally(()=>setIsLoading(false))
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
            {isLoading ?
                <div>...Loading</div>
                :
                <GeoNamesTable geoNamesArray={geoNamesArray} inputText={inputText}/>
            }
        </div>

    );
}

export default DisplayGeoNames;
