const rp = require('request-promise');

module.exports.home = async (req,res,next)=>{
    try{
        var paths = await listImagePathsAsync();
    }
    catch(error){
        return next(new Error("Error getting images from LOC"));
    }
    res.render('gallery', { imgs: paths, layout:false});
  };



/*
Returns an object containing an array with the path_lower of each 
image file and if more files a cursor to continue */
async function listImagePathsAsync(){

    let options={
      url: "http://www.loc.gov/pictures/search/?q=tel%20aviv&co=matpc&fi=title&fo=json&c=500", 
    }
  
    try{
      //Make request to LOC to get list of files
      let result = await rp(options);

        let results = JSON.parse(result).results;
        var paths = results.map(function (entry) {
            return entry.image.full;
        });
      
      return paths;
  
    }catch(error){
      return next(new Error('error listing folder. '+error.message));
    }        
  } 