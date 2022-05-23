var form = document.querySelector(".popup-form");
var formBackground = document.querySelector(".popup-form__background");
var formTitle = document.querySelector(".popup-form__title");
var closeButton = document.querySelector(".popup-form__close-button");
var isSpam = document.getElementById("isSpam");
var mailTitle = document.getElementById("title");

var formBody = document.getElementById("popup-form");
var successMessage = document.querySelector(".popup-form__success-masage");
var submitButton = document.querySelector(".popup-form__submit");

function showForm (text) {
    form.classList.remove("hided");
    formBackground.classList.remove("hided");
    formTitle.innerHTML = "Получить бесплатный образец:<br>" + text;
    isSpam.value = "not spam";
    mailTitle.value = "Заявка на бесплатный образец: " + text;
    formBody.classList.remove("hided");
    successMessage.classList.add("hided");
}

function closeForm () {
    form.classList.add("hided");
    formBackground.classList.add("hided");
    formTitle.innerHTML = "Форма обратной связи";
    isSpam.value = "spam";
    mailTitle.value = "Форма обратной связи";
    formBody.classList.remove("hided");
    successMessage.classList.add("hided");
}

function showIndexForm () {
    form.classList.remove("hided");
    formBackground.classList.remove("hided");
    formTitle.innerHTML = "Получите прайс-лист на весь ассортимент";
    isSpam.value = "not spam";
    mailTitle.value = "Заявка на получение прайс-листа";
    formBody.classList.remove("hided");
    successMessage.classList.add("hided");
    submitButton.value = "Получить прайс-лист";
}



$(document).ready(function () {

    $("#popup-form").submit(function () {
      $.ajax({
        type: "POST",
        url: "php/mail.php",
        data: $(this).serialize()
      }).done(function () {
        $(this).find("input").val("");
        formBody.classList.add("hided");
        successMessage.classList.remove("hided");
        $("#popup-form").trigger("reset");
      });
      return false;
    });
  });