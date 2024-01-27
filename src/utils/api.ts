

const API_URL = "https://norma.nomoreparties.space/api/ingredients"

export const getIngredients = async () => {
    const res = await fetch(API_URL)
      .then(res => {
        if (res.ok) { return res.json(); }
        return Promise.reject("Error in getIngredients " + res.status);
      });
    return res;
}
 