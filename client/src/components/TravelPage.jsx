import React, { useState, useEffect } from "react";
import axios from "axios";
import "tailwindcss";

function TravelPage() {
    const [query, setQuery] = useState("");
    const [place, setPlaces] = useState([]); // State สำหรับเก็บข้อมูลที่ดึงมา

    const getData = async () => {
        try {
            const response = await axios.get(`http://localhost:4001/trips?keywords=${query}`);            
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
            <h1 className="text-cyan-600 text-6xl font-bold text-center">เที่ยวไหนดี</h1>
            <div className="flex flex-col items-center my-6">
                <h4 className="text-left w-4/5">ค้นหาที่เที่ยว</h4>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="หาที่เที่ยวแล้วไปกัน ..."
                    className="border-b-1 border-gray-300 p-2 w-4/5 text-center"
                />
            </div>
            <div className="flex flex-col items-center p-8">
                {place.map((place, eId) => (
                    <div key={eId} className="flex flex-row p-4 mb-6 items-center">
                        <img
                            className="rounded-4xl h-80 w-108 object-cover mr-8"
                            src={place.photos[0]}
                            alt={place.title}
                        />
                        <div>
                            <h2 className="text-xl font-bold mb-2">{place.title}</h2>
                            <p className="mb-2">
                                {place.description.length > 100
                                    ? `${place.description.slice(0, 100)} ...`
                                    : place.description}
                            </p>
                            <a
                                href={place.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sky-500 underline"
                            >
                                อ่านต่อ
                            </a>
                            <div className="mt-2">
                                <p className="inline font-semibold ">หมวด </p>
                                <span className="underline">{place.tags.join(" ")} และ {place.tags[place.tags.length - 1]}</span>
                            </div>
                            <div className="flex mt-4 space-x-8">
                                {place.photos.slice(1).map((photo, idx) => (
                                    <img
                                        key={idx}
                                        className="rounded-xl h-36 w-36 object-cover"
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