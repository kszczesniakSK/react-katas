import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ExamplePage from '../pages/ExamplePage';
import '@testing-library/jest-dom'; // Add this for DOM matchers

describe('ExamplePage', () => {
  beforeEach(() => {
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('displays backend data after a delay', async () => {
    const mock = new MockAdapter(axios, { delayResponse: 1500 });
    mock.onGet('https://pokeapi.co/api/v2/pokemon/ditto').reply(200, { name: 'Test Data' });

    render(<ExamplePage />);

    expect(screen.getByText(/loading data.../i)).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText(/backend data: Test Data/i)).toBeInTheDocument(), { timeout: 5000 });
  },5000);

  it('displays timeout message after 3 seconds', async () => {
    render(<ExamplePage />);

    expect(screen.getByText(/waiting.../i)).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText(/timeout complete!/i)).toBeInTheDocument(), { timeout: 3500 });
  });

  it('submits form with user input', () => {
    render(<ExamplePage />);

    const inputField = screen.getByPlaceholderText(/enter text/i);
    const submitButton = screen.getByText(/submit/i);

    fireEvent.change(inputField, { target: { value: 'User Input' } });

    fireEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledWith('Form Submitted with input: User Input');
  });
});