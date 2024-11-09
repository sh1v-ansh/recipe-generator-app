#!/bin/bash

# Define headers
headers="Content-Type: application/json"

# Define JSON body
body='{
  "conditions": [
    {
      "field": "nutrition",
      "op": "<=",
      "value": 500,
      "field_type": "calories"
    }
  ]
}'

# Send the POST request using curl
curl -X POST "http://localhost:3000/api/recipes/search" \
     -H "$headers" \
     -d "$body"
