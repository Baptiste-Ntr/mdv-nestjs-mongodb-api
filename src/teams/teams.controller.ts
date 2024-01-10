// Importation des décorateurs et des classes nécessaires depuis le module '@nestjs/common' et les fichiers locaux.
import { Body, Controller, Delete, Get, Param, Post, Put, HttpException, HttpStatus } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Team } from './team.schema';

// Le décorateur @Controller crée une route de base '/teams' pour toutes les méthodes de ce contrôleur.
@Controller('teams')
export class TeamsController {
    // Injection du service TeamsService dans le contrôleur via le constructeur.
    constructor(private readonly teamsService: TeamsService) { }

    // Le décorateur @Post crée une route POST pour '/teams'.
    // Le décorateur @Body() extrait les données du corps de la requête et les passe à la méthode create() du service.
    @Post()
    async create(@Body() createTeamDto: any): Promise<Team> {

        if (!createTeamDto.name || !createTeamDto.base || !createTeamDto.championshipsWon) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Missing parameters',
            }, HttpStatus.BAD_REQUEST)
        }

        if (typeof createTeamDto.name !== 'string' || typeof createTeamDto.base !== 'string' || typeof createTeamDto.championshipsWon !== 'number') {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Wrong type of parameters',
            }, HttpStatus.BAD_REQUEST)
        }

        if (createTeamDto.championshipsWon < 0) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Championships won must be a positive number',
            }, HttpStatus.BAD_REQUEST)
        }

        if (createTeamDto.name.length < 3 || createTeamDto.name.length > 20) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Name must be between 3 and 20 characters',
            }, HttpStatus.BAD_REQUEST)
        }

        if (createTeamDto.base.length < 3 || createTeamDto.base.length > 20) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Base must be between 3 and 20 characters',
            }, HttpStatus.BAD_REQUEST)
        }

        if (createTeamDto.name === createTeamDto.base) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Name and base must be different',
            }, HttpStatus.BAD_REQUEST)
        }

        if (this.teamsService.findOne(createTeamDto.name)) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'This team already exists',
            }, HttpStatus.BAD_REQUEST)
        }

        try {
            const newTeam = await this.teamsService.create(createTeamDto)
            console.log(`${createTeamDto.name} team created`)
            return newTeam
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'This team already exists',
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    // Le décorateur @Get crée une route GET pour '/teams'.
    @Get()
    async findAll(): Promise<Team[]> {
        try {
            const teams = await this.teamsService.findAll()
            console.log('All teams retrieved')
            return teams
        } catch (err) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Internal server error',
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    // Le décorateur @Get(':id') crée une route GET pour '/teams/:id'.
    // Le décorateur @Param('id') extrait le paramètre 'id' de l'URL et le passe à la méthode findOne() du service.
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Team> {

        if (!id) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Missing parameter',
            }, HttpStatus.BAD_REQUEST)
        }

        if (typeof id !== 'string') {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Wrong type of parameter',
            }, HttpStatus.BAD_REQUEST)
        }

        if (id.length < 3 || id.length > 20) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Name must be between 3 and 20 characters',
            }, HttpStatus.BAD_REQUEST)
        }

        try {
            const team = await this.teamsService.findOne(id)
            console.log(`${id} team retrieved`)
            return team
        } catch (err) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Team not found',
            }, HttpStatus.NOT_FOUND)
        }
    }

    // Le décorateur @Put(':id') crée une route PUT pour '/teams/:id'.
    // Le décorateur @Body() extrait les données du corps de la requête et les passe à la méthode update() du service.
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateTeamDto: any): Promise<Team> {

        if (!id || !updateTeamDto.name || !updateTeamDto.base || !updateTeamDto.championshipsWon) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Missing parameters',
            }, HttpStatus.BAD_REQUEST)
        }

        if (typeof id !== 'string' || typeof updateTeamDto.name !== 'string' || typeof updateTeamDto.base !== 'string' || typeof updateTeamDto.championshipsWon !== 'number') {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Wrong type of parameters',
            }, HttpStatus.BAD_REQUEST)
        }

        if (updateTeamDto.championshipsWon < 0) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Championships won must be a positive number',
            }, HttpStatus.BAD_REQUEST)
        }

        if (updateTeamDto.name.length < 3 || updateTeamDto.name.length > 20) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Name must be between 3 and 20 characters',
            }, HttpStatus.BAD_REQUEST)
        }

        if (updateTeamDto.base.length < 3 || updateTeamDto.base.length > 20) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Base must be between 3 and 20 characters',
            }, HttpStatus.BAD_REQUEST)
        }

        if (updateTeamDto.name === updateTeamDto.base) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Name and base must be different',
            }, HttpStatus.BAD_REQUEST)
        }

        if (this.teamsService.findOne(updateTeamDto.name)) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'This team already exists',
            }, HttpStatus.BAD_REQUEST)
        }

        try {
            const updatedTeam = await this.teamsService.update(id, updateTeamDto)
            console.log(`${id} team updated`)
            return updatedTeam
        } catch (err) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Team not found',
            }, HttpStatus.NOT_FOUND)
        }
    }

    // Le décorateur @Delete(':id') crée une route DELETE pour '/teams/:id'.
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Team> {

        if (!id) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Missing parameter',
            }, HttpStatus.BAD_REQUEST)
        }

        if (typeof id !== 'string') {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Wrong type of parameter',
            }, HttpStatus.BAD_REQUEST)
        }

        if (id.length < 3 || id.length > 20) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Name must be between 3 and 20 characters',
            }, HttpStatus.BAD_REQUEST)
        }

        if (!this.teamsService.findOne(id)) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'This team does not exist',
            }, HttpStatus.NOT_FOUND)
        }

        try {
            const deletedTeam = await this.teamsService.delete(id)
            console.log(`${id} team deleted`)
            return deletedTeam
        } catch (err) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Team not found',
            }, HttpStatus.NOT_FOUND)
        }
    }
}
