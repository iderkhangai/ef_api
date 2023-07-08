import request from 'supertest';
import { app } from '../src/app';


describe('Programs API', () => {
  it('should fetch all programs', async () => {
    const response = await request(app).get('/api/v1/programs');
    expect(response.status).toBe(200);

  });

  it('should fetch a program by ID', async () => {
    const programId = 1;
    const response = await request(app).get(`/api/v1/programs/${programId}`);
    expect(response.status).toBe(200);

  });

  it('should create a new program', async () => {
    const newProgram = {
      title: 'Agile Innovation for Business Growth',
      topic: 'change-and-culture',
      learningFormats: ['virtual', 'residential', 'blended', 'self-study'],
      bestseller: false,
      startDate: '2023-05-05',
    };

    const response = await request(app).post('/api/v1/programs').send(newProgram);
    expect(response.status).toBe(201);

  });

  it('should update a program', async () => {
    const updatedProgram = {
      id: 1,
      title: 'Updated Program',
      // Update other properties as needed
    };

    const response = await request(app).patch(`/api/v1/programs/`).send(updatedProgram);
    expect(response.status).toBe(200);

  });

  it('should delete a program', async () => {
    const programId = 1;
    const response = await request(app).delete(`/api/v1/programs/${programId}`);
    expect(response.status).toBe(200);

  });
});

describe('POST /programs', () => {
  it('should return 400 if title is empty', async () => {
    const payload = {
      // Provide the request payload with an empty title
      // id: 1001,
      title: '',
      topic: 'change-and-culture',
      learningFormats: ['virtual', 'residential', 'blended', 'self-study'],
      bestseller: false,
      startDate: '2023-07-08',
    };

    const response = await request(app).post('/api/v1/programs').send(payload);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'Validation Error',
      details: {
        title: '"Title" is not allowed to be empty',
      },
    });
  });
});
