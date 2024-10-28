import { ExecutionContext } from "@nestjs/common";

export const authGuardMock = {
    canActivate: (context: ExecutionContext) => {
        switchToHttp: jest.fn().mockReturnValue({ getRequest: jest.fn().mockReturnValue({user: {id: 5}})})
    }
}