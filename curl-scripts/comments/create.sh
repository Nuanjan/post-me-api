#!/bin/bash

API="http://localhost:4741"
URL_PATH="/comments"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "comment": {
      "text": "'"${TEXT}"'",
      "postId": "'"${POST_ID}"'",
      "commenter":"'"${USER_ID}"'"
    }
  }'

echo
