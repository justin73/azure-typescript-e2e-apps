import { useEffect, useRef, useState } from 'react';

let url = `/api/status`;

if(process.env.PRODUCTION){
    if(process.env.BACKEND_URI){
      url = `${process.env.BACKEND_URI}${url}`
    } else {
      throw Error(`Missing process.env.BACKEND_URI`)
    }
  }

function Status({ user }:any) {

    const [envvars, setEnvVars] = useState([]);
    const mountFlag = useRef(false)

    useEffect(() => {
        const fetchData = async () => {
            if (user?.userDetails) {
                mountFlag.current = true;
                const data = await fetch(url);
                const json = await data.json();
                setEnvVars(json);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
            <p>Hi {user?.userDetails.toLowerCase().split(' ').map(x=>x[0].toUpperCase()+x.slice(1)).join(' ')}</p>
            {JSON.stringify(envvars)}
            </header>
        </div>
    );
}
export default Status;