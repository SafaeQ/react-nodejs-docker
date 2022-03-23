import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const Room = (props)=>{
    const [rooms, setRooms] = useState([])

    const fetchData = ()=>{
        axios
            .get('http://localhost:80/api/rooms')
            .then(response =>{
            setRooms(response.data)
            })
            .catch(error => {
                console.log({error});
            })
    }

    useEffect(()=>{
        fetchData()
    },[])

    return(
        <form >
            <div className="container">
                <div className="section_title text-center">
                    <h2 className="">Rooms</h2>
                    <p>Who are in extremely love with eco friendly system.</p>
                </div>
                <div className="row mb_30">
            {rooms.length > 0 ? (
                rooms.map((room, i)=> (
                    <div key={i} className="col-lg-4 col-md-6">
                        <Link to= '/reservation'><div className="facilities_item">
                        <img src={`http://localhost:80/rooms/image/${room.imagesRoom[0]}`} name="file" accept="image/*" className="mx-auto d-block card-img-top" alt="Sample image"/>
                        <h4 className="text-dark text-center">{room.type}</h4>
                            <p className="text-dark text-center">{room.price}</p>
                            <p className="text-dark text-center">{room.description}</p>
                            <p className="text-dark text-center">{room.status}</p>
                        </div></Link>
                    </div>
                    
                ))
                ): (
                    <h1> none</h1>
                )}
                </div>
            </div>

    </form>
    )
}

export default Room;