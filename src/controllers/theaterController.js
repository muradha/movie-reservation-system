import TheaterService from "#services/theaterService.js";
import { sendSuccess } from "../utils/response.js";

const theaterService = new TheaterService();

const fetchAllTheaters = async (req, res, next) => {
    try {
        const theaters = await theaterService.getAllTheaters();

        sendSuccess(res, theaters, "Theaters fetched", 200);
    } catch (error) {
        next(error);
    }
}

export { fetchAllTheaters }

