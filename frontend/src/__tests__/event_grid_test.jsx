import React from 'react';
import { render, screen } from '@testing-library/react';
import EventGrid from '../components/event_view_components/event_grid';
import useFetchData from '../components/shared/fetch_data';
import '@testing-library/jest-dom';

jest.mock('../components/shared/fetch_data');

describe('EventGrid Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('displays loading message when fetching data', () => {
        useFetchData.mockReturnValue({ data: [], loading: true, error: null });

        render(<EventGrid />);

        expect(screen.getByText('Loading devices...')).toBeInTheDocument();
    });

    test('displays error message on error', () => {
        useFetchData.mockReturnValue({
             data: [], loading: false, error: new Error('Failed to fetch') });

        render(<EventGrid />);

        // Assert that the error message is displayed correctly.
        expect(screen.getByText(/Failed to load devices\.\s*Please try again later\./)).toBeInTheDocument();
    });

    test('renders the data grid with the fetched data', async () => {
        const test_time = "2024-12-12 23:59:59"
    
        const mockData = {
            data: [
                { 
                    user_email: 'test@example.com',
                    user_name: '020202', 
                    move_time: test_time,
                    loc_name: 'Test Laboratory', 
                    company: "Apple",
                    dev_name: "test device"
                },
            ],
            loading: false,
            error: null,
        };
        useFetchData.mockReturnValue(mockData);

        const test_time_format =  new Date(test_time.replace(' ', 'T') + 'Z').toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })
    
        render(<EventGrid />);


        // Verify cells and headers
        expect(screen.getByText('020202')).toBeInTheDocument();
    
        // Verify datetime with UTC.
        expect(screen.getByText(test_time_format)).toBeInTheDocument();
        expect(screen.getByText('Test Laboratory')).toBeInTheDocument();
        expect(screen.getByText('test@example.com')).toBeInTheDocument();
        expect(screen.getByText('test device')).toBeInTheDocument();
    
        // Verify headers
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('User name')).toBeInTheDocument();
        expect(screen.getByText('Date/Time')).toBeInTheDocument();
        expect(screen.getByText('Location')).toBeInTheDocument();
        expect(screen.getByText('Company')).toBeInTheDocument();
        expect(screen.getByText('Device')).toBeInTheDocument();
        //Buttons
        const exportButton = screen.getByText('Export CSV');
        const expandButton = screen.getByText('Expand rows');
        expect(exportButton).toBeInTheDocument();
        expect(expandButton).toBeInTheDocument();
    });


});