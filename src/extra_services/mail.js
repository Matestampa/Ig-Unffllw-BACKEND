const nodemailer=require("nodemailer");

const {MAIL_VARS}=require("../config/mail_config");

const transporter=nodemailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    auth:{
        user:MAIL_VARS.user,
        pass:MAIL_VARS.password
    }
})

const GenMessageData={
    from:{
        name:"IgUnfollowApp",
        address: MAIL_VARS.user,
    },
    to:MAIL_VARS.destination_acc,
}


async function sendMail(subject,text){
    
    let messageData={
        ...GenMessageData,

        subject:subject,
        text:text
    };

    //await transporter.sendMail(messageData);
}

module.exports={sendMail};


