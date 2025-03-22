# Flown Records

A web application that allows users to import flight data from FlightLogger, visualize statistics, analyze trends, and compare performance through leaderboards.

*Project started 11/12/2024*

---

## ✈️ Features  
- User authentication & profile management  
- Import flight data from FlightLogger  
- Interactive charts and statistics  
- Generate "Spotify Wrapped"-style reports  
- Leaderboards for comparing flight statistics  
- Available as a **web app**, **Electron app**, and **future mobile app**  

## 📂 Tech
### Frontend
- Framework: Vue 3
- UI: TailwindCSS
- State Management: Pinia
- Charts & Graphs: Chart.js/ApexCharts
- Electron: To package the web app as a desktop app

### Backend
- Runtime: Node.js
- Framework: NestJS
- Database: MongoDB
- Authentication: Firebase Auth/Auth0

### Mobile App (Future)
- Framework: Vue Native (if you want to stick with Vue) or Flutter/React Native (better long-term options)

## 📖 Execution Plan
### 1. MVP (Minimum Viable Product)
- Set up Vue frontend with authentication
- Create backend API to fetch and store FlightLogger data
- Display basic statistics and charts

### 2. Expand Features
- Implement leaderboards
- Generate shareable reports (like Spotify Wrapped)
- Package as an Electron app
### 3. Optimize & Future Mobile App
- Optimize performance
- Decide on the best mobile framework (Vue Native, Flutter, or React Native)

## 🧮Structure
![Chart](/docs/CHART.png)


## Contribution

Contributions are welcome! If you have suggestions or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.