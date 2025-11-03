export interface TimezoneData {
  country: string;
  city: string;
  zone: string;
}

export const timezoneData: TimezoneData[] = [
  // 🌍 Europe
  { country: "United Kingdom", city: "London", zone: "Europe/London" },
  { country: "France", city: "Paris", zone: "Europe/Paris" },
  { country: "Germany", city: "Berlin", zone: "Europe/Berlin" },
  { country: "Germany", city: "Munich", zone: "Europe/Berlin" },
  { country: "Germany", city: "Hamburg", zone: "Europe/Berlin" },
  { country: "Germany", city: "Cologne", zone: "Europe/Berlin" },
  { country: "Germany", city: "Frankfurt", zone: "Europe/Berlin" },
  { country: "Spain", city: "Madrid", zone: "Europe/Madrid" },
  { country: "Italy", city: "Rome", zone: "Europe/Rome" },
  { country: "Netherlands", city: "Amsterdam", zone: "Europe/Amsterdam" },
  { country: "Sweden", city: "Stockholm", zone: "Europe/Stockholm" },
  { country: "Norway", city: "Oslo", zone: "Europe/Oslo" },
  { country: "Russia", city: "Moscow", zone: "Europe/Moscow" },

  // 🌎 Americas
  { country: "United States", city: "New York", zone: "America/New_York" },
  {
    country: "United States",
    city: "Los Angeles",
    zone: "America/Los_Angeles",
  },
  { country: "United States", city: "Chicago", zone: "America/Chicago" },
  { country: "United States", city: "Houston", zone: "America/Chicago" },
  {
    country: "United States",
    city: "San Francisco",
    zone: "America/Los_Angeles",
  },
  { country: "United States", city: "Miami", zone: "America/New_York" },
  {
    country: "United States",
    city: "Washington D.C.",
    zone: "America/New_York",
  },
  { country: "United States", city: "Dallas", zone: "America/Chicago" },
  { country: "United States", city: "Seattle", zone: "America/Los_Angeles" },
  { country: "United States", city: "Boston", zone: "America/New_York" },
  { country: "Canada", city: "Toronto", zone: "America/Toronto" },
  { country: "Canada", city: "Vancouver", zone: "America/Vancouver" },
  { country: "Brazil", city: "São Paulo", zone: "America/Sao_Paulo" },
  { country: "Mexico", city: "Mexico City", zone: "America/Mexico_City" },
  {
    country: "Argentina",
    city: "Buenos Aires",
    zone: "America/Argentina/Buenos_Aires",
  },

  // 🇵🇰 Pakistan
  { country: "Pakistan", city: "Karachi", zone: "Asia/Karachi" },
  { country: "Pakistan", city: "Lahore", zone: "Asia/Karachi" },
  { country: "Pakistan", city: "Islamabad", zone: "Asia/Karachi" },
  { country: "Pakistan", city: "Rawalpindi", zone: "Asia/Karachi" },
  { country: "Pakistan", city: "Faisalabad", zone: "Asia/Karachi" },
  { country: "Pakistan", city: "Multan", zone: "Asia/Karachi" },
  { country: "Pakistan", city: "Hyderabad", zone: "Asia/Karachi" },
  { country: "Pakistan", city: "Peshawar", zone: "Asia/Karachi" },
  { country: "Pakistan", city: "Quetta", zone: "Asia/Karachi" },
  { country: "Pakistan", city: "Sialkot", zone: "Asia/Karachi" },
  { country: "Pakistan", city: "Gujranwala", zone: "Asia/Karachi" },

  // 🇸🇦 Saudi Arabia
  { country: "Saudi Arabia", city: "Riyadh", zone: "Asia/Riyadh" },
  { country: "Saudi Arabia", city: "Jeddah", zone: "Asia/Riyadh" },
  { country: "Saudi Arabia", city: "Mecca", zone: "Asia/Riyadh" },
  { country: "Saudi Arabia", city: "Medina", zone: "Asia/Riyadh" },
  { country: "Saudi Arabia", city: "Dammam", zone: "Asia/Riyadh" },
  { country: "Saudi Arabia", city: "Khobar", zone: "Asia/Riyadh" },

  // 🇦🇪 United Arab Emirates
  { country: "United Arab Emirates", city: "Dubai", zone: "Asia/Dubai" },
  { country: "United Arab Emirates", city: "Abu Dhabi", zone: "Asia/Dubai" },
  { country: "United Arab Emirates", city: "Sharjah", zone: "Asia/Dubai" },
  { country: "United Arab Emirates", city: "Ajman", zone: "Asia/Dubai" },

  // 🌏 Asia (others)
  { country: "India", city: "Delhi", zone: "Asia/Kolkata" },
  { country: "China", city: "Beijing", zone: "Asia/Shanghai" },
  { country: "Japan", city: "Tokyo", zone: "Asia/Tokyo" },
  { country: "Singapore", city: "Singapore", zone: "Asia/Singapore" },
  { country: "Hong Kong", city: "Hong Kong", zone: "Asia/Hong_Kong" },
  { country: "South Korea", city: "Seoul", zone: "Asia/Seoul" },
  { country: "Thailand", city: "Bangkok", zone: "Asia/Bangkok" },
  { country: "Indonesia", city: "Jakarta", zone: "Asia/Jakarta" },
  { country: "Malaysia", city: "Kuala Lumpur", zone: "Asia/Kuala_Lumpur" },

  // 🌍 Africa
  {
    country: "South Africa",
    city: "Johannesburg",
    zone: "Africa/Johannesburg",
  },
  { country: "Egypt", city: "Cairo", zone: "Africa/Cairo" },
  { country: "Nigeria", city: "Lagos", zone: "Africa/Lagos" },
  { country: "Kenya", city: "Nairobi", zone: "Africa/Nairobi" },
  { country: "Morocco", city: "Casablanca", zone: "Africa/Casablanca" },

  // 🌏 Oceania
  { country: "Australia", city: "Sydney", zone: "Australia/Sydney" },
  { country: "Australia", city: "Melbourne", zone: "Australia/Melbourne" },
  { country: "Australia", city: "Perth", zone: "Australia/Perth" },
  { country: "Australia", city: "Brisbane", zone: "Australia/Brisbane" },
  { country: "New Zealand", city: "Auckland", zone: "Pacific/Auckland" },
];
