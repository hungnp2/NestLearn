import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Order } from 'src/modules/orders/schemas/order.schema';
import { OrderStatusHistoryModule } from './modules/order-status-history/order-status-history.module';


@Module({
  imports: [ConfigModule.forRoot(),
     UsersModule,
    
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    
    OrderStatusHistoryModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
