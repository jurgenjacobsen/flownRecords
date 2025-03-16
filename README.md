# Flown Records

**Flown Records** is a flight tracking platform that allows pilots to upload, analyze, and visualize their flight data. The platform processes flight logs from supported file formats (XML, JSON, and Excel), generates insightful statistics, and provides trend analysis. At the end of each year, users receive a personalized summary, similar to Spotify Wrapped, showcasing their flight achievements.

*Project started 11/12/2024*
## Planned Features

- **User Authentication**: Implement login and registration for personalized data tracking.
- **File Upload**: Support for XML, Excel & JSON file parsing.
- **Flight Data Visualization**: Graphs and charts to represent flight statistics and trends.
- **Personalized Yearly Summary**: Automatic generation of a yearly flight summary with key statistics.
- **API Integration**: Develop a simple API for user data processing and interaction.
- **Admin Panel**: Dashboard to monitor user activity and manage uploaded flight data.

## Technologies Used

- **Frontend**: Vue.js, TailwindCSS, TypeScript
- **Backend**: Node.js with a custom API
- **Database**: MongoDB
- **File Parsing**: CSV, JSON, and Excel parsers to convert user data into a usable format.

![Chart](/shared/CHART.png)

## Roadmap

### Stage 1 (Basic Backend)
- [ ] Develop API routes to handle backend logic.
- [x] Add user authentication (login, registration, and data tracking).
    - [x] User Registration
    - [x] User Login
    - [x] User Authentication Middleware
    - [x] User Previleges and Permissions
- [x] Imprement data parsing to convert supported format into JSON
    - [x] XML FlightLogger LogBook Support
    - [x] XLXS FlownRecords Template Support
    - [x] JSON FlownRecords Template Support

### Stage 2 (Basic Frontend)
- [ ] Implement file upload section for XML, JSON, and Excel formats.
- [ ] Build the user interface for data visualization and trend analysis.
    - [ ] Display user flight statistics and trends.
    - [ ] Generate graphs and charts for data visualization.
    - [ ] Display stats such as most flown aircraft, aerodrome, average week flight hours etc.
    - [ ] Display based on their data trends/forecasts such on which date they will hit their 100th hour of flight, other milestones, achivements.
- [ ] Create user profile display (Similar to Volt.fm).

### Stage 3 (Extended Backend)
- [ ] Implement possible user image format download of their graphs.
- [ ] Create an admin panel for user and data management.
- [ ] Write self tests for API to warn of any impending errors that may happen.
- [ ] Create basic analysis and trend function to be used later
- [ ] Platform database register data for global analysis

### Stage 4 (Extended Frontend)
- [ ] Create an admin panel for user and data management.
- [ ] Add user graphs downloads
- [ ] User
- [ ] Bughunt and fix any issues that may arise.

### Stage 5 (Final)
- [ ] Deploy to a hosting platform.

### Extras
- [ ] Add support for additional file formats.

## Contribution

Contributions are welcome! If you have suggestions or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.