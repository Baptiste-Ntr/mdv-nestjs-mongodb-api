// Importe le décorateur Injectable de NestJS. 
// Ce décorateur est nécessaire pour créer un service qui peut être injecté dans d'autres parties de votre application.
import { Injectable } from '@nestjs/common';

// Importe le décorateur InjectModel de NestJS. 
// Ce décorateur est utilisé pour injecter un modèle Mongoose dans votre service.
import { InjectModel } from '@nestjs/mongoose';

// Importe l'interface Model de Mongoose. 
// Cette interface représente un modèle de document Mongoose et fournit des méthodes pour interagir avec la base de données.
import { Model } from 'mongoose';

// Importe la classe Team et l'interface TeamDocument de votre schéma Mongoose.
// Team est la classe qui définit le schéma de votre document.
// TeamDocument est une interface qui représente un document de la collection Team dans MongoDB.
import { Team, TeamDocument } from './team.schema';

// Utilise le décorateur Injectable pour indiquer à NestJS que cette classe est un service qui peut être injecté.
@Injectable()
export class TeamsService {
    // Définit le constructeur de la classe TeamsService.
    // Le constructeur a un paramètre avec le décorateur @InjectModel().
    // Ce décorateur indique à NestJS d'injecter le modèle Mongoose pour Team dans le service.
    constructor(@InjectModel(Team.name) private teamModel: Model<TeamDocument>) { }

    // Définit une méthode asynchrone pour créer une nouvelle équipe.
    // Cette méthode prend un objet createTeamDto en paramètre qui contient les informations de l'équipe à créer.
    // Elle crée une nouvelle instance du modèle Team avec les informations fournies, puis sauvegarde le document dans la base de données.
    // La méthode renvoie une promesse qui se résout en l'équipe créée.
    async create(createTeamDto: any): Promise<Team> {
        const createdTeam = new this.teamModel(createTeamDto);
        return createdTeam.save();
    }

    // Définit une méthode asynchrone pour récupérer toutes les équipes.
    // Cette méthode utilise la méthode find() du modèle Team pour récupérer tous les documents de la collection Team.
    // Elle renvoie une promesse qui se résout en un tableau d'équipes.
    async findAll(): Promise<Team[]> {
        return this.teamModel.find().exec();
    }

    // Définit une méthode asynchrone pour récupérer une équipe par son ID.
    // Cette méthode utilise la méthode findById() du modèle Team pour récupérer un document par son ID.
    // Elle renvoie une promesse qui se résout en l'équipe trouvée.
    async findOne(id: string): Promise<Team> {
        return this.teamModel.findOne({ name: id }).exec();
    }

    // Définit une méthode asynchrone pour mettre à jour une équipe par son ID.
    // Cette méthode prend deux paramètres : l'ID de l'équipe à mettre à jour et un objet updateTeamDto qui contient les informations à mettre à jour.
    // Elle utilise la méthode findByIdAndUpdate() du modèle Team pour mettre à jour le document.
    // Elle renvoie une promesse qui se résout en l'équipe mise à jour.
    async update(id: string, updateTeamDto: any): Promise<Team> {
        return this.teamModel.findByIdAndUpdate(id, updateTeamDto, { new: true }).exec();
    }

    // Définit une méthode asynchrone pour supprimer une équipe par son ID.
    // Cette méthode utilise la méthode findByIdAndDelete() du modèle Team pour supprimer un document par son ID.
    // Elle renvoie une promesse qui se résout en l'équipe supprimée.
    async delete(id: string): Promise<Team> {
        return this.teamModel.findOneAndDelete({ name: id }).exec();
    }
}
