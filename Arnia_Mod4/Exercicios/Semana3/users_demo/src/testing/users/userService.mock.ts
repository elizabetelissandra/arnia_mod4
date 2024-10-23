import { UsersService } from "../../users/users.service";
import { updateUserMock } from "./updateUser.mock";
import { usersMock } from "./users.mock";

export const userServiceMock = {
    provide: UsersService,
    useValue: {
        create: jest.fn().mockResolvedValue(usersMock[1]),
        findAll: jest.fn().mockResolvedValue(usersMock),
        profile: jest.fn().mockResolvedValue(usersMock[2]),
        findBy: jest.fn().mockResolvedValue(usersMock),
        updateBy: jest.fn().mockResolvedValue({...usersMock[2], ...updateUserMock}),
        deleteBy: jest.fn().mockResolvedValue({response: 'ok'}),
        findUser: jest.fn().mockResolvedValue('eliza@email.com'),
    }
}