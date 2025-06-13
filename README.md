![Flight Records Banner](/docs/BANNER.png)
# Flown Records
Flown Records is a flight logbook platform that allows pilots to upload, analyze, and visualize their flight data.

> 

![wakatime](https://wakatime.com/badge/user/010adc07-6382-419f-87bc-0b3f507ee495/project/440380b2-3680-40c8-8052-6deee56d18b4.svg?style=flat-square)
![Gitmoji](https://img.shields.io/badge/gitmoji-%20%E2%9C%88%EF%B8%8F%20%F0%9F%98%8D-191919.svg?style=flat-square)

> **Project started December 11th, 2024**

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
- Electron: To package the web app as a desktop app

### Backend
- Runtime: Node.js
- Framework: NestJS
- Database: Prisma (PostgreSQL)
- Authentication: JWT

## 📖 Execution Plan
### Minimum Viable Product (MVP) 
- User authentication (sign up, login, profile management)
- Import flight data from FlightLogger
- Basic flight statistics (total flights, total hours, etc.)
- Basic charts for visualizing flight data
- Prep database schema to support future features

### 2nd Phase
- Advanced flight statistics (average flight duration, longest flight, etc.)
- "Spotify Wrapped"-style report generation
- Organizations and teams for collaborative logbook management, including leaderboards (e.g., most flights, longest flight, etc.)
- Mobile app development (web app similar to the desktop app)
- Logbook entry view and management (a detailed view of each flight with options to edit, delete, and add notes)

### 3rd Phase
- Flight tracking app
- Logbook entry x flight track recording *(linking)*
- Code refactoring and optimization
- Additional features based on user feedback

### 4th Phase 
- Flight planner platform
- Logbook entry x flight plan *(linking)*
- Q&A platform (#11)

## Structure
![Chart](/docs/CHART.png)

## Contribution
Contributions are welcome! If you have suggestions or improvements, feel free to open an issue or submit a pull request.

## License
This project is licensed under the [MIT license](/LICENSE). 

## Useful Resources & Links
https://github.com/vuejs/awesome-vue