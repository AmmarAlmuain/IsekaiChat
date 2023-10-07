export const loadingAnimation = (id: string, operationType: string = "end") => {
    const element = document.getElementById(id);

    if (element !== null && element !== undefined) {
      if (operationType === "start") {
        element.classList.add("loading");
        element.classList.add("loading-spinner");
        element.classList.add("loading-sm");
        element.style.pointerEvents = "none";
      } else {
        element.classList.remove("loading");
        element.classList.remove("loading-spinner");
        element.classList.remove("loading-sm");
        element.style.pointerEvents = "auto";
      }
    }
  };