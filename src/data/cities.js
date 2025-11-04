// Centralized city & homestay data used across the app
export const cities = [
  {
    city: "Mumbai",
    desc: "Vibrant city by the sea",
    hotels: [
      { name: "Marine View Hotel", rate: 4200, rating: 4.5, img: "/3.jpg" },
      { name: "Gateway Suites", rate: 3500, rating: 4.1, img: "/1.jpg" },
    ],
    sightseeing: [
      { name: 'Gateway of India', price: 300, img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=60', desc: 'Iconic arch and waterfront. Great for sunrise and short guided tours.' },
      { name: 'Marine Drive Promenade', price: 0, img: 'https://images.unsplash.com/photo-1505765058047-0b8f8b0e3f96?auto=format&fit=crop&w=800&q=60', desc: 'Charming seaside promenade — free to visit.' },
      { name: 'Elephanta Caves', price: 800, img: 'https://images.unsplash.com/photo-1549893077-3b6b73b7f3d6?auto=format&fit=crop&w=800&q=60', desc: 'UNESCO heritage rock-cut temples on Elephanta Island.' },
      { name: 'Chor Bazaar Walk', price: 150, img: 'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=800&q=60', desc: 'Explore vintage finds and local markets with a guide.' },
      { name: 'Sanjay Gandhi National Park', price: 120, img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60', desc: 'Green escape with short treks and the Kanheri caves.' },
      { name: 'Haji Ali Dargah', price: 50, img: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c7?auto=format&fit=crop&w=800&q=60', desc: 'A serene dargah set on a small islet.' },
    ],
  },
  {
    city: "Delhi",
    desc: "Historic and modern attractions",
    hotels: [
      { name: "Connaught Comfort", rate: 2900, rating: 4.0, img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb" },
      { name: "Heritage Inn", rate: 3200, rating: 4.3, img: "https://images.unsplash.com/photo-1501117716987-c8e9f6d2f0d2" },
    ],
    sightseeing: [
      { name: 'Red Fort', price: 250, img: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c7?auto=format&fit=crop&w=800&q=60', desc: 'Historic Mughal fortress with guided history tours.' },
      { name: 'Qutub Minar', price: 200, img: 'https://images.unsplash.com/photo-1526481280698-6f0b8b9b8b6a?auto=format&fit=crop&w=800&q=60', desc: 'Ancient minaret and surrounding archeological area.' },
      { name: 'India Gate & Rajpath', price: 0, img: 'https://images.unsplash.com/photo-1563201519-9b7b3d3b1b26?auto=format&fit=crop&w=800&q=60', desc: 'National monument and open lawns; free to visit.' },
      { name: 'Humayun Tomb', price: 150, img: 'https://images.unsplash.com/photo-1533105079822-2fe8bc6f6f6d?auto=format&fit=crop&w=800&q=60', desc: 'Serene Mughal garden tomb; photogenic.' },
      { name: 'Akshardham Temple', price: 100, img: 'https://images.unsplash.com/photo-1582106990513-7bda1e6f6d4d?auto=format&fit=crop&w=800&q=60', desc: 'Modern temple with cultural exhibitions.' },
      { name: 'Old Delhi Food Walk', price: 400, img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60', desc: 'Guided food walk through the lanes of Old Delhi.' },
    ],
  },
  {
    city: "Bengaluru",
    desc: "Tech hub with green parks",
    hotels: [
      { name: "Silicon Residency", rate: 3800, rating: 4.4, img: "/2.jpg" },
      { name: "Garden Stay", rate: 2600, rating: 3.9, img: "https://images.unsplash.com/photo-1509099836639-18ba9b4d1d4a" },
    ],
    sightseeing: [
      { name: 'Lalbagh Botanical Garden', price: 100, img: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=60', desc: 'Large botanical garden with glasshouse & seasonal flowers.' },
      { name: 'Bangalore Palace', price: 250, img: 'https://images.unsplash.com/photo-1505483531331-8d8f7e8f1d4b?auto=format&fit=crop&w=800&q=60', desc: 'Palatial structure inspired by Windsor castle.' },
      { name: 'Cubbon Park & Museum', price: 0, img: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=800&q=60', desc: 'Central green space with cultural institutions.' },
      { name: 'Commercial Street Shopping', price: 0, img: 'https://images.unsplash.com/photo-1520975912314-4f3f1c7f0dba?auto=format&fit=crop&w=800&q=60', desc: 'Bustling shopping streets for local goods.' },
      { name: 'Nandi Hills Sunrise', price: 500, img: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=800&q=60', desc: 'Early morning drive to viewpoint for sunrise.' },
      { name: 'Tipu Sultan Summer Palace', price: 120, img: 'https://images.unsplash.com/photo-1535385790556-6a6f7a0f9b3a?auto=format&fit=crop&w=800&q=60', desc: 'Historic palace with teak architecture.' },
    ],
  },
  {
    city: "Hyderabad",
    desc: "Historic Charminar & cuisines",
    hotels: [
      { name: "Charminar Lodge", rate: 2200, rating: 4.2, img: "/1.jpg" },
      { name: "Pearl Comfort", rate: 2800, rating: 4.0, img: "/3.jpg" },
    ],
    sightseeing: [
      { name: 'Charminar Visit', price: 150, img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=60', desc: 'Visit the iconic Charminar and nearby markets.' },
      { name: 'Golconda Fort', price: 300, img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=60', desc: 'Historic fort with light-and-sound show options.' },
      { name: 'Salar Jung Museum', price: 120, img: 'https://images.unsplash.com/photo-1526481280698-6f0b8b9b8b6a?auto=format&fit=crop&w=800&q=60', desc: 'Large museum with eclectic collections.' },
      { name: 'Hussain Sagar & Necklace Road', price: 0, img: 'https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=800&q=60', desc: 'Lakeside promenade and boating.' },
      { name: 'Ramoji Film City (short tour)', price: 900, img: 'https://images.unsplash.com/photo-1505765058047-0b8f8b0e3f96?auto=format&fit=crop&w=800&q=60', desc: 'Studio tour with themed attractions.' },
      { name: 'Laad Bazaar Walk', price: 0, img: 'https://images.unsplash.com/photo-1535385790556-6a6f7a0f9b3a?auto=format&fit=crop&w=800&q=60', desc: 'Traditional shopping street for bangles and pearls.' },
    ],
  },
  {
    city: "Kolkata",
    desc: "Cultural capital with colonial charm",
    hotels: [
      { name: "Kolkata Comfort", rate: 2400, rating: 4.0, img: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b" },
      { name: "Hooghly Residency", rate: 2000, rating: 3.8, img: "https://images.unsplash.com/photo-1505691723518-36a7b1f7d6c2" },
    ],
    sightseeing: [
      { name: 'Victoria Memorial', price: 200, img: 'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=800&q=60', desc: 'Monument and museum set in picturesque gardens.' },
      { name: 'Howrah Bridge & Riverfront', price: 0, img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=60', desc: 'Iconic bridge and riverside views.' },
      { name: 'Princep Ghat', price: 0, img: 'https://images.unsplash.com/photo-1501963212515-3c3b6e6ef8f9?auto=format&fit=crop&w=800&q=60', desc: 'Riverside promenade with boating options.' },
      { name: 'Kumartuli Pottery Walk', price: 120, img: 'https://images.unsplash.com/photo-1509099836639-18ba9b4d1d4a?auto=format&fit=crop&w=800&q=60', desc: 'Explore traditional sculptors and workshops.' },
      { name: 'Fort William (drive-by)', price: 0, img: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=800&q=60', desc: 'Historic fort by the river.' },
      { name: 'Dakshineswar Kali Temple', price: 50, img: 'https://images.unsplash.com/photo-1501117716987-c8e9f6d2f0d2?auto=format&fit=crop&w=800&q=60', desc: 'Prominent temple with devotional atmosphere.' },
    ],
  },
  {
    city: "Kerala",
    desc: "Backwaters, beaches and hill stations",
    hotels: [
      { name: "Alleppey Houseboat Stay", rate: 4200, rating: 4.6, img: "/kerala.jpg" },
      { name: "Munnar View Cottage", rate: 3300, rating: 4.3, img: "https://images.unsplash.com/photo-1501963212515-3c3b6e6ef8f9" },
    ],
    sightseeing: [
      { name: 'Alleppey Backwaters Cruise', price: 1200, img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60', desc: 'Scenic houseboat cruises and local village visits.' },
      { name: 'Munnar Tea Gardens', price: 900, img: 'https://images.unsplash.com/photo-1501963212515-3c3b6e6ef8f9?auto=format&fit=crop&w=800&q=60', desc: 'Rolling tea estates and cool hill walks.' },
      { name: 'Kovalam Beach', price: 0, img: 'https://images.unsplash.com/photo-1505483531331-8d8f7e8f1d4b?auto=format&fit=crop&w=800&q=60', desc: 'Popular beach for sun and local seafood.' },
      { name: 'Thekkady Spice Plantation', price: 700, img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=60', desc: 'Spice garden tours and boat safaris.' },
      { name: 'Wayanad Waterfalls', price: 500, img: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=800&q=60', desc: 'Nature trails and waterfall viewpoints.' },
      { name: 'Fort Kochi Walk', price: 150, img: 'https://images.unsplash.com/photo-1520975912314-4f3f1c7f0dba?auto=format&fit=crop&w=800&q=60', desc: 'Historic Fort Kochi walking tour and art cafes.' },
    ],
  },
];

export default cities;
