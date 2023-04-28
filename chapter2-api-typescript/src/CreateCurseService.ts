
/**
 * Criar os cursos
 * 
 * nome - string
 * duration - number
 * educator - string
 */

interface Course {
    name: string;
    duration: number;
    educator: string;
}

class CreateCurseService {
    execute({ name, duration, educator }: Course) {
        console.log(name,duration, educator);
    }
}

export default new CreateCurseService();