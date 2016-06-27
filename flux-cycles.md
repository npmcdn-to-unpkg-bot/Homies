# Flux Cycles

Flux loops are organized by data type. Under each data type, there may
be sub-categories, and each action is listed with the sequence of events
that result from its invocation, ending with the API or store. Finally,
store listeners are listed at the end.

You should be able to use this document trace an **action** starting
with where it was invoked, through the **API**/**store** involved, and
finally to the **components** that update as a result. This is important
because once you start implementing your flux loops, that's precisely
what you'll need to do.


## Messages Cycles

### Messages API Request Actions

* `fetchAllMessages`
  0. invoked from `MessageIndex` `didMount`/`willReceiveProps`
  0. `GET /house/messages` is called.
  0. `receiveAllMessages` is set as the callback.

* `createMessage`
  0. invoked from send message button `onClick`
  0. `POST /house/messages` is called.
  0. `receiveSingleMessage` is set as the callback.


### Messages API Response Actions

* `receiveAllMessages`
  0. invoked from an API callback.
  0. `Message` store updates `_messages` and emits change.

* `receiveSingleMessage`
  0. invoked from an API callback.
  0. `Message` store updates `_messages[id]` and emits change.


### Store Listeners

* `MessageIndex` component listens to `Note` store.


## Calendar Cycles

### Calendar API Request Actions

* `fetchAllEvents`
  0. invoked from `CalendarIndex` `didMount`/`willReceiveProps`
  0. `GET /house/calendar` is called.
  0. `receiveAllEvents` is set as the callback.

* `createEvent`
  0. invoked from new event button `onClick`
  0. `POST /house/calendar` is called.
  0. `receiveSingleEvent` is set as the callback.

* `fetchSingleEvent`
  0. invoked from `CalendarDetail` `didMount`/`willReceiveProps`
  0. `GET /house/calendar/:event_id` is called.
  0. `receiveSingleEvent` is set as the callback.

* `updateEvent`
  0. invoked from `CalendarForm` `onSubmit`
  0. `POST /house/calendar/:event_id` is called.
  0. `receiveSingleEvent` is set as the callback.

* `destroyEvent`
  0. invoked from delete event button `onClick`
  0. `DELETE /house/calendar/:event_id` is called.
  0. `removeEvent` is set as the callback.

### Calendar API Response Actions

* `receiveAllEvents`
  0. invoked from an API callback.
  0. `Calendar` store updates `_events` and emits change.

* `receiveSingleEvent`
  0. invoked from an API callback.
  0. `Calendar` store updates `_events[id]` and emits change.

* `removeEvent`
  0. invoked from an API callback.
  0. `Calendar` store removes `_events[id]` and emits change.

### Store Listeners

* `CalendarIndex` component listens to `Notebook` store.


## List Cycles

### Calendar API Request Actions

* `fetchAllLists`
  0. invoked from `ListIndex` `didMount`/`willReceiveProps`
  0. `GET /house/lists` is called.
  0. `receiveAllLists` is set as the callback.

* `createList`
  0. invoked from new list button `onClick`
  0. `POST /house/lists` is called.
  0. `receiveSingleList` is set as the callback.

* `fetchSingleList`
  0. invoked from `ListDetail` `didMount`/`willReceiveProps`
  0. `GET /house/:list_id` is called.
  0. `receiveSingleList` is set as the callback.

* `updateEvent`
  0. invoked from `ListForm` `onSubmit`
  0. `POST /house/:list_id` is called.
  0. `receiveSingleList` is set as the callback.

* `destroyList`
  0. invoked from delete list button `onClick`
  0. `DELETE /house/:list_id` is called.
  0. `removeList` is set as the callback.

### Calendar API Response Actions

  * `receiveAllLists`
    0. invoked from an API callback.
    0. `List` store updates `_lists` and emits change.

  * `receiveSingleList`
    0. invoked from an API callback.
    0. `List` store updates `_lists[id]` and emits change.

  * `removeList`
    0. invoked from an API callback.
    0. `List` store removes `_lists[id]` and emits change.
