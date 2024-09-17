import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from './dto/Customer';
import { UpdateCustomer } from './dto/updateCustomer';
import { throwError } from 'rxjs';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', age: 30 },
    { id: 2, firstName: 'Jane', lastName: 'Smith', age: 25 },
    { id: 3, firstName: 'Bob', lastName: 'Johnson', age: 35 },
  ];
  id = this.customers.length;

  createCustomer(body: Customer) {
    const newCustomer = {
      id: this.id++,
      ...body,
    };

    this.customers.push(newCustomer);
    return newCustomer;
  }

  getAllCustomers() {
    return this.customers;
  }
  getCustomers(age?: number) {
    if (age) {
      const filteredCustomers = this.customers.filter(
        (customer) => customer.age == age,
      );
      if (filteredCustomers.length == 0) {
        throw new NotFoundException('Customers not found');
      }
      return filteredCustomers;
    }
    return this.customers;
  }

  getCustomersByID(id: number) {
    const customer = this.customers.find((customer) => customer.id == id);

    if (!customer) {
      throw Error('Customer not found');
    }
  }

  updateCustomer(id: number, body: UpdateCustomer) {
    const customer = this.customers.find((customer) => customer.id == id);

    if (!customer) {
      throw new NotFoundException('Customer not found');
    } else {
      Object.assign(customer, body);

      return customer;
    }
  }

  deleteCustomer(id: number) {
    const index = this.customers.findIndex((customer) => customer.id == id);

    if (index == -1) {
      throw new NotFoundException('Customer not found');
    } else {
      this.customers.splice(index, 1);
      return "The Customer was deleted"
    }
    
  }
}
