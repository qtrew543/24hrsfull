let currentSlide = 0;

function showPage(pageId) {
  const pages = document.querySelectorAll('.container');
  pages.forEach(page => page.classList.add('hidden'));
  document.getElementById(pageId).classList.remove('hidden');
}

// Function for auto sliding the carousel
// function autoSlide() {
//   const carouselImages = document.querySelector('.carousel-images');
//   const slides = document.querySelectorAll('.carousel-images img');
//   currentSlide = (currentSlide + 1) % slides.length;
//   carouselImages.style.transform = `translateX(-${currentSlide * 100}%)`;
// }

// Start auto-slide every 3 seconds
setInterval(autoSlide, 3000);

async function loginUser() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  // Validate email and password
  if (!email || !password) {
    alert('Please enter both email and password.');
    return;
  }

  const loginData = { email, password };

  try {
    const response = await fetch('http://192.168.165.41:3003/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Login successful!');
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard';  // Redirect after successful login (or another page)
    } else {
      alert('Login failed: ' + data.message);
    }
  } catch (error) {
    console.error('Error logging in:', error);
    alert('An error occurred. Please try again later.');
  }
}

async function registerUser() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const age = document.getElementById('age').value;
  const weight = document.getElementById('weight').value;
  const height = document.getElementById('height').value;
  const activity = document.getElementById('activity').value;
  const goal = document.getElementById('goal').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  // Validate required fields
  if (!name || !email || !age || !weight || !height || !activity || !goal || !password || !confirmPassword) {
    alert('Please fill in all fields.');
    return;
  }

  // Validate password confirmation
  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Invalid email format.');
    return;
  }

  // Prepare the data object to send to the server
  const userData = {
    name,
    email,
    age,
    weight,
    height,
    activity,
    goal,
    password,
  };

  try {
    const response = await fetch('http://192.168.165.41:3003/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Registration successful!');
      
    } else {
      alert('Registration failed: ' + data.message);
    }
  } catch (error) {
    console.error('Error registering user:', error);
    alert('An error occurred. Please try again later.');
  }
}


function generatePlan() {
  const mockPlan = {
    workout: '30 minutes of jogging, 3 times a week',
    diet: '2000 calorie balanced diet',
    wellness: '10 minutes of meditation daily',
    date: new Date().toLocaleDateString(),
  };

  const plansContainer = document.getElementById('plans-container');
  const planDiv = document.createElement('div');
  planDiv.classList.add('plan');
  planDiv.innerHTML = `
    <p><strong>Date:</strong> ${mockPlan.date}</p>
    <p><strong>Workout:</strong> ${mockPlan.workout}</p>
    <p><strong>Diet:</strong> ${mockPlan.diet}</p>
    <p><strong>Wellness:</strong> ${mockPlan.wellness}</p>
  `;
  plansContainer.appendChild(planDiv);
}
