import ImpactList from '../components/ImpactList.js'
import InputSearch from '../components/InputSearch.js'
import {useEffect, useState} from "react";


export default function Explorer() {

    const [carboneFootprints, setCarboneFootprints] = useState([])

    useEffect(() => {
      const url = "http://localhost:1337/carbone-footprints";
      fetch(url)
          .then(response => response.json())
          .then((data) => {
            setCarboneFootprints(data)
          })
          .catch((error) => {
            console.error(error)
          })
    }, []);


    return(
        <div>
            <h1>Explorateur d'impact carbonne</h1>
            <p>XXXX éléments dans la liste</p>

            <InputSearch />
            <ImpactList elements={carboneFootprints} />
        </div>
    )
}