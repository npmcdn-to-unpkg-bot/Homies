# Homies

Homies is a web application that simplifies all planning and coordination between housemates. Things such as bill payments, grocery lists, messages, and chores can now all be centralized in one place.

## Motivation

People often have several different apps installed to take on these challenges - GroupMe & Facebook Messenger are widely used Messaging applications, Venmo is a money-managing app with a constantly increasing user base, etc.  I've found this decentralized approach of having several different apps handle different living-oriented tasks a bit troublesome.

## Technology Stack

* Frontend: React.js/Flux Architecture
* Backend: Ruby/Rails
* Database: PostgreSQL

* Main Features
  * Bills
    * Tracks all bills (as well as their status) to keep an aggregate sum of the amount of money you owe and how much money you've already paid.
  * Messages
    * A real-time chat feature allows housemates to quickly discuss information within the application.
  * Lists
    * Allows housemates to keep track of things like grocery lists, chores, and other items that are reduce duplication and confusion.
  * Events
    * A Google-like calendar in that you are able to drag and drop events to create them, which keeps housemates in the loop about what is going on.
  * Dashboard View
    * The dashboard view selects pieces of information from the four sections - namely the latest messages, upcoming events, last modified list, and bills you owe but have not yet paid - and aggregates this information so users can quickly be updated on what matters.
