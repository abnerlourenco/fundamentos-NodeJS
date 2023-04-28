import { Request, Response } from 'express';
import CreateCurseService from './CreateCurseService';

export function createCourse(request: Request, response: Response) {
    CreateCurseService.execute({
        name: "Node JS",
        duration: 20,
        educator: "Dani"
    });

    return response.send();
}