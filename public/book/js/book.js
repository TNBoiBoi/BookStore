async function addToCart ()
{
   const oldPassword = document.getElementById("oldPassword").value
   const newPassword =  document.getElementById("newPassword").value
   const response = await fetch("http://localhost:3000/payment/changePassword", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : "*",
          },
        body: JSON.stringify({
            oldPassword: oldPassword,
            newPassword: newPassword,
        })
    }).then((value )=> {
        value.json().then((output)=>{
            if (output.status === "Success"){
                document.getElementById("btn").disabled = true;
                document.getElementById("btn").innerHTML = "Added to cart"
            }
            else{
                document.getElementById("changedPassword").style.visibility = "visible";
            }    
        })
        
    })
}

