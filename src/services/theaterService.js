import TheaterRepository from "#repositories/theaterRepository.js";

const theaterRepository = new TheaterRepository();

class TheaterService {
    async getAllTheaters(){
        return await theaterRepository.getAllTheaters();
    }
}

export default TheaterService;