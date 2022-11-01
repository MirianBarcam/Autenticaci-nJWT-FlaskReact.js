const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      inputEmailContent: "",
      inputPasswordContent: "",
      tokenLogin: "",
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },

      registerUser: async (newUser) => {
        fetch(process.env.BACKEND_URL + "/api" + "/register", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        }).then((response) => {
          console.log(response);
          if (response.status === 200) {
            alert("User has been successfully created");
            return response.json();
          } else if (response.status === 408 || response.status === 401) {
            alert("SOMETHING WENT WRONG");
          }
        });
      },

      getLoginToken: async (userToLogin) => {
        fetch(process.env.BACKEND_URL + "/api/login", {
          method: "POST",
          body: JSON.stringify(userToLogin),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((resp) => {
            if (resp.status === 200) {
              return resp.json();
            } else if (resp.status === 408 || resp.status === 401) {
              alert("SOMETHING WENT WRONG");
            }
          })
          .then((data) => {
            localStorage.removeItem("token");
            localStorage.setItem("token", JSON.stringify(data.access_token));
            setStore({ tokenLogin: data.access_token });
          });
      },

      onchangeInputEmail: (content) => {
        setStore({ inputEmailContent: content });
      },
      onchangeInputPassword: (content) => {
        setStore({ inputPasswordContent: content });
      },
    },
  };
};

export default getState;
