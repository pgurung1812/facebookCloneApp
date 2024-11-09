
const comment= require("../models/Comment")
module.exports={

 addComment: async(request,response)=>{
    try{
       await comment.create({
        comment:request.body.comment,
        user:request.user,
        post:request.params.id
       })
       response.redirect(`/profile/posts/${request.params.id}`)
    }
    catch(err){
        console.log(err)
    }
 }
}