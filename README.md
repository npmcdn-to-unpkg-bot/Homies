# Homies

[Heroku link][https://agile-caverns-1179.herokuapp.com/]


## Minimum Viable Product

Homies is a web application that simplifies all planning and coordination between housemates. Things such as bill payments, grocery lists, messages, and chores can now all be centralized in one place. By the end of Week 9, this app will, at a minimum, satisfy the following criteria:

- [ ] Hosting on Heroku
- [ ] New account creation, login, and guest/demo login
- [ ] A production README
- [ ] Houses
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Users who belong to houses
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Lists that belong to users
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Calendar that belongs to a house
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Messages that belong to a house
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling

## Design Docs
* [View Wireframes]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]


[components]: components.md
[flux-cycles]: flux-cycles.md
[api-endpoints]: api-endpoints.md
[schema]: schema.md

## Implementation Timeline

### Phase 1: Backend setup and Front End User Authentication (1 day, W1 Tu 6pm)

**Objective:** Functioning rails project with Authentication

- [ ] create new project
- [ ] create `User` model
- [ ] authentication
- [ ] user signup/signin pages
- [ ] blank landing page after signin

### Phase 2: House, List, and Event Model, API, and basic APIUtil (1.5 days, W1 Th 12pm)

**Objective:** Notes can be created, read, edited and destroyed through
the API.

- [ ] create `House` model
- [ ] create `List` model
- [ ] create `Event` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for notes (`HousesController`)
- [ ] CRUD API for notes (`ListsController`)
- [ ] CRUD API for notes (`EventsController`)
- [ ] jBuilder views for Lists
- [ ] setup Webpack & Flux scaffold
- [ ] setup `APIUtil` to interact with the API
- [ ] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (1.5 days, W1 F 6pm)

**Objective:** Houses, Lists, and Event can be created, read, edited and destroyed with the
user interface.

- [ ] setup the flux loop with skeleton files
- [ ] setup React Router
- implement each note component, building out the flux loop as needed.
  - [ ] `HouseIndex`
  - [ ] `ListIndex`
  - [ ] `CalendarIndex`


### Phase 4: Start Styling (0.5 days, W2 M 12pm)

**Objective:** Existing pages (including signup/signin) will look good.

- [ ] create a basic style guide
- [ ] position elements on the page
- [ ] add basic colors & styles

### Phase 5: Messages (1 day, W2 Tu 12pm)

**Objective:** Messages can be sent in real-time using socket.io.

- [ ] create `Message` model
- build out API, Flux loop, and components for:
  - [ ] Message CRUD
- Use CSS to style new views

### Phase 6: Dashboard/Bills (1 days, W2 Th 12pm)

**Objective:** Notes can be tagged with multiple tags, and tags are searchable.

- [ ] create `Bill` model
- build out API, Flux loop, and components for:
  - [ ] fetching bills for house
- [ ] Style new elements


### Phase 7: Styling Cleanup and Seeding (1 day, W2 F 6pm)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] Search through messages
- [ ] Search through lists
- [ ] jQuery mobile
