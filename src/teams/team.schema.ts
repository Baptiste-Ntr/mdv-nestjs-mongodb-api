import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeamDocument = Team & Document;

@Schema()
export class Team {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    base: string;

    @Prop({ default: 0 })
    championshipsWon: number;
}

export const TeamSchema = SchemaFactory.createForClass(Team);