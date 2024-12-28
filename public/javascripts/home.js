function sendOtp() {
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const name = document.getElementById("registerUsername").value;
    document.getElementById("otpField").style.display = "block";
    document.getElementById("registerButton").style.display = "block";
    document.getElementById("sendOtpButton").disabled = true;
    fetch('/home/sendemail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("OTP sent successfully")
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error('Error:', error));
}

function handleSubmit(event) {

    const otp = document.getElementById("otp").value;
    if (otp.length !== 6) {
        alert("Invalid OTP");
        return;
    }
    else {
        document.getElementById("register").submit();
    }

}
