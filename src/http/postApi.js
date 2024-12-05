export async function login(credentials) {
    const url = `${process.env.REACT_APP_API_URL}login`; // Adjust endpoint as needed

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials), // Pass the credentials as JSON
        });

        if (!response.ok) {
            const errorData = await response.json();
            const error = new Error("Failed to log in.");
            error.info = errorData;
            error.code = response.status;
            throw error;
        }

        const data = await response.json(); // Get the response data
        return {
            message: data.message,
            token: data.token,
        }; // Return message and token
    } catch (error) {
        console.error("An error occurred while logging in:", error);
        throw error; // Rethrow the error to be handled by the calling function
    }
}


export async function register(userData) {
    const url = `${process.env.REACT_APP_API_URL}register`;
    

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        console.log("API Response Status:", response.status); // Log response status

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error details:", errorData); // Log error details
            throw new Error("Failed to register.");
        }

        const data = await response.json();
        console.log("API Response Data:", data); // Log API response data

        return {
            message: data.message,
            token: data.token,
        };
    } catch (error) {
        console.error("An error occurred while registering:", error);
        throw error;
    }
}

export async function forgot(email) {
    const url = `${process.env.REACT_APP_API_URL}forgot-password`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }), // Send an object with the email key
        });

       

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error details:", errorData); // Log error details
            throw new Error(errorData.message || "Failed to process request."); // Use error message if available
        }

        const data = await response.json();
        console.log("API Response Data:", data); // Log API response data
        return data; // Return data for further processing if needed

    } catch (error) {
        console.error("An error occurred while processing the request:", error);
        throw error; // Re-throw the error for upstream handling
    }
}

export async function reset(resetData) {
    const url = `${process.env.REACT_APP_API_URL}reset-password`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(resetData),
        });

        console.log("API Response Status:", response.status);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({})); 
            console.error("Error details:", errorData); 
            throw new Error(errorData.message || "Failed to reset password.");
        }

        const data = await response.json();
        console.log("API Response Data:", data); // Log API response data

        return {
            message: data.message || "Password reset successful.",
            token: data.token || null, // Handle token presence
        };
    } catch (error) {
        console.error("An error occurred while resetting password:", error);
        throw error;
    }
}

