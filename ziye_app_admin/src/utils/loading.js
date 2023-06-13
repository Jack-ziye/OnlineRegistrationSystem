function loading() {
  let loadingComponent = null;
  let requestNum = 0;

  const open = () => {
    requestNum++;
    if (loadingComponent === null) {
      loadingComponent = document.querySelector("#loading-warpper");
    }
    loadingComponent.style.visibility = "";
  };

  const colse = () => {
    if (--requestNum <= 0 && loadingComponent) {
      loadingComponent.style.visibility = "hidden";
      requestNum = 0;
    }
  };
  return { open, colse };
}

export default loading();
