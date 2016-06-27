# Schema Information

## users
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
last_name   | string    | not null
first_name  | string    | not null
house_id    | integer   | not null, foreign key (references houses), indexed

## lists
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
title       | string    | not null
description | string    |

## items
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
list_id     | integer   | not null, foreign key (references lists), indexed
completed   | boolean   | not null

## messages
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
content     | string    | not null
user_id     | integer   | not null, foreign key (references users), indexed

## calendar
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
house_id    | integer   | not null, foreign key (references houses), indexed

## events
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
name            | string    | not null
description     | string    | not null
start_date      | datetime  | not null
end_date        | datetime  | not null
start_time      | datetime  | not null
end_time        | datetime  | not null
user_id         | integer   | not null, foreign key (references users), indexed
calendar_id     | integer    | not null, foreign key (references calendar), indexed

## bills
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
description     | string    | not null
due_date        | datetime  | not null
user_id (req)   | integer    | not null, foreign key (references users), indexed
user_id (res)   | integer    | not null, foreign key (references users), indexed
