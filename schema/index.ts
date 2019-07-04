const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLList
} = require('graphql');
import EventModel from "../models/type";
import EventType from "./types/Event";


import AddEventMutation from "./mutattions/addEvent";

const GraphQueryType = new GraphQLObjectType({
    name: 'GrapghQueryType',
    fields: {
        event: {
            type: new GraphQLNonNull(GraphQLList(EventType)),
            resolve: () => {
                return EventModel.find().then(events => {
                    return events
                }).catch(exp => {
                    throw exp
                })
            }
        }
    }
})

const RootMutationType = new GraphQLObjectType({
    name: 'RootMutationType',
    fields: () => ({
        AddEvent: AddEventMutation
    })
})

const ncSchema = new GraphQLSchema({
    query: GraphQueryType,
    mutation: RootMutationType
});

export default ncSchema;