const config = {
    production :{
        SECRET  : process.env.SECRET,
        DATABASE : process.env.MONGODB_URI,
    },
    default :{
        SECRET : 'SUPERSECRETPASSWORD123',
        DATABASE : 'mongodb+srv://mostafa:LUjiZggnXA6agN2f@cluster0.wvo17.mongodb.net/bookShelf?retryWrites=true&w=majority'
    }
}

exports.get  = function get (env){
//    return config(env) || config.default 
   return config.default 
}

//mongodb+srv://mostafa:LUjiZggnXA6agN2f@cluster0.wvo17.mongodb.net/shop?retryWrites=true&w=majority