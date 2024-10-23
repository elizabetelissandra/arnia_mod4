import { Test, TestingModule } from "@nestjs/testing"
import { UsersController } from "./users.controller"
import { userServiceMock } from "../testing/users/userService.mock"
import { AuthGuard } from "../auth/guards/auth.guard"
import { authGuardMock } from "../testing/auth/authGuard.mock"
import { CreateUserMock } from "../testing/users/createUser.mock"
import { currentUserMock } from "../testing/users/currentUser.mock"
import { updateUserMock } from "../testing/users/updateUser.mock"

describe('Users Controller', ()=> {
  let usersController: UsersController

  beforeAll(async ()=>{
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [userServiceMock]
    }).overrideGuard(AuthGuard).useValue(authGuardMock).compile()

    usersController = module.get<UsersController>(UsersController)
  })

  it('User Controller its defined', () => {
    expect(usersController).toBeDefined()
  })

  describe('Create', ()=>{
    it('should create a new user', async()=>{
      const result = await usersController.create(CreateUserMock)

      expect(result).toHaveProperty('id');
    })
  })

  describe('Read', ()=>{
    it('should list all users', async ()=>{
      const result = await usersController.findAll()

      expect(result.length).toBeGreaterThan(0)
    })

    it('should find user by id', async () =>{
      const result = await usersController.findBy(2)

      expect(result).toBeDefined()
    })

    it('Should return users profile', async () => {
      const result = await usersController.profile(currentUserMock)

      expect(result.deletedAt).toBeNull()
    })
  })

  describe('Update', ()=> {
    it('should update user', async () => {
      const result = await usersController.updateBy(2, updateUserMock)

      expect(result.email).toEqual(updateUserMock.email)
    })
  })

  describe('Delete', ()=>{
    it('should delete user', async() => {
      const result = await usersController.deleteBy(3)

      expect(result).toHaveProperty('response')
    })
  })
})
