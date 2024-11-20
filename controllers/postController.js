
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
     
         const posts= await post.find({user:request.user}).lean()

          let followpost
           console.log(loggedInUser.following)

            loggedInUser.following.forEach(async(currUser)=>{
               followpost=await post.find({user:currUser}).lean()
               for(let i=0;i<followpost.length;i++){
                posts.push(followpost[i])
               }
            })
          

            
         let totUsers=await user.find().lean()
         const totalUsers=totUsers.filter((currentUser)=>{
            return currentUser._id!=request.user
         })
         response.render("post.ejs",{posts:posts,user:loggedInUser,totUsers:totalUsers})
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
                likes:0

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
    },
    updateLikes: async(request,response)=>{
        try{
          const currPost= await post.findById({_id:request.params.id})
          const updateLikePost= await post.findByIdAndUpdate(request.params.id,{likes:currPost.likes+1})
  
          response.redirect("/profile/posts")

        }
        catch(err){
            console.log(err)
        }

    }
}