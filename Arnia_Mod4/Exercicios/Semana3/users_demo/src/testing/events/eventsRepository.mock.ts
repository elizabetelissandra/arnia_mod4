import { getRepositoryToken } from "@nestjs/typeorm";
import { Events } from "../../entities/Events";
import { usersMock } from "../users/users.mock";
import { eventsMock } from "./events.mock";

export const eventsRepositoryMock = {
    provide: getRepositoryToken(Events),
    useValue: {
        create: jest.fn().mockReturnValue(eventsMock[0]),
        save: jest.fn(),
        findOne: jest.fn().mockResolvedValue(eventsMock[0]),
        find: jest.fn(), 
    }
}