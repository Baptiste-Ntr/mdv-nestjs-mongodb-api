import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamsModule } from './teams/teams.module';
import { LoggingService } from './logging/logging.service';
import { LoggingController } from './logging/logging.controller';
import { LoggingModule } from './logging/logging.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/f1-teams-db'),
    TeamsModule,
    LoggingModule
  ],
  controllers: [AppController, LoggingController],
  providers: [AppService, LoggingService],
})
export class AppModule { }
