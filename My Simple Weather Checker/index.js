/*SEARCH BY USING A CITY NAME (e.g. lagos) OR A COMMA-SEPARATED CITY NAME ALONG WITH THE COUNTRY CODE (e.g. lagos,NG), this tip was gotten from a tutorial i earlier followed and seemed right*/
const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
const apiKey = "7cf52f8bb8cc8bf4b547897d4245415e";

form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;

  //For future purposes, I can use this to check if there's already a city
  const listItems = list.querySelectorAll(".ajax-section .city");
  const listItemsArray = Array.from(listItems);

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter(el => {
      let content = "";
      //for example, Lagos NG
      if (inputVal.includes(",")) {
        //Lagossssss or Lagos, Nigeriaaaa will give an invalid country code, so I keep only the first part of inputVal
        if (inputVal.split(",")[1].length > 2) {
          inputVal = inputVal.split(",")[0];
          content = el
            .querySelector(".city-name span")
            .textContent.toLowerCase();
        } else {
          content = el.querySelector(".city-name").dataset.name.toLowerCase();
        }
      } else {
        //Lagos
        content = el.querySelector(".city-name span").textContent.toLowerCase();
      }
      return content == inputVal.toLowerCase();
    });

    //If i have searched the name of the city before, This should let me know that it has been done already
    if (filteredArray.length > 0) {
      msg.textContent = `You already know the weather for ${
        filteredArray[0].querySelector(".city-name span").textContent
      } ...otherwise be more specific by providing the country code as well 😉`;
      form.reset();
      input.focus();
      return;
    }
  }

  //I have to use ajax to call the api here..figure it out and implement
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  
});