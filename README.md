###### JAVA24 - JavaScript

###### Slutprojekt - The Movie Database

###### Erik Hultqvist

# MMDB - MyMovieDataBase

### Table of Contents
1. <ins>[Description of Project](#1-description-of-project)<ins/>
2. <ins>[Architecture oversight](#2-architecture-oversight)<ins/>
3. <ins>[Links](#3-links)<ins/>

---

## 1. Description of Project
This project is the assignment for a JavaScript course at Grit Academy, where a webpage for a movie database is being developed using **The Movie Database (TMDB) API**.

The purpose of the project is to practice working with __*APIs*__, __*JavaScript modules*__, and __*DOM manipulation*__ by building a simple movie search application.

**As a user, you can:**
- See a list of the most popular and highest-rated movies right now

- Search for a specific movie or person (such as an actor or director)

- Click on a movie to see more detailed information (e.g. release date, rating, overview, etc.)

- Click on a person to see which movies they have been involved in

In short, it’s a simplified version of IMDb where users can explore movie data in an interactive and user-friendly way.

## 2. Architecture oversight

#### __*main.js*__
Sets up UI event listeners (and controls search, sorting, and rendering of movies and persons).

---
### Modules

#### __*render.js*__
Handles all DOM rendering for movies, search results, movie pages, and errors. 
Includes helpers for showing/hiding/resetting views.
#### __*movieapi.js*__
Handles all TMDB API requests: top-rated, popular, search, movie details, trailers, and credits.

#### Classes
#### __*movieCard.js*__
Defines a MovieCard class to create and render movie summary cards (for both top10 lists and in search) using OOP. 
#### __*personCard.js*__
Defines a PersonCard class to render a person's profile using OOP principles.
#### __*moviePage.js*__
Extends MovieCard to render a detailed movie view with trailer, cast, and crew information.

---

## 3. Links

webpage: https://erihul.github.io/java24-js-slutprojekt-erik-hultqvist/

github: https://github.com/erihul/java24-js-slutprojekt-erik-hultqvist

TMDB Api documentation: https://developer.themoviedb.org/docs/getting-started


