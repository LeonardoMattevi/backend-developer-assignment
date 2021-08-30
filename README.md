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
swagger

```sh
api/nodes:
    get:
        summary: Find nodes by parent
        produces:
            - application/json
        parameters:
        -   name: node_id
            in: query
            description: parent node id
            type: integer
            required: true
        -   name: language
            in: query
            description: language [italian, english]
            type: string
            enum:
            - italian
            - english
            required: true
        -   name: search_keyword
            in: query
            description: search text
            type: string
            required: false
        -   name: page_num
            in: query
            description: index of the pager
            type: integer
            default: 0
            required: false
        -   name: page_size
            in: query
            description: nodes size (0 - 100)
            type: integer
            default: 100
            required: false
        responses:
            200:
                description: successful operation
                description: successful operation
                schema:
                    type: array
                    items:
                        $ref: '#/definitions/NodeResponse'
            400:
                description: Missing mandatory params
            404:
                description: Invalid node id
        definitions:
            NodeResponse:
                type: object
                properties:
                nodes:
                    type: array
                    items:
                        $ref: '#/definitions/NodeItem'
                error:
                    type: string
                xml:
                    name: NodeItem
            NodeItem:
                type: object
                properties:
                node_id:
                    type: integer
                    format: int64
                name:
                    type: string
                children_count:
                    type: integer
                    format: int64
                xml:
                    name: NodeItem

```