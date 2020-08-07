API="http://localhost:4741"
URL_PATH="/upload"

curl "${API}${URL_PATH}/${ID}" \
--include \
--request POST \
--header 'Content-Type': 'multipart/form-data' \
