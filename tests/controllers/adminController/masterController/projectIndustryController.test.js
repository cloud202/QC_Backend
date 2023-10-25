const projectIndustryController = require('../../../../controller/adminController/masterController/projectIndustryController');
const ProjectIndustry = require('../../../../models/admin/master/projectIndustry');

describe('getIndustryByID', () => {
    it('should return the industry for a valid ID', async () => {
        const req = {
            params: {
                id: 'valid_id',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        const mockIndustryData = {
            _id: 'valid_id',
            name: 'Test Industry',
            description: 'Test Description',
            scope: 'Test Scope',
            status: true,
        };
        ProjectIndustry.findById = jest.fn().mockResolvedValue(mockIndustryData);
        await projectIndustryController.getIndustryByID(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockIndustryData);
    });
    it('should return a 404 error for an invalid ID', async () => {
        const req = {
            params: {
                id: 'invalid_id', // Assuming 'invalid_id' does not correspond to any existing industry
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        ProjectIndustry.findById = jest.fn().mockResolvedValue(null); // Simulating industry not found
        await projectIndustryController.getIndustryByID(req, res, next);
        expect(next).toHaveBeenCalledWith(expect.objectContaining({ status: 404, message: 'Industry not found' }));
    });
    it('should call next with an error for database retrieval failure', async () => {
        const req = {
            params: {
                id: 'valid_id', // Assuming 'valid_id' corresponds to an existing industry
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        const mockDatabaseError = new Error('Database Error');
        ProjectIndustry.findById = jest.fn().mockRejectedValue(mockDatabaseError);
        await projectIndustryController.getIndustryByID(req, res, next);
        expect(next).toHaveBeenCalledWith(mockDatabaseError);
    });
});

describe('getAllIndustries', () => {
    it('should return all industries', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();

        // Mocking the ProjectIndustry.find() method to return an array of industries
        const mockIndustries = [
            {
                _id: 'valid_id',
                name: 'Test Industry 1',
                description: 'Test Description 1',
                scope: 'Test Scope 1',
                status: false,
            },
            {
                _id: 'valid_id',
                name: 'Test Industry 2',
                description: 'Test Description 2',
                scope: 'Test Scope 2',
                status: false,
            },
            {
                _id: 1,
                name: 'Test Industry 3',
                description: 'Test Description 3',
                scope: 'Test Scope 3',
                status: true,
            }
        ];
        ProjectIndustry.find = jest.fn().mockResolvedValue(mockIndustries);
        await projectIndustryController.getAllIndustries(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockIndustries);
    });
    it('should call next with an error for database retrieval failure', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        const mockDatabaseError = new Error('Database Error');
        ProjectIndustry.find = jest.fn().mockRejectedValue(mockDatabaseError);
        await projectIndustryController.getAllIndustries(req, res, next);
        expect(next).toHaveBeenCalledWith(mockDatabaseError);
    });
});