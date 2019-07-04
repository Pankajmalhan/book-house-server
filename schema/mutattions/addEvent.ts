const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    FlGraphQLFloat
} = require('graphql');

import EventModel from "../../models/type";
import EventType from "../types/Event"
import { GraphQLFloat } from "graphql";
import { InputType } from "zlib";
import { IEventType } from "../../interfaces/common";

const EventInputType = new GraphQLInputObjectType({
    name: 'EventInput',
    fields: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLFloat) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLString) }
    }
});


export default {
    type: EventType,
    description: 'Use this to add a new type',
    args: {
        input: { type: new GraphQLNonNull(EventInputType) }
    },
    resolve(obj: any, { input }: any) {
        const event = new EventModel({
            title: input.title,
            description: input.description,
            price: input.price,
            date: new Date()
        })
        event.save();
        return event;
    }
}