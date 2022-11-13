async function login (username, password)
{
   const usernameA = $("#username").val()
   const passwordA =  $("#password").val()
   const response = await fetch("http://localhost:3000/login", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : "*",
          },
        body: JSON.stringify({
            username: usernameA,
            password: passwordA
        })
    }).then((value )=> {
        value.json().then((output)=>{
            if (output.status === "Failed"){
                $("#wrongPassword").show();
            }
            else{
                window.location.replace("/home")
            }    
        })
        
    })
}

