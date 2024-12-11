# Flown Records

**Flown Records** is a flight tracking platform that allows pilots to upload, analyze, and visualize their flight data. The platform processes flight logs from supported file formats (CSV, JSON, and Excel), generates insightful statistics, and provides trend analysis. At the end of each year, users receive a personalized summary, similar to Spotify Wrapped, showcasing their flight achievements.

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
- **Database**: MongoDB (optional for storing user data)
- **File Parsing**: CSV, JSON, and Excel parsers to convert user data into a usable format.

## Roadmap

### Stage 1 (Basic Backend)
- [ ] Develop API routes to handle backend logic.
- [ ] Imprement data parsing to convert supported format into JSON
    - [x] XML FlightLogger LogBook Support
    - [x] XLXS FlownRecords Template Support
    - [ ] JSON FlownRecords Template Support *(Still considering)*
- [ ] Create basic analysis and trend function to be used later

### Stage 2 (Basic Frontend)
- [ ] Implement file upload for XML, JSON, and Excel formats.
- [ ] Build the user interface for data visualization and trend analysis.
- [ ] Integrate yearly summary generation and display using graphs.
- [ ] Create user profile display (yet without user login just guest profile).

### Stage 3 (Extended Backend)
- [ ] Implement possible user image format download of their graphs.
- [ ] Add user authentication (login, registration, and data tracking).
- [ ] Create an admin panel for user and data management.
- [ ] Write self tests for API to warn of any impending errors that may happen.

### Stage 4 (Extended Frontend)
- [ ] Create an admin panel for user and data management.
- [ ] Add user graphs downloads

### Stage 5 (Final)
- [ ] Deploy to a hosting platform.

## Contribution

Contributions are welcome! If you have suggestions or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.