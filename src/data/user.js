import {toast} from "react-toastify";
//initial data
const users = JSON.parse(localStorage.getItem("users")) || [];

//register
const registerUser =async (user) => {
    console.log('register = ' , user);

    const extEmail = users.find((item) => item.email === user.email);
    const extMobile = users.find((item) => item.mobile === user.mobile);

    if(extEmail){
        toast.warning(`${user.email} already exits. `);
    } 

    else if(extMobile){
        toast.warning(`${user.mobile} already exits. `);
    }

    else{
        users.push(user);
        saveUsers(users);
        toast.success(`Hi, ${user.name} you have registered successfully`);
        window.location.href = "/login";
    }
};

//save data
const saveUsers = (data) => {
    localStorage.setItem("users",JSON.stringify(data));
}

//login logic
const loginUser = async (user) => {
    const extUser = users.find((item) => item.email === user.email)
    if(!extUser) {
        toast.warning(`${user.email} doesn't exist`);
    }
    else {
        if(extUser.password === user.password) {
            localStorage.setItem("loginStatus",true);
            toast.success('User login success');
            window.location.href = "/";
        }
        else {
            toast.warning("passwords are not matched");
        }
    }
}

//logout handler
const logoutUser = async () => {
    if(localStorage.getItem('loginStatus') == "true") {
        localStorage.removeItem('loginStatus');
        toast.success('Successfully logout');
        window.location.href = "/"
    }
}
export { registerUser, loginUser, logoutUser } // const export