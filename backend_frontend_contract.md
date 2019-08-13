#Users

- User object

```
{
  id: integer,
  username: string,
  password: string
}
```

<!-- ## **GET /users**

Returns all users in the system.
**Content:**

```
{
  users: [
           {<user_object>},
           {<user_object>},
           {<user_object>}
         ]
}
```

## **GET /users/:id**

Returns the specified user. -->

## **GET /users/:id/orders**

Returns all Orders associated with the specified user.

- **Headers**  
  cookie: sessionId
  **Content:**

```
{
  orders: [
           {<order_object>},
           {<order_object>},
           {<order_object>}
         ]
}
```

## **POST /signup**

Creates a new User and returns the new object.

- **Data Params**

```
  {
    id: integer,
    username: string,
    password: string
  }
```

## **POST /login**

<!-- Creates a new User and returns the new object. -->

<!-- - **Data Params**

```
  { id: integer
    username: string,
    password: string,
    email: string
  }
``` -->

#items

- item object

```
{
  id: integer
  name: string
  cost: float(2)
  available_quantity: integer
  description: string
  filePath: string
}
```

## **GET /items**

Returns all items in the system.
**Content:**

```
{
  items: [
           {<item_object>},
           {<item_object>},
           {<item_object>}
         ]
}
```

## **GET /items/:id**

Returns the specified item.

- **Headers**  
  cookie: sessionId
  **Content:** `{ <item_object> }`

## **GET /items/:id/orders**

Returns all Orders associated with the specified item.

- **Headers**  
  cookie: sessionId
  **Content:**

```
{
  orders: [
           {<order_object>},
           {<order_object>},
           {<order_object>}
         ]
}
```

## **POST /items**

Creates a new item and returns the new object.

- **Data Params**

```
  {
    id: integer
    name: string
    cost: float(2)
    available_quantity: integer
    description: string
    filePath: string
  }
```

**Content:** `{ <item_object> }`

#Orders

- Order object

```
{
  id: integer
  user_id: <user_id>
  total: float(2)
  items: [
              {
                item: <item_id>,
                quantity: integer
              },
              {
                item: <item_id>,
                quantity: integer
              },
              {
                item: <item_id>,
                quantity: integer
              },
            ]
  created_at: datetime(iso 8601)
  updated_at: datetime(iso 8601)
}
```

## **GET /orders**

Returns all orders in the system.

**Content:**

```
{
  orders: [
           {<order_object>},
           {<order_object>},
           {<order_object>}
         ]
}
```

## **GET /orders/:id**

Returns the specified order.

- **URL Params**  
  _Required:_ `id=[integer]`
- **Data Params**  
  None
- **Headers**  
  cookie: sessionId
  **Content:** `{ <order_object> }`

## **GET /orders/:id/items**

Returns all items associated with the specified order.

- **Headers**  
  cookie: sessionId
  **Content:**

```
{
  items: [
           {<item_object>},
           {<item_object>},
           {<item_object>}
         ]
}
```

## **GET /orders/:id/user**

Returns all Users associated with the specified order.

- **Headers**  
  cookie: sessionId
- **Success Response:** `{ <user_object> }`

## **POST /orders**

Creates a new Order and returns the new object.

- **Data Params**

```
  {
  	user_id: <user_id>
  	item: <item_id>,
  	quantity: integer
  }
```

- **Headers**  
  Content-Type: application/json
- **Success Response:**
  **Content:** `{ <order_object> }`
