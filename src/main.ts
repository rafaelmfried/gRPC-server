import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'node:path';
import { ReflectionService } from '@grpc/reflection';
import { PackageDefinition } from '@grpc/proto-loader';
import { Server } from '@grpc/grpc-js';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        onLoadPackageDefinition: (pkg: PackageDefinition, server: Server) => {
          new ReflectionService(pkg).addToServer(server);
        },
        loader: {
          includeDirs: [join(__dirname, '../proto')],
        },
        url: 'localhost:4000',
        package: 'user',
        protoPath: 'user.proto',
      },
    },
  );

  await app.listen();
}
bootstrap().catch((error) => console.error(error));
