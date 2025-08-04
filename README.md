# 🌦️ Weather App – Real-time Weather PWA using Next.js

A sleek and modern **Progressive Web App (PWA)** built with **Next.js** that provides real-time weather information, geolocation support, offline access, and installable features for mobile and desktop devices.

![Weather App Banner](public/icons/icon-512.png)

---

## 🚀 Features

- 📍 **Automatic Geolocation**: Detects your location to fetch accurate weather.
- 🔍 **City Search & Suggestions**: Search for any city worldwide with instant suggestions.
- 🌤️ **Detailed Weather Info**: Temperature, humidity, wind, pressure, UV index, and more.
- 📴 **Offline Support**: Works even without internet via service worker caching.
- 📲 **Installable PWA**: Prompts users to install app for a native-like experience.
- 🎨 **Responsive & Animated UI**: Smooth animations with weather-based backgrounds.
- 🌐 **Online/Offline Detection**: Shows a banner when you're offline.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **PWA Support**: [next-pwa](https://github.com/shadowwalker/next-pwa)
- **Styling**: CSS Modules + `animate.css`
- **API**: Custom `/api/weather` endpoint with location and search support
- **Geolocation**: Native browser `navigator.geolocation`

---

## 📦 Setup & Development

### 1. **Clone the repo**
```bash
git clone https://github.com/deodeepkunj/pwa-next-app
cd weather-app
```

---

##  Install dependencies
npm install
or
yarn install

---


## Run the app locally
npm run dev
or
yarn dev

## 🌐 Deploy as a PWA
1. Build for production
npm run build
2. Start production server
npm start
Service worker will be registered automatically.
Manifest and icons will be used for installation prompt.

---

## 📲 “Add to Home Screen”
1. Open the live app in Chrome (desktop or mobile).  
2. After ≈30 s of engagement you’ll see the “Install Weather App” prompt.  
3. Tap **Install** → the app is now available in the app launcher and works offline.

---

## 🔒 Permissions
- Location access is requested once; users can deny and use manual search instead.
- No other sensitive permissions are required.

---

## 🔗 Live Demo

👉 [Check out the live Weather App here](https://pwa-next-app-alpha.vercel.app/)

---

## ✨ Connect with Me
- 💼 Portfolio: https://deodeepkunj.dev
- ✍️ Medium Blog: https://medium.com/@deodeepkunj
- 🔗 LinkedIn: [Follow me](https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=deodeepkunj)

---

## 🙏 Thank you
Thanks for checking out the project—your feedback and contributions are always welcome!

---