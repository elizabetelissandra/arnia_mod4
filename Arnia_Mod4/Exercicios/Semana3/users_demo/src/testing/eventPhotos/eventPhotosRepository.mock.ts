import { getRepositoryToken } from "@nestjs/typeorm";
import { EventPhotos } from "../../entities/EventPhotos";
import { eventsMock } from "../events/events.mock";
import { eventPhotosMock } from "./eventPhotos.mock";

export const eventRepositoryMock = {
    provide: getRepositoryToken(EventPhotos),
    useValue: {
        create: jest.fn().mockReturnValue(eventPhotosMock),
        save: jest.fn(),
    },
}