# fairweatherhikers
Fairweatherhikers is a command-line-based two-resource Mongo-backed REST API for planning hikes and saving trail data. It interfaces with the National Weather Service website to pull weather data. The user may populate the trails database with their own favorite hikes or select some of the ones already contained in the db.txt file.

## Model
The model used for creating a hike is as follows:

```js
{
  loc: {
    type: String,
    required: true
  },
  lat: {
    type: Number
  },
  lon: {
    type: Number
  },
  difficulty: {
    type: String
  },
  length: {
    type: String
  },
  time: {
    type: Number
  }
}
```

## Running
Multiple terminal windows are required for setup; Iterm is a great app for this.

### Clone the app
Fork this repo and clone it on your machine:
```bash
> git clone https://github.com/cliffhangerz/fairweatherhikers
```

### Install packages
```bash
> npm install
```

### Start mongodb
```bash
> mongod --dbpath=./db
```

### Run tests
Open a second terminal window and type:
```bash
> gulp
```

### Set your app secret
```bash
> export APP_SECRET="appsecret"
```

### Run the server
```bash
> npm start
```

##Sign-up
Open a third terminal window and type:
```bash
> echo '{"email": "sasquatch@gmail.com", "password" : "bigandhairy"}' | http POST localhost:3000/api/signup
```
You can substitute your own email and password for the one above. The program will return an auth token.
MAKE SURE you copy the auth token (highlight it and control/command-C) before continuing.

##Sign-in
The following example is for users with httpie already installed. Feel free to use your own favorite CLI instead.
```bash
> http -a sasquatch@gmail.com:bigandhairy localhost:3000/api/signin
```

## CRUD operations

###POSTing a new trail
To post a new trail, use the following json format (or input an empty string). Make sure you include:
* Location (loc)
* Latitude (lat)
* Longitude (lon)
* Difficulty (difficulty) [either Easy, Moderate, or Hard]
* Length (len) in roundtrip miles
* Time (time) in hours to complete for an average hiker
* Token (between two double-quote marks, paste the value obtained from the sign-in step). Ensure that you don't put a space in between the "token": and the token value.

This information can be found at many websites. We found the Washington Trails Association (wta.org) and Hiking With My Brother (hikingwithmybrother.com) websites to be very helpful. The following is an example:
```bash
> echo '{"loc":"Commonwealth Basin - Red Mtn. Pass", "lat":47.4605, "lon":121.3976, "difficulty":"hard", "length":"7.2", "time":5.5}' | http post localhost:3000/api/trails "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGQiOiI2ZGYyMjJhMWQ1ZWQ4M2IyZThhZjA5YjNhMWM5ODY3ZWJmMzRhYmU5ZTFmNzYyZGY0MTIwYTA2MmZjNjBjOGJjIiwiaWF0IjoxNDYyMDYzMTk0fQ.yBFPeZclLScPN-K_W48Xsoj7rq8fNx5QiWHZhNRmApU"
```
After a successful post, the app returns an object id associated with this trail. This id is necessary to change trail information in a PUT request.

###PUTting new info into the db (overwrites existing document)
Any info you include in your PUT request will overwrite the entire document containing a saved trail. The format (using httpie) uses json format and is basically: http PUT <URL> <new info> <token>. Refer to the following as an example.
```bash
> http PUT localhost:3000/api/trails/5725721fa58a7568be40b281 "loc"="Commonwealth Basin - Red Mtn. Pass" "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGQiOiI2ZGYyMjJhMWQ1ZWQ4M2IyZThhZjA5YjNhMWM5ODY3ZWJmMzRhYmU5ZTFmNzYyZGY0MTIwYTA2MmZjNjBjOGJjIiwiaWF0IjoxNDYyMDYzMTk0fQ.yBFPeZclLScPN-K_W48Xsoj7rq8fNx5QiWHZhNRmApU" 
```

###GETting info from the db
GET is the default request in httpie, so you don't need to explicitly include it in the request. The following is an example that gets trail info from all trails in the db. It will include the three-day weather report for that location. 
```bash
> http localhost:3000/api/trails "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGQiOiI2ZGYyMjJhMWQ1ZWQ4M2IyZThhZjA5YjNhMWM5ODY3ZWJmMzRhYmU5ZTFmNzYyZGY0MTIwYTA2MmZjNjBjOGJjIiwiaWF0IjoxNDYyMDYzMTk0fQ.yBFPeZclLScPN-K_W48Xsoj7rq8fNx5QiWHZhNRmApU"
```

###DELETE a trail
You might want to delete a trail from the db if you no longer want fairweatherhikers to consider it as a query option.
```bash
> http DELETE localhost:3000/api/trails/57255294a58a7568be40b27e "loc"="Commonwealth Basin Trail" "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGQiOiI2ZGYyMjJhMWQ1ZWQ4M2IyZThhZjA5YjNhMWM5ODY3ZWJmMzRhYmU5ZTFmNzYyZGY0MTIwYTA2MmZjNjBjOGJjIiwiaWF0IjoxNDYyMDYzMTk0fQ.yBFPeZclLScPN-K_W48Xsoj7rq8fNx5QiWHZhNRmApU"

```

## Authors

Written by
[Ali Foreman](https://github.com/AlegriaForeman),
[Gene Troy](https://github.com/energene),
[James Norton](https://github.com/jimmynono), and
[Tim Foreman](https://github.com/T4Man)


## Acknowledgements
Thanks to the National Weather Service, the Washington Trails Association, and Hiking With My Brother, we have high quality data for use in our project.

## License

The project is licensed under the terms of the MIT license.
