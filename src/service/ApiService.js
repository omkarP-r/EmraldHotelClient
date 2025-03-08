import axios from "axios"

export default class ApiService {

    static BASE_URL = "http://localhost:8080"

    static getHeader() {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }

    /**AUTH */

    /* This  register a new user */
    static async registerUser(registration) {
        const response = await axios.post(`${this.BASE_URL}/auth/register`, registration)
        return response.data
    }

    /* This  login a registered user */
    static async loginUser(loginDetails) {
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails)
        return response.data
    }

    /***USERS */


/*  This is  to get the user profile */
static async getAllUsers() {
    const response = await axios.get(`${this.BASE_URL}/users/all`, {
        headers: this.getHeader()
    })
    return response.data
}

static async getUserProfile() {
    const response = await axios.get(`${this.BASE_URL}/users/get-logged-in-profile-info`, {
        headers: this.getHeader()
    })
    return response.data
}
/* This is the  to get a single user */
static async getUser(userId) {
    const response = await axios.get(`${this.BASE_URL}/users/get-by-id/${userId}`, {
        headers: this.getHeader()
    })
    return response.data
}


/* This is the  to get user bookings by the user id */
static async getUserBookings(userId) {
    const response = await axios.get(`${this.BASE_URL}/users/get-user-bookings/${userId}`, {
        headers: this.getHeader()
    })
    return response.data
}

/* This is to delete a user */
static async deleteUser(userId) {
    const response = await axios.delete(`${this.BASE_URL}/users/delete/${userId}`, {
        headers: this.getHeader()
    })
    return response.data
}


/**ROOM */
/* This  adds a new room room to the database */
static async addRoom(formData) {
    const result = await axios.post(`${this.BASE_URL}/rooms/add`, formData, {
        headers: {
            ...this.getHeader(),
            'Content-Type': 'multipart/form-data'
        }
    });
    return result.data;
}
/* This  gets all availavle rooms */
static async getAllAvailableRooms() {
    const result = await axios.get(`${this.BASE_URL}/rooms/all-available-rooms`)
    return result.data
}

/* This  gets all availavle by dates rooms from the database with a given date and a room type */
static async getAvailableRoomsByDateAndType(checkInDate, checkOutDate, roomType) {
    const result = await axios.get(
        `${this.BASE_URL}/rooms/available-rooms-by-date-and-type?checkInDate=${checkInDate}
    &checkOutDate=${checkOutDate}&roomType=${roomType}`
    )
    return result.data
}

/* This  gets all room types from thee database */
static async getRoomTypes() {
    const response = await axios.get(`${this.BASE_URL}/rooms/types`)
    return response.data
}
/* This  gets all rooms from the database */
static async getAllRooms() {
    const result = await axios.get(`${this.BASE_URL}/rooms/all`)
    return result.data
}

/* This funcction gets a room by the id */
static async getRoomById(roomId) {
    const result = await axios.get(`${this.BASE_URL}/rooms/room-by-id/${roomId}`)
    return result.data
}




}
// export default new ApiService();