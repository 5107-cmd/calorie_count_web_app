// src/pages/Calories.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Calories from '../src/pages/Calories';
import { vi } from 'vitest';

// Mock axios to avoid real API calls
vi.mock('axios', () => ({
  default: {
    post: vi.fn(() => Promise.resolve({
      data: {
        dish_name: 'Pasta',
        servings: 2,
        calories_per_serving: 200,
        total_calories: 400,
        source: 'Test API'
      }
    }))
  }
}));

describe('Calories Page', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'fake-token'); // prevent login error
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders Get Calories heading', () => {
    render(
      <MemoryRouter>
        <Calories />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /get calories/i })).toBeInTheDocument();
  });


  it('renders and enables Calculate button', () => {
    render(
      <MemoryRouter>
        <Calories />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: /calculate/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });
});
