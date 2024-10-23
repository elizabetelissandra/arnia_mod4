import { Test, TestingModule } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { userServiceMock } from "../testing/users/userService.mock"
import { jwtServiceMock } from "../testing/auth/jwtService.mock"
import { loginMock } from "../testing/auth/login.mock"
import * as bcrypt from 'bcrypt'

describe('AuthService', () => {
  let authService: AuthService

  beforeAll(async()=>{
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, userServiceMock, jwtServiceMock ]
    }).compile()

    authService = module.get<AuthService>(AuthService)
  })

  it('should Auth Service defined', async()=> {
   expect(authService).toBeDefined()
  })


  describe('login', () =>{
    it('should login with correctly user', async()=>{
      jest.spyOn(bcrypt, 'compareSync').mockReturnValueOnce(true)

      const result = await authService.login(loginMock)
      console.log(result)
      expect(result).toHaveProperty('access_token')
      expect(typeof result.access_token).toEqual('string')
    })
  })
})
