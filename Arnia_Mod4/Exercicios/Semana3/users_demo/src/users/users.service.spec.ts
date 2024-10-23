import { Test, TestingModule } from "@nestjs/testing"
import { UsersService } from "./users.service"
import { userRepositoryMock } from "../testing/users/userRepositoty.mock"
import { CreateUserMock } from "../testing/users/createUser.mock"
import { currentUserMock } from "../testing/users/currentUser.mock"
import { updateUserMock } from "../testing/users/updateUser.mock"

describe('Users Service', () => {
  let userService: UsersService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, userRepositoryMock],
    }).compile();

    userService = module.get<UsersService>(UsersService)
  })

  it('UserService is defined', async () => {
    expect(userService).toBeDefined()
  })

  describe('Create', () => {
    it('should create new user', async() => {
      const result = await userService.create(CreateUserMock)
      
      console.log(result)
      expect(result).toHaveProperty('id')
    })
  })

  describe('Read', () => {
    it('should find all users', async() => {
      const result = await userService.findAll()

      expect(result.length).toBeGreaterThan(0)
    })

    it('should find user by id', async () => {
      const result = await userService.findBy(1)

      console.log(result)
      expect(result).toHaveProperty('email')
    })

    it('should find user by email', async() => {
      const result = await userService.findUser('eliza1@email.com')


      expect(result).toHaveProperty('id')
    })

    it('should find user by profile', async () =>{
      const result = await userService.profile(currentUserMock)

      expect(result.email).toBeDefined()
    })
  })

  describe('Update', () => {
    it('should update user infos', async() => {
      const result = await userService.updateBy(5, updateUserMock)

      expect(result.email).toEqual(updateUserMock.email)
    })
  })

  describe('Delete', ()=> {
    it('should soft delete user', async()=> {
      const result = await userService.deleteBy(2)

      expect(result).toHaveProperty('response')
    })
  })
})
