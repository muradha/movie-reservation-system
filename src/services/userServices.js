import UserRepository from "#repositories/userRepository.js";

const userRepository = new UserRepository();

class UserService {
    async fetchAllUsers(){
        return await userRepository.getAllUsers();
    }

    async saveUser(data){
        return await userRepository.createUser(data);
    }
}

export default UserService;