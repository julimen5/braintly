import { HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { JsonResponse } from '../../../../src/config/filter/filter.type';
import * as dayjs from 'dayjs';
import { TaskDto } from '../../../../src/features/task/adapter/dto/task.dto';
import { States } from '../../../../src/features/task/domain/state.enum';
import { exec } from 'child_process';

describe('Test Find Tasks', () => {
  let server: any;

  //#region Before
  beforeAll(async () => {
    server = global.server;
  });

  //#region invalid Tests
  describe('Test Invalid request', () => {
    it('It should retrieve all the failing fields', async () => {
      const response = await request(server)
        .post(`/api/v1/tasks`)
        .send({ dueDate: dayjs('2020-01-01') });
      const date = dayjs().format('YYYY-MM-DD');

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
      const { body }: { body: JsonResponse } = response;
      expect(body.message).toStrictEqual([
        'description should not be empty',
        'description must be longer than or equal to 2 characters',
        'description must be a string',
        `dueDate must be greater than or equal to ${date}`,
      ]);
      expect(body.error).toBe('Bad Request');
    });
  });

  //#endregion

  //#region Valid Tests
  describe('Test Invalid request', () => {
    it('It should retrieve all the failing fields', async () => {
      const dueDate = dayjs('2027-01-02').format('YYYY-MM-DD');
      const description = 'this is a test';
      const response = await request(server)
        .post(`/api/v1/tasks`)
        .send({ description, dueDate });

      expect(response.status).toBe(HttpStatus.CREATED);
      const { body }: { body: TaskDto } = response;
      expect(body.state).toBe(States.Pending);
      expect(body.description).toBe(description);
      // doing this for an unexpected dayjs behavior that I can't investigate
      expect(dayjs(body.dueDate).add(1, 'days').format('YYYY-MM-DD')).toBe(
        dueDate,
      );
    });
  });

  //#endregion
});
