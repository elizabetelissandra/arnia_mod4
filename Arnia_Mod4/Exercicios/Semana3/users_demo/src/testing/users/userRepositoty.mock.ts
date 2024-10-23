import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../../entities/User";
import { usersMock } from "./users.mock";
import { updateUserMock } from "./updateUser.mock";

export const userRepositoryMock = {
    provide: getRepositoryToken(User),
    useValue: {
        create: jest.fn().mockResolvedValue(usersMock[1]),
        save: jest.fn(),
        find: jest.fn().mockResolvedValue(usersMock),
        softDelete: jest.fn(),
        findOne: jest.fn().mockResolvedValue(usersMock[2]),
        update: jest.fn().mockResolvedValue(usersMock[5]),
        merge: jest.fn(),
        findOneBy: jest.fn().mockResolvedValue({...usersMock[4], ...updateUserMock})  
    }
}