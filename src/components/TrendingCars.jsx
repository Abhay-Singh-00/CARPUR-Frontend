import React, { useState, useEffect } from "react";

function TrendingCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  const UNSPLASH_ACCESS_KEY = "5Jz5ZTjMBOyrGmwgtWvu7wg-pt_R37MTTPAVKfeAOik";

  // Fetch free car image from Unsplash
  async function fetchCarImage(query) {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?page=1&query=${encodeURIComponent(
          query
        )}&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].urls.regular;
      }
    } catch (err) {
      console.error("Error fetching Unsplash image:", err);
    }
    return "https://via.placeholder.com/1600x900?text=Car+Image";
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const res = await fetch("http://localhost:5000/trending-cars");
        const data = await res.json();

        const carList = Array.isArray(data.data) ? data.data : [];

        // Deduplicate by make+model
        const seen = new Set();
        const uniqueCars = carList.filter((car) => {
          const name =
            car.vehicle?.make && car.vehicle?.model
              ? `${car.vehicle.make} ${car.vehicle.model}`
              : "Unknown Car";
          if (seen.has(name)) return false;
          seen.add(name);
          return true;
        });

        // Fetch matching free images for each unique car
        const formattedCars = await Promise.all(
          uniqueCars.map(async (car) => {
            const carName =
              car.vehicle?.make && car.vehicle?.model
                ? `${car.vehicle.make} ${car.vehicle.model}`
                : "Unknown Car";

            const imageUrl =
              car.retailListing?.primaryImage &&
              !car.retailListing.primaryImage.includes("photos.vin")
                ? car.retailListing.primaryImage
                : await fetchCarImage(carName);

            return {
              name: carName,
              image: imageUrl,
            };
          })
        );

        setCars(formattedCars);
      } catch (err) {
        console.error("Error fetching cars:", err);
        setCars([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (cars.length > 0) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % cars.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [cars]);

  if (loading) {
    return (
      <div
        style={{ height: "calc(100vh - 150px)" }}
        className="flex justify-center items-center bg-black text-white"
      >
        Loading cars...
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div
        style={{ height: "calc(100vh - 150px)" }}
        className="flex justify-center items-center bg-black text-white"
      >
        No cars available.
      </div>
    );
  }

  return (
    <div
      style={{ height: "calc(100vh - 150px)" }}
      className="relative w-full bg-black mt-25 mb-10 overflow-hidden"
    >
      {cars.map((car, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded">
            <h2 className="text-lg font-semibold">{car.name}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TrendingCars;
