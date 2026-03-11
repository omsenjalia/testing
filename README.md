# 🌍 Forg Globe

A stunning, real-time 3D visualization of the **Forg** builder ecosystem. Explore the global community of founders and builders shipping their dreams in public.

![Forg Globe Preview](https://api.forg.to/logo.png)

## 🚀 Features

- **Interactive 3D Globe**: Built with `globe.gl` and `Three.js` for smooth, immersive navigation.
- **Real-Time API Integration**: Dynamically fetches active builders and products from the [Forg API](https://api.forg.to/docs).
- **Smart Geocoding**: Converts free-text location strings from builder profiles into geographic coordinates via Nominatim.
- **Unified Search**: Quickly find builders by name, username, or location.
- **Dynamic Themes**: Toggle between high-contrast **Dark Mode** and clean **Light Mode** with synchronized globe textures (NASA Blue Marble / Earth Night).
- **Responsive Profile Widgets**: View builder stats, products, and bios with a single click.

## 🛠️ Architecture

### Frontend
- **Framework**: Next.js 15 (App Router)
- **3D Engine**: `react-globe.gl` / `Three.js`
- **Styling**: Inline React styles with a 'New Brutalism' aesthetic (Anton & IBM Plex Mono typography).
- **Components**: Dynamic client-side rendering for optimal 3D performance.

### Backend (Proxy Routes)
- `/api/builders`: The core engine. It fetches products, extracts unique builders, retrieves full profiles, and performs rate-limited geocoding.
- `/api/forg/user`: Proxy for individual profile lookups.
- `/api/forg/products`: Proxy for user-specific product lists.

## ⚙️ Setup

1. **Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   FORG_API_KEY=your_api_key_here
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Production Build**:
   ```bash
   npm run build
   npm start
   ```

## 🤝 OpenStreetMap Nominatim
This project uses the Nominatim API for geocoding. We strictly adhere to their [usage policy](https://operations.osmfoundation.org/policies/nominatim/), including proper `User-Agent` identification and a 1-second delay between requests.

---

Built with ❤️ for the [Forg](https://forg.to) community.
