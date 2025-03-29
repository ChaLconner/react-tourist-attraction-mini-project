import React, { useState, useEffect } from "react";
import axios from "axios";
import "tailwindcss";

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
        <div className="w-full py-20">
            <h1 className="text-blue-500 text-3xl font-bold text-center">เที่ยวไหนดี</h1>
            <div className="flex justify-center items-center my-6">
                <h4>ค้นหาที่เที่ยว</h4>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="หาที่เที่ยวแล้วไปกัน ..."
                    className="border p-2 w-4/5 text-center"
                />
            </div>
            <div className="p-8">
                {place.map((place, eId) => (
                    <div key={eId} className="flex md:flex-row p-4 mb-4 border rounded-lg">
                        <img
                            className="h-24 w-24 object-cover mb-4 md:mb-0 md:mr-4"
                            src={place.photos[0]}
                            alt={place.title}
                        />
                        <div>
                            <h2 className="text-xl font-bold mb-2">{place.title}</h2>
                            <p className="mb-2">{place.description}</p>
                            <a href={place.url} className="text-blue-500 underline">
                                อ่านต่อ
                            </a>
                            <div className="mt-2">
                                <p className="inline font-semibold">หมวด: </p>
                                <span>{place.tags.join(", ")}</span>
                            </div>
                            <div className="flex mt-4 space-x-2">
                                {place.photos.slice(1).map((photo, idx) => (
                                    <img
                                        key={idx}
                                        className="h-20 w-20 object-cover"
                                        src={photo}
                                        alt={`Additional ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TravelPage;