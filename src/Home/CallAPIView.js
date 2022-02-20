import axios from "axios";
import Session from "supertokens-auth-react/recipe/session";
import { getApiDomain } from "../App";
import React, { useState, useEffect } from 'react';
import { Button, TextInput } from '@mantine/core';
import '../App.css'
 
Session.addAxiosInterceptors(axios);

export default function CallAPIView() {

    // const [notionKey, setNotionKey] = useState("")
    const [updatingQuery, setUpdatingQuery] = useState("")
    const [output, setOutput] = useState([])
    const [example, setExample] = useState("example")
    // const [updatingDatabase, setUpdatingDatabase] = useState("")
    // const [updatingCollection, setUpdatingCollection] = useState("")
    


    // useEffect(() => {
    //     console.log(updatingQuery, output)
    //     const getNotionKey = async () => {
    //       console.log(updatingQuery)
    //       console.log('reached useeffect')
    //       if (updatingQuery) {
    //         console.log('true')
    //         let response = await axios.post(getApiDomain()+"/handleQuery", {
    //           query: updatingQuery
    //         });
    //         let total = []
    //         for (let i = 0; i < response.data.res.length; i++) {
    //           let val = response.data.res[i]
    //           total.push([val['title'], val['text']])
    //         }
    //         // window.alert("Session Information2:\n" + JSON.stringify(response.data, null, 2));
    //         // window.alert('output'+total[0][0])
    //         setOutput(total)
    //       }
    //         // console.log(response2)
    //         // if (response2.data.fail===false) {
    //         //     setNotionKey(response2.data.notionkey)
    //         // }
    //     }
    //     getNotionKey();
    // }, []);

    function handleChange(event) {
        // setState({value: event.target.value});
        setUpdatingQuery(event.target.value)    
      }

    // async function callAPIClicked() {
    //     // this will also automatically refresh the session if needed
    //     let response = await axios.post(getApiDomain() + "/sessioninfo");
    //     window.alert("Session Information:\n" + JSON.stringify(response.data, null, 2));
    //     window.alert('hello')
    // }



    async function submitSearch(event) {
        console.log('submitting!')
        // this will also automatically refresh the session if needed
        // let apiDomain = process.env.REACT_APP_API_URL|| "https://mk1.diva.so:4242/handleQuery" 
       
        console.log(updatingQuery)

        let response = await axios.post(getApiDomain()+"/handleQuery", {
            query: updatingQuery
          }
        );
        // let response = await axios.post(
        //   "https://mk1.diva.so:4242/handleQuery", 
        //   {'query': updatingQuery},
        //   { headers: { 
        //       "Content-Type": "application/json",
        //       "Access-Control-Allow-Origin": "*",
        //     "Authorization":  `Bearer ${'hackgt'}`
        //   }}
        //   )
        console.log('done with endpoint')
        console.log(response.data)
        // setNotionKey(response.data.notionkey)
        // window.alert("cool beans");
        // window.alert("Session Information:\n" + JSON.stringify(response.data, null, 2));
        // window.alert("Session Information:\n" + JSON.stringify(response.data, null, 2));

        let total = []
        for (let i = 0; i < response.data.res.length; i++) {
          let val = response.data.res[i]
          total.push([val['title'], val['text']])
        }
        // window.alert('output'+total[0][0])
        setOutput(total)
        setExample(total[0][0])
        console.log(total[0])
    }


    return (
        <div>
        {/* <div onClick={updateNotionKey} className="sessionButton">
            Add your Notion Key
        </div> */}
         {/* <div onClick={callAPIClicked} className="sessionButton">
            Call API
        </div> */}
        {/* <div >
           Notion key: {notionKey}
        </div> */}
        {/* <form  onSubmit={submitSearch}>
        <label >
         Query:
         <TextInput  name="query" value={updatingQuery} onChange={handleChange} />
        </label>
        <Button type="submit" radius="md">Submit</Button>
      </form> */}
      Query: <TextInput  name="query" value={updatingQuery} onChange={handleChange} />
      <Button onClick={submitSearch} radius="md">Submit</Button>

      {
          output && (
            output.map((outputPair) => (
              <>
                <h2>{outputPair[0]}</h2>
                <p>{outputPair[1]}</p>
              </>
              ))
            )
        }
    </div>
    );
}