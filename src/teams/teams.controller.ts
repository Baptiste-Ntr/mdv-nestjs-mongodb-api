// Importation des décorateurs et des classes nécessaires depuis le module '@nestjs/common' et les fichiers locaux.
import { Body, Controller, Delete, Get, Param, Post, Put, HttpException, HttpStatus } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Team } from './team.schema';
import { LoggingService } from 'src/logging/logging.service';

// Le décorateur @Controller crée une route de base '/teams' pour toutes les méthodes de ce contrôleur.
@Controller('teams')
export class TeamsController {
    // Injection du service TeamsService dans le contrôleur via le constructeur.
    constructor(
        private readonly teamsService: TeamsService,
        private readonly loggingService: LoggingService
    ) { }

    // Le décorateur @Post crée une route POST pour '/teams'.
    // Le décorateur @Body() extrait les données du corps de la requête et les passe à la méthode create() du service.
    @Post()
    async create(@Body() createTeamDto: any): Promise<Team> {

        // Vérification des paramètres de la requête.
        if (!createTeamDto.name || !createTeamDto.base || !createTeamDto.championshipsWon) {
            this.loggingService.error(`POST/teams/ Missing parameters`)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Missing parameters',
            }, HttpStatus.BAD_REQUEST)
        }
        // Vérification des types des paramètres de la requête.
        if (typeof createTeamDto.name !== 'string' || typeof createTeamDto.base !== 'string' || typeof createTeamDto.championshipsWon !== 'number') {
            this.loggingService.error('POST/teams/ Wrong type of parameters')
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Wrong type of parameters',
            }, HttpStatus.BAD_REQUEST)
        }
        // Vérification des valeurs des paramètres de la requête.
        if (createTeamDto.championshipsWon < 0) {
            this.loggingService.error('POST/teams/ Championships won must be a positive number')
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Championships won must be a positive number',
            }, HttpStatus.BAD_REQUEST)
        }
        // Vérification des longueurs des paramètres de la requête.
        if (createTeamDto.name.length < 3 || createTeamDto.name.length > 20) {
            this.loggingService.error('POST/teams/ Name must be between 3 and 20 characters')
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Name must be between 3 and 20 characters',
            }, HttpStatus.BAD_REQUEST)
        }
        // Vérification des longueurs des paramètres de la requête.
        if (createTeamDto.base.length < 3 || createTeamDto.base.length > 20) {
            this.loggingService.error('POST/teams/ Base must be between 3 and 20 characters')
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Base must be between 3 and 20 characters',
            }, HttpStatus.BAD_REQUEST)
        }
        // Vérification des valeurs des paramètres de la requête.
        if (createTeamDto.name === createTeamDto.base) {
            this.loggingService.error('POST/teams/ Name and base must be different')
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Name and base must be different',
            }, HttpStatus.BAD_REQUEST)
        }

        try {
            const isNewTeamExist = await this.teamsService.findOne(createTeamDto.name)
            if (isNewTeamExist) {
                this.loggingService.error('POST/teams/ This team already exists')
                throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    error: 'This team already exists',
                }, HttpStatus.BAD_REQUEST)
            }
            const newTeam = await this.teamsService.create(createTeamDto)
            console.log(`${createTeamDto.name} team created`)
            return newTeam
        } catch (error) {
            this.loggingService.error('POST/teams/ This team already exists')
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
            this.loggingService.error('/GET/teams/ Internal server error')
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
        // Vérification des paramètres de la requête.
        if (!id) {
            this.loggingService.error(`GET/teams/${id} Missing parameter`)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Missing parameter',
            }, HttpStatus.BAD_REQUEST)
        }
        // Vérification des types des paramètres de la requête.
        if (typeof id !== 'string') {
            this.loggingService.error(`GET/teams/${id} Wrong type of parameter`)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Wrong type of parameter',
            }, HttpStatus.BAD_REQUEST)
        }
        // Vérification des longueurs des paramètres de la requête.
        if (id.length < 3 || id.length > 20) {
            this.loggingService.error(`GET/teams/${id} Name must be between 3 and 20 characters`)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Name must be between 3 and 20 characters',
            }, HttpStatus.BAD_REQUEST)
        }

        try {
            const team = await this.teamsService.findOne(id)
            if (!team) {
                this.loggingService.error(`GET/teams/${id} Team not found`)
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    error: 'Team not found',
                }, HttpStatus.NOT_FOUND)
            }
            console.log(`${id} team retrieved`)
            return team
        } catch (err) {
            this.loggingService.error(`GET/teams/${id} Team not found`)
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
        // Vérification des paramètres de la requête.
        if (!id || !updateTeamDto.name || !updateTeamDto.base || !updateTeamDto.championshipsWon) {
            this.loggingService.error(`PUT/teams/${id} Missing parameters`)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Missing parameters',
            }, HttpStatus.BAD_REQUEST)
        }
        // Vérification des types des paramètres de la requête.
        if (typeof id !== 'string' || typeof updateTeamDto.name !== 'string' || typeof updateTeamDto.base !== 'string' || typeof updateTeamDto.championshipsWon !== 'number') {
            this.loggingService.error(`PUT/teams/${id} Wrong type of parameters`)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Wrong type of parameters',
            }, HttpStatus.BAD_REQUEST)
        }
        // Vérification des longueurs des paramètres de la requête.
        if (updateTeamDto.championshipsWon < 0) {
            this.loggingService.error(`PUT/teams/${id} Championships won must be a positive number`)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Championships won must be a positive number',
            }, HttpStatus.BAD_REQUEST)
        }
        // Vérification des longueurs des paramètres de la requête.
        if (updateTeamDto.name.length < 3 || updateTeamDto.name.length > 20) {
            this.loggingService.error(`PUT/teams/${id} Name must be between 3 and 20 characters`)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Name must be between 3 and 20 characters',
            }, HttpStatus.BAD_REQUEST)
        }
        // Vérification des longueurs des paramètres de la requête.
        if (updateTeamDto.base.length < 3 || updateTeamDto.base.length > 20) {
            this.loggingService.error(`PUT/teams/${id} Base must be between 3 and 20 characters`)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Base must be between 3 and 20 characters',
            }, HttpStatus.BAD_REQUEST)
        }
        // Vérification des valeurs des paramètres de la requête.
        if (updateTeamDto.name === updateTeamDto.base) {
            this.loggingService.error(`PUT/teams/${id} Name and base must be different`)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Name and base must be different',
            }, HttpStatus.BAD_REQUEST)
        }

        try {
            const isUpdatedNameExist = await this.teamsService.findOne(updateTeamDto.name)
            if (isUpdatedNameExist) {
                this.loggingService.error(`PUT/teams/${id} This team already exists`)
                throw new HttpException({
                    status: HttpStatus.BAD_REQUEST,
                    error: 'This team already exists',
                }, HttpStatus.BAD_REQUEST)
            }
            const updatedTeam = await this.teamsService.update(id, updateTeamDto)
            console.log(`${id} team updated`)
            return updatedTeam
        } catch (err) {
            this.loggingService.error(`PUT/teams/${id} Team not found`)
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Team not found',
            }, HttpStatus.NOT_FOUND)
        }
    }

    // Le décorateur @Delete(':id') crée une route DELETE pour '/teams/:id'.
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Team> {
        // Vérification des paramètres de la requête.
        if (!id) {
            this.loggingService.error(`DELETE/teams/${id} Missing parameter`)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Missing parameter',
            }, HttpStatus.BAD_REQUEST)
        }
        // Vérification des types des paramètres de la requête.
        if (typeof id !== 'string') {
            this.loggingService.error(`DELETE/teams/${id} Wrong type of parameter`)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Wrong type of parameter',
            }, HttpStatus.BAD_REQUEST)
        }
        // Vérification des longueurs des paramètres de la requête.
        if (id.length < 3 || id.length > 20) {
            this.loggingService.error(`DELETE/teams/${id} Name must be between 3 and 20 characters`)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Name must be between 3 and 20 characters',
            }, HttpStatus.BAD_REQUEST)
        }

        try {
            const isDeletedTeamExist = await this.teamsService.findOne(id)
            if (!isDeletedTeamExist) {
                this.loggingService.error(`DELETE/teams/${id} Team not found`)
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    error: 'Team not found',
                }, HttpStatus.NOT_FOUND)
            }
            const deletedTeam = await this.teamsService.delete(id)
            console.log(`${id} team deleted`)
            return deletedTeam
        } catch (err) {
            this.loggingService.error(`DELETE/teams/${id} Team not found`)
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Team not found',
            }, HttpStatus.NOT_FOUND)
        }
    }
}
