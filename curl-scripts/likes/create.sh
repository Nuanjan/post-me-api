#!/bin/bash

API="http://localhost:4741"
URL_PATH="/likes"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "like": {
      "like": "'"${LIKE}"'",
      "postId": "'"${POST_ID}"'",
      "liketer":"'"${USER_ID}"'"
    }
  }'

echo
