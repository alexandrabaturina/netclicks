# Netclicks
## Overview
**Netclicks** is a single-based Java Script web app for searching TV series based on the following criteria.
* User search input
* Average vote rating
* Popularity
* Airing today
* Air date in the next 7 days

The app is build during [Glo Academy](https://glo.academy/) Java Script workshop and is based on the starter code provided by them.
## Features
The project consists of four parts and solves the following tasks.
* Part 1
    * Open/close side menu
    * Add dropdown menu
    * Change images on tv cards on mouseover
* Part 2
    * Open/close modal window
    * Prevent page from scrolling after modal window opening
    * Render movie cards
    * Get JSON data from server
* Part 3
    * Add preloaders
    * Handle search form
    * Fill in modal window
    * Update data in modal window
* Part 4
    * Close dropdown menu when closing main menu
    * Add links and API requests to dropdown menu items
    * Pagination
    
## Getting Started
### Prerequisites
To use the **Netclicks** web app, the [TMDb](https://www.themoviedb.org/) API is required.
### Running
Steps to run **Netclicks** from local repo.
1. Clone this repository.
2. ```cd``` into project directory.
3. Create **config.js** file.
4. Put your API key in **config.js** file.
```sh
const apiconfig = {
    API_KEY: 'YOUR_API_KEY'
}
```
5. Go to ```http://127.0.0.1:5500/index.html``` in your browser.
