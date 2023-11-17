import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PlayerModule } from './player/player.module';
import { TeamsModule } from './teams/teams.module';
import { FixturesModule } from './fixtures/fixtures.module';
import { AdvertsModule } from './adverts/adverts.module';
import { ApiKeyService } from './auth/service/apikey.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NewsModule } from './news/news.module';
import { PatronsModule } from './patrons/patrons.module';
import { Mongoose } from 'mongoose';
import { ApiKey, ApiKeySchema } from './auth/entities/apikey.entity';
import { ApiKeyGuard } from './auth/guards/apikey.guard';
import { PaginationHelper } from 'src/utils/helpers/pagination.helper';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI'),
        dbName: configService.get<string>('DB_NAME'),
      }),
    }),
    MongooseModule.forFeature([{ name: ApiKey.name, schema: ApiKeySchema }]),
    UsersModule,
    AuthModule,
    PlayerModule,
    TeamsModule,
    FixturesModule,
    AdvertsModule,
    NewsModule,
    PatronsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ApiKeyGuard, ApiKeyService, PaginationHelper],
  exports: [ApiKeyService, PaginationHelper],
})
export class AppModule {}
