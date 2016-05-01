# fairweatherhikers

##Sign-up
echo '{"username": "tim", "password" : "password1", "email": "def@gmail.com"}' | http POST localhost:3000/api/signup

##Sign-in
http -a tim:password1 localhost:3000/api/signin

##POST Example
echo '{"loc":"Commonwealth Basin - Red Mtn. Pass", "lat":47.4605, "lon":121.3976, "difficulty":"hard", "length":"7.2", "time":5.5}' | http post localhost:3000/api/trails "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGQiOiI2ZGYyMjJhMWQ1ZWQ4M2IyZThhZjA5YjNhMWM5ODY3ZWJmMzRhYmU5ZTFmNzYyZGY0MTIwYTA2MmZjNjBjOGJjIiwiaWF0IjoxNDYyMDYzMTk0fQ.yBFPeZclLScPN-K_W48Xsoj7rq8fNx5QiWHZhNRmApU"

##PUT Example
http PUT localhost:3000/api/trails/5725721fa58a7568be40b281 "loc"="Commonwealth Basin - Red Mtn. Pass" "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGQiOiI2ZGYyMjJhMWQ1ZWQ4M2IyZThhZjA5YjNhMWM5ODY3ZWJmMzRhYmU5ZTFmNzYyZGY0MTIwYTA2MmZjNjBjOGJjIiwiaWF0IjoxNDYyMDYzMTk0fQ.yBFPeZclLScPN-K_W48Xsoj7rq8fNx5QiWHZhNRmApU"

##DELETE Example
http DELETE localhost:3000/api/trails/57255294a58a7568be40b27e "loc"="Commonwealth Basin Trail" "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGQiOiI2ZGYyMjJhMWQ1ZWQ4M2IyZThhZjA5YjNhMWM5ODY3ZWJmMzRhYmU5ZTFmNzYyZGY0MTIwYTA2MmZjNjBjOGJjIiwiaWF0IjoxNDYyMDYzMTk0fQ.yBFPeZclLScPN-K_W48Xsoj7rq8fNx5QiWHZhNRmApU"

##GET Examplehttp localhost:3000/api/trails "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGQiOiI2ZGYyMjJhMWQ1ZWQ4M2IyZThhZjA5YjNhMWM5ODY3ZWJmMzRhYmU5ZTFmNzYyZGY0MTIwYTA2MmZjNjBjOGJjIiwiaWF0IjoxNDYyMDYzMTk0fQ.yBFPeZclLScPN-K_W48Xsoj7rq8fNx5QiWHZhNRmApU"
