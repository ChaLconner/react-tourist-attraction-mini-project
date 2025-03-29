import React, { useState, useEffect } from "react";
import axios from "axios";

function TravelPage() {
    const [query, setQuery] = useState("");
    const [place, setPlaces] = useState([]); // State สำหรับเก็บข้อมูลที่ดึงมา

    const getData = async () => {
        try {
            const response = await axios.get(`http://localhost:4001/trips?keywords=${query}`);
            console.log(response.data.data);
            setPlaces(response.data.data); // เก็บข้อมูลใน state
        } catch (error) {
            console.error("Error fetching places:", error);
        }
    };

    useEffect(() => {
        getData(); // เรียกใช้ getData เมื่อคอมโพเนนต์โหลด
    }, [query]); // ทำงานใหม่เมื่อ query เปลี่ยน




    
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">เที่ยวไหนดี</h1>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ค้นหาสถานที่"
                className="border p-2 mb-4 w-full"
            />
            <div>
                {place.map((place, eid) => (
                    <div key={eid} className="border p-4 mb-4">
                        <h2 className="text-xl font-bold">{place.title}</h2>
                        <a href={URLSearchParams}>อ่านต่อ</a>
                        
                        <p>{place.description}</p>
                        <img src={place.photos[0]}></img>
                        <a href="">หมวด</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TravelPage;