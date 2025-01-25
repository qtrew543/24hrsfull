// your code goes here
document.getElementById("btn").addEventListener("click", function () {
  var height_val = document.getElementById("height").value; // in cm
  var weight_val = document.getElementById("weight").value; // in kg

  // Convert height from cm to m
  var height_in_m = height_val / 100;

  // Calculate BMI
  var bmi = weight_val / (height_in_m * height_in_m);

  // Round BMI to 2 decimal places
  var bmio = bmi.toFixed(2);

  let message = "";
  if (bmi < 18.5) {
    message = `You are underweight! Eat some more 🍔🍕 and less 🏃. Don't float away!`;
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    message = `You're in the ideal range 🎉. Keep it up!`;
  } else if (bmi >= 25 && bmi <= 29.9) {
    message = `You are overweight! Maybe cut back on the 🍕 and 🍔? But hey, more to love ❤️.`;
  } else {
    message = `Obesity alert 🚨! Are you carrying a secret stash of snacks? 🍩🍫`;
  }

  document.getElementById("result").innerHTML = `Your BMI is ${bmio}.<br>${message}`;
});
