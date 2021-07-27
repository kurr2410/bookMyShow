var express = require('express');
const cors = require("cors");
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
var app = express();

const dbUrl = 'mongodb://localhost:27017/bookMyShow';

app.use(cors());
app.use(bodyParser.json({ limit: '50mb', 'Content-type': 'application/json' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))

const userSchema = mongoose.Schema({
    email: String,
    password: String
}, {
    timestamps: true
})

const movieSchema = mongoose.Schema({
    imageUrl: String,
    name: String,
    theaters: []
})


// const theaterSchema = mongoose.Schema({
//     name:String,
//     address:String,
//     shows:[{ type: mongoose.Schema.Types.ObjectId, ref: 'show' }],
//     movie:[{ type: mongoose.Schema.Types.ObjectId, ref: 'movie' }]
// })

// const showSchema = mongoose.Schema({
//     start_time:String,
//     end_time:String,
//     theater:[{ type: mongoose.Schema.Types.ObjectId, ref: 'theater' }],
//     seats:[]
// })


const userModel = mongoose.model('user', userSchema);
const movieModel = mongoose.model('movie', movieSchema);

app.listen(3000, () => {
    console.log("server is listening")
});

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, {
    useNewUrlParser: true
}).then(() => {
    console.log("database connected successfully")
}).catch(err => {
    console.log("Couldn't connect to database", err);
    process.exit();
})


app.get('/', (req, res) => {
    new Controller().getAllUser((err, data) => {
        if (err) {
            res.send("NotOk")
        } else {
            //console.log(data)
            var user = [];

            data.forEach(element => {
                var a = {}
                a["email"] = element.email;
                a["password"] = element.password;
                user.push(a)
            });
            res.send(user)
        }
    })
})


app.get('/movie', (req, res) => {
    new Controller().getAllMovie((err, data) => {
        if (err) {
            res.send("NotOk")
        } else {
            //console.log(data)
            var movie = [];

            data.forEach(element => {
                var a = {}
                a["imageUrl"] = element.imageUrl;
                a["name"] = element.name;
                a["theaters"] = element.theaters;
                movie.push(a);
            });
            res.send(movie)
        }
    })
})


app.put('/updateSeats', (req, res) => {
    // console.log(JSON.stringify(req.body));

    new Controller().updateSeats(req.body, (err, data) => {
        if (err) {
            res.send("NotOk")
        } else {
            //console.log(data)
            var movie = [];

            data.forEach(element => {
                var a = {}
                a["imageUrl"] = element.imageUrl;
                a["name"] = element.name;
                a["theaters"] = element.theaters;
                movie.push(a);
            });
            res.send(movie)
        }
    })
})

app.post('/addUser', (req, res) => {

    new Controller().addUser(req.body, (err, data) => {
        if (err) {
            res.send("NotOk")
        } else {
            var user = [];
            data.forEach(element => {
                var a = {}
                a["email"] = element.email;
                a["password"] = element.password;
                user.push(a);
            });
            res.send(user)
        }
    })
})

app.post('/addMovie', (req, res) => {
    new Controller().addMovie(req.body, (err, data) => {
        if (err) {
            res.send("NotOk")
        } else {
            var movie = [];
            data.forEach(element => {
                var a = {}
                a["imageUrl"] = element.imageUrl;
                a["name"] = element.name;
                a["theaters"] = element.theaters;
                movie.push(a);
            });
            res.send(movie)
        }
    })
})


app.delete('/deleteMovie/:movie', (req, res) => {
    let movieName = {
        "name": req.params.movie
    }
    new Controller().deleteMovie(movieName, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            var movie = [];
            data.forEach(element => {
                var a = {}
                a["imageUrl"] = element.imageUrl;
                a["name"] = element.name;
                a["theaters"] = element.theaters;
                movie.push(a)
            });
            res.send(movie)
        }
    })

})


class Controller {

    getAllUser(callback) {
        userModel.find((err, datalist) => {
            if (err) {
                callback(err)
            } else {
                console.log("data fetched")
                callback(null, datalist)
            }

        })
    }

    getAllMovie(callback) {
        movieModel.find((err, datalist) => {
            if (err) {
                callback(err)
            } else {
                console.log("data fetched")
                callback(null, datalist)
            }

        })
    }

    updateSeats(data, callback) {
        movieModel.find((err, datalist) => {
            if (err) {
                callback(err)
            } else {
                datalist.forEach((element) => {
                    if (element.name === data.movieName) {
                        var movie = element;
                        var id = element._id;
                        const set1 = new Set();
                        data.seats.forEach((seat) => {
                            set1.add(seat);
                        })
                        movie.theaters.forEach((theater) => {
                            if (theater.name == data.theater) {
                                theater.shows.forEach((show) => {
                                    if (show.start_time === data.show) {
                                        show.seats.forEach((seat) => {
                                            if (set1.has(seat.number)) {
                                            }
                                        })
                                    }
                                })
                            }
                        });

                        let movieName = {
                            "name": movie.name
                        }
                        movieModel.findOneAndDelete(movieName, (err, data) => {
                            if (err) {
                                console.log(err)
                            } else {
                                movieModel.insertMany(movie, (err, dataList) => {
                                    if (err) {
                                        callback(err)
                                    } else {
                                        movieModel.find((err, datalist) => {
                                            if (err) {
                                                callback(err)
                                            } else {
                                                console.log("seat Updated")
                                                callback(null, datalist)
                                            }
                                        })
                                    }
                                })
                
                            }
                        })
                    }
                })
            }
        })

        

    }

    addUser(user, callback) {
        userModel.insertMany(user, (err, dataList) => {
            if (err) {
                callback(err)
            } else {
                userModel.find((err, datalist) => {
                    if (err) {
                        callback(err)
                    } else {
                        console.log("user added")
                        callback(null, datalist)
                    }
                })
            }
        })
    }

    addMovie(movie, callback) {
        movieModel.insertMany(movie, (err, dataList) => {
            if (err) {
                callback(err)
            } else {
                movieModel.find((err, datalist) => {
                    if (err) {
                        callback(err)
                    } else {
                        console.log("movie added")
                        callback(null, datalist)
                    }
                })
            }
        })
    }

    deleteMovie(movieName, callback) {
        movieModel.findOneAndDelete(movieName, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                movieModel.find((err, datalist) => {
                    if (err) {
                        callback(err)
                    } else {
                        console.log("movie deleted")
                        callback(null, datalist)
                    }
                })

            }
        })
    }
}