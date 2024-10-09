import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { CustomersService } from "./customers.service";
import { UpdateCustomer } from "./dto/updateCustomer";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
    constructor( private customersService: CustomersService){}
    

    @Post()
    createCustomer(@Body() body: any) {
        return this.customersService.createCustomer(body);
    }

    @Get()
    getAllCustomers() {
        return this.customersService.getCustomers();
    }

    @Get('age')
    getCustomers(@Query('age') age?: string) {
        return this.customersService.getCustomers(+age);
    }

    @Get(':id')
    getCustomerByID(@Param('id', ParseIntPipe) id: number) {
        return this.customersService.getCustomersByID(id);
    }

    @Patch(':id')
    updateCustomer(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateCustomer) {
        return this.customersService.updateCustomer(id,body);
    }

    @Delete(':id')
    deleteCustomer(@Param('id', ParseIntPipe) id: number) {
        return this.customersService.deleteCustomer(id);
    }
}
