import { JwtService } from "@nestjs/jwt";

export const jwtServiceMock = {
    provide: JwtService,
    useValue: {
        signAsync: jest.fn().mockResolvedValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJlbGl6YTJAZW1haWwuY29tIiwiaWF0IjoxNzI5MDc4MzkxLCJleHAiOjE3MjkwNzkyOTF9.oy2amxQ2oT-lh2VSMb0UnBNdQZe9aq6M2rKm1HUyg54')
    }
}