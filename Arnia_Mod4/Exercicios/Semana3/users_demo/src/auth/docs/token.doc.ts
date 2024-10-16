import { ApiProperty } from "@nestjs/swagger";

export class TokenDoc{
    @ApiProperty({description: 'token login', type: String, example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJlbGl6YTJAZW1haWwuY29tIiwiaWF0IjoxNzI5MDc4MzkxLCJleHAiOjE3MjkwNzkyOTF9.oy2amxQ2oT-lh2VSMb0UnBNdQZe9aq6M2rKm1HUyg54", title: 'Token'})
    token: String
}