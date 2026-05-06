const verifyWebhook=(req,res,next)=>{

    const incomingSecret=req.headers['x-webhook-secret'];

    if(!incomingSecret ){
        return res.status(401)
        .json({
            success:false,
            message:"Webhook secret missing"
        })
    }

    if(incomingSecret !== process.env.WEBHOOK_SECRET){
        return res.status(403)
        .json({
            success:false,
            message:"Invalid webhook secret"
        })
    }

    next();
}

export default verifyWebhook;