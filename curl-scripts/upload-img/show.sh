#!/bin/sh

API="http://localhost:4741"
URL_PATH="/uploads"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "upload": {
      "owner": "'"${USER_ID}"'"
    }
  }'

echo
