## Implementation Timeline

### Phase 1: Backend setup and Front End User Authentication (1 day, W1 Tu 6pm)

**Objective:** Functioning rails project with Authentication

- [ ] create new project
- [ ] create `User` model
- [ ] authentication
- [ ] user signup/signin pages
- [ ] blank landing page after signin

### Phase 2: House/User/List Model, API, and basic APIUtil (2 days, W1 Th 6pm)

**Objective:** Houses, Users, and Lists can be created, read, edited and destroyed through
the API.

- [ ] create `House` model
- [ ] create `User` model
- [ ] create `List` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for notes (`HousesController`)
- [ ] CRUD API for notes (`UsersController`)
- [ ] CRUD API for notes (`ListsController`)
- [ ] jBuilder views for notes
- [ ] setup Webpack & Flux scaffold
- [ ] setup `APIUtil` to interact with the API
- [ ] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (1.5 days, W1 F 6pm)

**Objective:** Houses, Users, and Lists can be created, read, edited and destroyed with the
user interface.

- [ ] setup the flux loop with skeleton files
- [ ] setup React Router
- implement each note component, building out the flux loop as needed.
  - [ ] `MessageIndex`
  - [ ] `UserIndex`
  - [ ] `ListIndex`
  - [ ] `BillIndex`
  - [ ] `CalendarIndex`


### Phase 4: Start Styling (0.5 days, W2 M 12pm)

**Objective:** Existing pages (including signup/signin) will look good.

- [ ] create a basic style guide
- [ ] position elements on the page
- [ ] add basic colors & styles

### Phase 5: Calendar/Events (1 day, W2 Tu 12pm)

**Objective:** Calendar has events, which involve certain members of the house. House members should be able to create events that can be seen by other members of their house.

- [ ] create `Event` model
- build out API, Flux loop, and components for:
  - [ ] Event CRUD
- Use CSS to style new views


### Phase 6: Messages (1 days, W2 Th 12pm)

**Objective:** Use sockets to allow for real-time messaging that can be viewed by all members of the house.

- [ ] create `Message` model
- build out API, Flux loop, and components for:
  - [ ] fetching messages for house
  - [ ] adding messages to thread
  - [ ] creating messages
- [ ] Style new elements

### Phase 7: Allow Complex Styling in Dashboard (0.5 days, W2 Th 6pm)

**objective:** Create simple dashboard for users.

- [ ] Style style style.

### Phase 8: Styling Cleanup and Seeding (1 day, W2 F 6pm)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] jQuery mobile
- [ ] Searching messages by string
- [ ] Native reminders
