import { Test, TestingModule } from "@nestjs/testing"
import { EventsService } from "./events.service"
import { eventsRepositoryMock } from "../testing/events/eventsRepository.mock"
import { userServiceMock } from "../testing/users/userService.mock"
import { eventRepositoryMock } from "../testing/eventPhotos/eventPhotosRepository.mock"
import { configServiceMock } from "../testing/config/configService.mock"
import { getFileMock } from "../testing/events/getFile.mock"

describe('Events Service', () =>{
  let eventsService: EventsService

  beforeAll(async()=>{
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsService, eventsRepositoryMock, userServiceMock, eventRepositoryMock, configServiceMock],
    }).compile()

    eventsService = module.get<EventsService>(EventsService)
  })
  
  it('should Events Service is defined', async () =>{
    expect(eventsService).toBeDefined()
  })

  describe('Create', () =>{
    it('should upload a photo', async () =>{
      const result = await eventsService.uploadPhoto(1, await getFileMock())

      expect(result).toHaveProperty('id')
    })
  })
})