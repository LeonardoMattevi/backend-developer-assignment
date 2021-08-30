# backend-developer-assignment
Nested set model example

## Setup

```sh
npm i
```
## Demo

```sh
npm run start:dev
```

## Build

```sh
npm run build
```

## API endpoint

```sh
api/nodes:
    get:
    summary: Finds Pets by tags
    produces:
        - application/json
    parameters:
    -   name: node_id
        in: path
        description: parent node id
        type: integer
        required: true
    -   name: language
        in: path
        description: language (italian | english)
        type: string
        required: true
    -   name: search_keyword
        in: path
        description: search text
        type: string
        required: false
    -   name: page_num
        in: path
        description: index of the page 
        type: integer
        default: 0
        required: false
    -   name: page_size
        in: path
        description: nodes size (0 - 100)
        type: integer
        default: 100
        required: false
    responses:
        200:
          description: successful operation
          schema:
        400:
            description: Missing mandatory params
        404:
            description: Invalid node id

```