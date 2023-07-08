import request from 'supertest';
import { app } from '../src/app';


describe('Programs API', () => {
  it('should fetch all programs', async () => {
    const response = await request(app).get('/api/programs');
    expect(response.status).toBe(200);
    // Additional assertions based on the response
  });

  it('should fetch a program by ID', async () => {
    const programId = 1;
    const response = await request(app).get(`/api/programs/${programId}`);
    expect(response.status).toBe(200);
    // Additional assertions based on the response
  });

  it('should create a new program', async () => {
    const newProgram = {
      title: 'Agile Innovation for Business Growth',
      topic: 'change-and-culture',
      learningFormats: ['virtual', 'residential', 'blended', 'self-study'],
      bestseller: false,
      startDate: '2023-05-05',
    };

    const response = await request(app).post('/api/programs').send(newProgram);
    expect(response.status).toBe(201);
    // Additional assertions based on the response
  });

  it('should update a program', async () => {
    const programId = 1;
    const updatedProgram = {
      title: 'Updated Program',
      // Update other properties as needed
    };

    const response = await request(app).patch(`/api/programs/${programId}`).send(updatedProgram);
    expect(response.status).toBe(200);
    // Additional assertions based on the response
  });

  it('should delete a program', async () => {
    const programId = 1;
    const response = await request(app).delete(`/api/programs/${programId}`);
    expect(response.status).toBe(200);
    // Additional assertions based on the response
  });
});
