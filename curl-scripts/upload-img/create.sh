API="http://localhost:4741"
URL_PATH="/uploads"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "upload": {
      "imageUrl": "'"${IMAGEURL}"'",
      "name": "'"${NAME}"'"
    }
  }'

echo
