
const post= require("../models/Post")
const user= require("../models/User")
const comment= require("../models/Comment")
module.exports={

    getProfile: async(request,response)=>{
     
        try{
           const loggedInUser= await user.findById({_id:request.user})
           
           const postsByLoggedInUser= await post.find({user:request.user}).lean()
           response.render("profile.ejs",{posts:postsByLoggedInUser,user:loggedInUser})

        }
        catch(err)
        {
            console.log(err)
        }
    },
    getPost: async(request,response)=>{
       try{
         const loggedInUser= await user.findById({_id:request.user})
         const posts= await post.find().lean()
         response.render("post.ejs",{posts:posts,user:loggedInUser})
       }
       catch(err){
        console.log(err)
       }
    },
    addPost: async(request,response)=>{

        try{
            await post.create({
                title:request.body.title,
                message:request.body.post,
                user:request.user,
                isPublished:false

            })
            response.redirect("/profile/posts")

        }
        catch(err){
            console.log(err)
        }

    },
    deletePost: async(request,response)=>{
      try{
        await post.findByIdAndDelete({_id:request.params.id})
        response.redirect("/profile/posts")

      }
      catch(err){
         console.log(err)
      }
    },
    getSinglePost: async(request,response)=>{
       
        try{
            const singlePost= await post.findById({_id: request.params.id})
            const commentsOnPost= await comment.find({post:request.params.id})
            response.render("postProfile.ejs",{post:singlePost,comments:commentsOnPost})


        }
        catch(err){
            console.log(err)
        }
    }
}