const glass = document.querySelector(".glass");
const nest = document.querySelector(".nest");
const container = document.getElementById("container");
const signUp = document.getElementById("sign-up");
const content = document.getElementById("content");
const contents = document.querySelector(".content");
const signUp2 = document.getElementById("footer");
const close = document.querySelectorAll("#close");
const signIn = document.getElementById("sign-in");
const signIn2 = document.querySelector(".sign");
const submit = document.querySelector(".submit");
const submit2 = document.querySelector(".submit2");
const form = document.getElementById("form");
const form2 = document.getElementById("form2");

// USER DETAILS GETTER
const email1 = document.getElementById("email1");
const passLog = document.getElementById("password");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password1 = document.getElementById("password1");
const password2 = document.getElementById("password2");

//GETTER FOR MAP ID
const mymap = document.getElementById("add-map");

console.log(close);
close.forEach((element) => {
  element.addEventListener("click", () => {
    container.classList.remove("active");
    email1.value = "";
    passLog.value = "";
    username.value = "";
    email.value = "";
    password1.value = "";
    password2.value = "";
  });
});

function logIn() {
  glass.classList.add("active");
  nest.classList.remove("active");
  container.classList.add("active");
  content.classList.add("active");
  contents.classList.remove("active");
}
signIn.addEventListener("click", () => {
  logIn();
});
signIn2.addEventListener("click", () => {
  logIn();
});

function signUpUser() {
  nest.classList.add("active");
  glass.classList.remove("active");
  container.classList.add("active");
  content.classList.add("active");
}

signUp.addEventListener("click", () => {
  signUpUser();
});
signUp2.addEventListener("click", () => {
  signUpUser();
});

submit.addEventListener("click", (e) => {
  e.preventDefault();
  validate();
});

submit2.addEventListener("click", (e) => {
  e.preventDefault();
  login();
});

const users = [
  {
    user: "max",
    passcode: "aaaaaaaa",
    email: "max@ymail.com",
  },
];
console.log(users);

//FOR USER SIGN IN
function login() {
  const emailValue = email1.value.trim();
  const passwordValue = passLog.value.trim();

  //YOU CAN USE ANY OF THE FOLLOWING.
  const user = users.some((person) => {
    return person.passcode === passwordValue && person.email === emailValue;
  });
  if (user) {
    alert("login successful");
    glass.classList.remove("active");
    mymap.classList.add("active");
  } else alert("login unsuccessful");
}

//FOR USER SIGN UP
function validate() {
  let usernameValue = username.value.trim();
  let emailValue = email.value.trim();
  let passwordValue = password1.value.trim();
  let password2Value = password2.value.trim();

  if (usernameValue === "") {
    alert("pleasse input username field");
  } else if (emailValue === "") {
    alert("pleasse input email field");
  } else if (passwordValue === "" && password2Value === "") {
    alert("Password cannot be blank");
  } else if (passwordValue !== password2Value) {
    alert("passwords do not match.");
  } else if (passwordValue.length < 6) {
    alert("password must be 8 or more");
  } else {
    alert("congrats!!! sign up successful");
    const newUser = {
      user: usernameValue,
      email: emailValue,
      passcode: passwordValue,
    };
    users.push(newUser);
    const datas = { usernameValue, emailValue, password2Value };
    const options = {
      method: "POST",
      body: JSON.stringify(datas),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain */*",
      },
    };
    const URL = "https://jsonplaceholder.typicode.com/posts";
    fetch(URL, options)
      .then((res) => res.json())
      .then((data) => console.log(data));

    nest.classList.remove("active");
    document.getElementById("get-username").innerText = usernameValue;
    username.value = "";
    email.value = "";
    password1.value = "";
    password2.value = "";
    contents.classList.add("active");
  }
}

// BUILDING MY MAP

//This creates the map
const map = L.map("add-map").setView([53.9333, -116.5765], 11);

//add the tiles that make up the map
const attribution = `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMAp</a> contributors`;
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);
//creates the marker
const marker = L.marker([[53.9333, -116.5765]);
marker.addTo(map);
//creates a new marker on click
map.on("click", (e) => {
  const newMap = new L.marker([e.latlng.lat, e.latlng.lng]);
  newMap.addTo(map);
});
