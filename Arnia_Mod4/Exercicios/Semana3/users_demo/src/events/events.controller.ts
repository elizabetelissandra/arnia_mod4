import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dtos/createEventDto';
import { UserParam } from 'src/decorator/user.decorator';
import { User } from 'src/entities/User';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async newEvent(@Body() body: CreateEventDto){
    return await this.eventsService.newEvent(body)
  }

  @UseGuards(AuthGuard)
  @Post(':id/participate')
  async enterEvent(@Param('id', ParseIntPipe) idEvent: number, @UserParam() currentUser: User){
    return await this.eventsService.enterEvent(idEvent, currentUser)
  }

  @Get()
  async events(){
    return await this.eventsService.events()
  }
}
