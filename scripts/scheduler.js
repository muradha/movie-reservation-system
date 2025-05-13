import MovieAvialabilityRepository from "#repositories/movieAvialabilityRepository.js";
import { CronJob } from "cron";

const movieAvialabilityRepository = new MovieAvialabilityRepository();

const test = new CronJob(
    '56 * * * * *', // cronTime
    function () {
        const data = {
            movie_id: 3,
            theater_id: 1,
            movie_status_id: 1
        }
        movieAvialabilityRepository.createMovieAvialability(data);
        this.stop();
        console.log('Job executed once and stopped');
    }, // onTick
    null, // onComplete
    true, // start
    'UTC+7' // timeZone
);