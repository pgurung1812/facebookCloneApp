
const user= require("../models/User")
module.exports={

    updateFollow: async(request,response)=>{

        try{
    
            const loggedInUser= await user.findById({_id:request.user})
            loggedInUser.following.push(request.params.id)
            await loggedInUser.save()
            
            // console.log(loggedInUser.following)
             response.redirect("/profile/posts")
        }
        catch(err){
            console.log(err)
        }
    }
}