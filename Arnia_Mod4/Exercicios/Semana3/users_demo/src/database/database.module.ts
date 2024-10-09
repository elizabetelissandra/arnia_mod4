import { Module } from "@nestjs/common";
// import { databaseProviders } from "./database.providers";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
import { Address } from "src/entities/Address";
import { Pet } from "src/entities/Pet";
import { User } from "src/entities/User";


dotenv.config();

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT, 10) || 5432,
            username: process.env.DB_USERNAME || 'postgres', 
            password: process.env.DB_PASSWORD || '1234',
            database: process.env.DB_NAME || 'Arnia_Users',
            entities: [User, Address, Pet],
            synchronize: true,
          }
        ),
          
    ],
    // providers: [...databaseProviders],
    // exports: [...databaseProviders],
    
})


export class DatabaseModule {}